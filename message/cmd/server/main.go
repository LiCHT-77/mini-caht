package main

import (
	"flag"
	"fmt"
	"log"
	"net"
	"time"

	"github.com/LiCHT-77/mini-chat/message/ent"
	"github.com/LiCHT-77/mini-chat/message/pb"
	"github.com/LiCHT-77/mini-chat/message/service"
	"github.com/LiCHT-77/mini-chat/user/auth"
	userpb "github.com/LiCHT-77/mini-chat/user/pb"
	"github.com/go-redis/redis/v8"
	"github.com/go-sql-driver/mysql"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

var (
	port            = flag.Int("port", 8080, "a server port")
	dbUser          = flag.String("user", "root", "database user")
	dbPass          = flag.String("pass", "", "database user password")
	dbAddr          = flag.String("addr", "", "database address")
	dbName          = flag.String("dbname", "", "database name")
	rdbAddr         = flag.String("rdbaddr", "localhost:8080", "mini-chat message-redis address")
	userServiceAddr = flag.String("usaddr", "localhost:8080", "mini-chat RoomService address")
	secretKey       = "secret"
	tokenDuration   = 15 * time.Minute
)

func main() {
	flag.Parse()

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen %v", err)
	}

	// Mysql client
	entOption := []ent.Option{}

	// entOption = append(entOption, ent.Debug())

	mc := mysql.Config{
		User:                 *dbUser,
		Passwd:               *dbPass,
		Net:                  "tcp",
		Addr:                 *dbAddr,
		DBName:               *dbName,
		AllowNativePasswords: true,
		ParseTime:            true,
	}

	dbClient, err := ent.Open("mysql", mc.FormatDSN(), entOption...)
	if err != nil {
		log.Fatalf("Error open mysql ent client: %v", err)
	}
	defer dbClient.Close()

	// UserService client
	var userSvcClientOps []grpc.DialOption

	userSvcClientOps = append(userSvcClientOps, grpc.WithInsecure())

	conn, err := grpc.Dial(*userServiceAddr, userSvcClientOps...)
	if err != nil {
		log.Fatalf("cannot connect minichat RoomService: %v", err)
	}
	userServiceClient := userpb.NewUserServiceClient(conn)

	// Redis client
	rdb := redis.NewClient(&redis.Options{
		Addr:     *rdbAddr,
		Password: "",
		DB:       0,
	})
	defer rdb.Close()

	// gRPC server
	var ops []grpc.ServerOption

	jwtManager := auth.NewJWTManager(secretKey, tokenDuration)
	grpcServerPath := "/minichat.message.RoomService"

	interceptor := auth.NewAuthInterceptor(jwtManager, map[string]bool{
		grpcServerPath + "GetMessage":     true,
		grpcServerPath + "PostMessage":    true,
		grpcServerPath + "PutMessage":     true,
		grpcServerPath + "DeleteMessage":  true,
		grpcServerPath + "GetMessageList": true,
	})
	ops = []grpc.ServerOption{
		grpc.UnaryInterceptor(interceptor.Unary()),
	}

	grpcServer := grpc.NewServer(ops...)
	pb.RegisterMessageServiceServer(grpcServer, service.NewMessageServer(dbClient, rdb, jwtManager, userServiceClient))
	reflection.Register(grpcServer)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
