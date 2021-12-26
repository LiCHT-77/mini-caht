SERVICE_DIR_user = user
SERVICE_DIR_room = room
SERVICE_DIR_message = message
SERVICE_DIR_vue = vue-client

DB_USER = root
DB_PASSWORD = root
DB_PORT = 3306

SERVICE_LIST := user room vue-client proxy

# conpile protocol baffer 
genpb:
	make genpb-user
	make genpb-room
	make genpb-message

genpb-%:
	protoc --go_out=${SERVICE_DIR_$*} \
		--go-grpc_out=require_unimplemented_servers=false:${SERVICE_DIR_$*} \
		-I=${SERVICE_DIR_$*} \
		${SERVICE_DIR_$*}/pb/$*.proto
	protoc -I=${SERVICE_DIR_$*}/pb ${SERVICE_DIR_$*}/pb/$*.proto \
		--js_out=import_style=commonjs:${SERVICE_DIR_vue}/app/src/pb \
		--grpc-web_out=import_style=commonjs,mode=grpcwebtext:${SERVICE_DIR_vue}/app/src/pb

# stop docker containers
stops:
	@for service in ${SERVICE_LIST}; do make stop-$$service; done

stop-%:
	@docker-compose -f $*/docker-compose.yml stop

# start docker containers
starts:
	@for service in ${SERVICE_LIST}; do make start-$$service; done

start-%:
	@docker-compose -f $*/docker-compose.yml start

# restart docker containers
restart-%:
	@docker-compose -f $*/docker-compose.yml restart

restarts:
	@for service in ${SERVICE_LIST}; do make restart-$$service; done

# build docker containers
builds:
	@for service in ${SERVICE_LIST}; do make build-$$service; done

build-%:
	@docker-compose -f $*/docker-compose.yml up -d --build

# down docker containers
downs:
	@for service in ${SERVICE_LIST}; do make down-$$service; done

down-%:
	@docker-compose -f $*/docker-compose.yml down

# attach docker container
attach-%:
	docker attach mini-chat-$*

migrate-user:
	docker exec -it mini-chat-user \
		go run /go/src/cmd/migration/main.go \
		-user root \
		-pass root \
		-h mini-chat-user-db \
		-p 3306 \
		-n user_db

migrate-%:
	docker exec -it mini-chat-$* \
		go run /go/src/cmd/migration/main.go \
		-user ${DB_USER} \
		-pass ${DB_PASSWORD} \
		-h mini-chat-$*-db \
		-p ${DB_PORT} \
		-n $*_db
