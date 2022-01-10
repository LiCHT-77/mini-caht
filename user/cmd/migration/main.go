package main

import (
	"context"
	"flag"
	"log"

	"github.com/LiCHT-77/mini-chat/user/ent"
	"github.com/go-sql-driver/mysql"
)

var (
	dbUser = flag.String("user", "root", "database user")
	dbPass = flag.String("pass", "", "database user password")
	dbHost = flag.String("h", "", "database host")
	dbPort = flag.String("p", "3306", "database port")
	dbName = flag.String("n", "", "database name")
)

func main() {
	flag.Parse()
	entOption := []ent.Option{}

	// entOption = append(entOption, ent.Debug())

	mc := mysql.Config{
		User:                 *dbUser,
		Passwd:               *dbPass,
		Net:                  "tcp",
		Addr:                 *dbHost + ":" + *dbPort,
		DBName:               *dbName,
		AllowNativePasswords: true,
		ParseTime:            true,
	}

	client, err := ent.Open("mysql", mc.FormatDSN(), entOption...)
	if err != nil {
		log.Fatal("Error open mysql ent client: ", err)
	}

	defer client.Close()

	ctx := context.Background()
	if err := client.Schema.Create(ctx); err != nil {
		log.Fatal("failed creating schema resources: ", err)
	}
}
