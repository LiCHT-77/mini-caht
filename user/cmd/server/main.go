package main

import (
	"flag"
	"fmt"
	"log"
	"net"
	"time"

	"github.com/LiCHT-77/mini-chat/user/auth"
	"github.com/LiCHT-77/mini-chat/user/ent"
	"github.com/LiCHT-77/mini-chat/user/pb"
	"github.com/LiCHT-77/mini-chat/user/service"
	"github.com/go-sql-driver/mysql"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

var (
	port          = flag.Int("port", 8080, "a server port")
	hasKey        = flag.Int("hashkey", 100, "hash key")
	dbUser        = flag.String("user", "root", "database user")
	dbPass        = flag.String("pass", "", "database user password")
	dbAddr        = flag.String("addr", "", "database address")
	dbName        = flag.String("dbname", "", "database name")
	secretKey     = "secret"
	tokenDuration = 15 * time.Minute
)

func main() {
	flag.Parse()

	// lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", *port))
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen %v", err)
	}

	entOption := []ent.Option{}

	entOption = append(entOption, ent.Debug())

	mc := mysql.Config{
		User:                 *dbUser,
		Passwd:               *dbPass,
		Net:                  "tcp",
		Addr:                 *dbAddr,
		DBName:               *dbName,
		AllowNativePasswords: true,
		ParseTime:            true,
	}

	client, err := ent.Open("mysql", mc.FormatDSN(), entOption...)
	if err != nil {
		log.Fatalf("Error open mysql ent client: %v", err)
	}
	defer client.Close()

	var ops []grpc.ServerOption

	jwtManager := auth.NewJWTManager(secretKey, tokenDuration)
	interceptor := auth.NewAuthInterceptor(jwtManager, map[string]bool{
		"/grpcuser.UserService/GetUser": false,
	})
	ops = []grpc.ServerOption{
		grpc.UnaryInterceptor(interceptor.Unary()),
	}

	grpcServer := grpc.NewServer(ops...)
	pb.RegisterUserServiceServer(grpcServer, service.NewUserServer(client, jwtManager, *hasKey))
	reflection.Register(grpcServer)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
