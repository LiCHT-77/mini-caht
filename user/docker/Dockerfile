FROM golang:1.17.5 as dev

ARG SERVICE_ROOT\
    ROOT=/go/src

COPY ./ ${ROOT}
WORKDIR ${ROOT}

RUN go mod download

ARG CGO_ENABLED=0
ARG GOOS=linux
ARG GOARCH=amd64


RUN go get -u github.com/cosmtrek/air && \
    go build -o /go/bin/air github.com/cosmtrek/air

CMD ["air", "-c", ".air.toml"]

FROM golang:1.17.5-alpine as builder

ARG SERVICE_ROOT\
    ROOT=/go/src

COPY . ${ROOT}
WORKDIR ${ROOT}

RUN apk update && apk add git && \
    go mod download && \
    CGO_ENABLED=0 GOOS=linux go build -o $ROOT/binary

FROM scratch as prod

ARG SERVICE_ROOT\
    ROOT=/go/src

WORKDIR ${ROOT}
COPY --from=builder ${ROOT}/binary ${ROOT}

EXPOSE 8080
CMD ["${ROOT}/binary", "-port", ":8080"]
