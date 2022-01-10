package main

import (
	"flag"
	"fmt"
	"log"
	"net"
	"time"

	roompb "github.com/LiCHT-77/mini-chat/room/pb"
	"github.com/LiCHT-77/mini-chat/user/auth"
	"github.com/LiCHT-77/mini-chat/user/ent"
	"github.com/LiCHT-77/mini-chat/user/pb"
	"github.com/LiCHT-77/mini-chat/user/service"
	"github.com/go-sql-driver/mysql"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

var (
	port            = flag.Int("port", 8080, "a server port")
	hasKey          = flag.Int("hashkey", 100, "hash key")
	dbUser          = flag.String("user", "root", "database user")
	dbPass          = flag.String("pass", "", "database user password")
	dbAddr          = flag.String("addr", "", "database address")
	dbName          = flag.String("dbname", "", "database name")
	roomServiceAddr = flag.String("rsaddr", "localhost:8080", "mini-chat RoomService address")
	secretKey       = "secret"
	tokenDuration   = 24 * time.Hour
)

func main() {
	flag.Parse()

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen %v", err)
	}

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

	var roomSvcClientOps []grpc.DialOption

	roomSvcClientOps = append(roomSvcClientOps, grpc.WithInsecure())

	conn, err := grpc.Dial(*roomServiceAddr, roomSvcClientOps...)
	if err != nil {
		log.Fatalf("cannot connect minichat RoomService: %v", err)
	}
	roomServiceClient := roompb.NewRoomServiceClient(conn)

	var ops []grpc.ServerOption

	jwtManager := auth.NewJWTManager(secretKey, tokenDuration)
	interceptor := auth.NewAuthInterceptor(jwtManager, map[string]bool{
		"/minichat.user.UserService/Login":        false,
		"/minichat.user.UserService/Register":     false,
		"/minichat.user.UserService/GetUser":      false,
		"/minichat.user.UserService/PutUser":      true,
		"/minichat.user.UserService/DeleteUser":   true,
		"/minichat.user.UserService/GetUsers":     false,
		"/minichat.user.UserService/AddFriend":    true,
		"/minichat.user.UserService/RemoveFriend": true,
		"/minichat.user.UserService/GetFriends":   true,
	})
	ops = []grpc.ServerOption{
		grpc.UnaryInterceptor(interceptor.Unary()),
	}

	grpcServer := grpc.NewServer(ops...)
	pb.RegisterUserServiceServer(grpcServer, service.NewUserServer(dbClient, jwtManager, *hasKey, roomServiceClient))
	reflection.Register(grpcServer)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
