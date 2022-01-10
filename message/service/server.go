package service

import (
	"context"
	"strconv"

	"github.com/LiCHT-77/mini-chat/message/ent"
	"github.com/LiCHT-77/mini-chat/message/ent/message"
	"github.com/LiCHT-77/mini-chat/message/pb"
	"github.com/LiCHT-77/mini-chat/user/auth"
	userpb "github.com/LiCHT-77/mini-chat/user/pb"
	"github.com/go-redis/redis/v8"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Server struct {
	dbClient          *ent.Client
	rdb               *redis.Client
	userServiceClient userpb.UserServiceClient
	jwtManager        *auth.JWTManager
}

func NewMessageServer(
	dbClient *ent.Client,
	rdb *redis.Client,
	jwtManager *auth.JWTManager,
	userServiceClient userpb.UserServiceClient) pb.MessageServiceServer {
	return &Server{
		dbClient:          dbClient,
		rdb:               rdb,
		userServiceClient: userServiceClient,
		jwtManager:        jwtManager,
	}
}

func (s *Server) GetMessage(ctx context.Context, request *pb.GetMessageRequest) (*pb.Message, error) {
	return nil, nil
}

func (s *Server) PostMessage(ctx context.Context, request *pb.Message) (*pb.Message, error) {
	authUser, err := auth.GetAuthUser(ctx, s)
	if err != nil {
		return nil, err
	}

	msg, err := s.dbClient.Message.
		Create().
		SetType(message.Type0).
		SetRoomID(request.RoomId).
		SetUserID(authUser.Id).
		SetText(request.Text).
		Save(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "connot post message: %v", err)
	}

	s.rdb.Publish(ctx, strconv.Itoa(int(request.RoomId)), msg.ID)

	pbm, err := encodePbMessage(msg)
	if err != nil {
		return nil, err
	}

	return pbm, nil
}

func (s *Server) GetMessageList(request *pb.GetMessageListRequest, stream pb.MessageService_GetMessageListServer) error {
	// 既存のmessageを取得し送信
	ctx := context.Background()
	msgls, err := s.dbClient.Message.Query().Where(message.RoomID(request.RoomId)).Limit(100).All(ctx)
	if err != nil {
		return status.Errorf(codes.Internal, err.Error())
	}

	for _, msg := range msgls {
		pbm, err := encodePbMessage(msg)
		if err != nil {
			return status.Errorf(codes.Internal, err.Error())
		}
		stream.Send(pbm)
	}

	// redisのPub/Subでルームの新規messageがあれば送信
	pubsub := s.rdb.Subscribe(ctx, strconv.Itoa(int(request.RoomId)))
	defer pubsub.Close()
	ch := pubsub.Channel()
	for rdbmsg := range ch {
		msgId, err := strconv.Atoi(rdbmsg.Payload)
		if err != nil {
			return status.Errorf(codes.Internal, err.Error())
		}

		msg, err := s.dbClient.Message.Get(ctx, int32(msgId))
		if err != nil {
			return status.Errorf(codes.Internal, err.Error())
		}

		pbmsg, err := encodePbMessage(msg)
		if err != nil {
			return err
		}

		stream.Send(pbmsg)
	}

	return nil
}

// Get auth.JwtManger
func (s *Server) GetJwtManager() *auth.JWTManager {
	return s.jwtManager
}

func encodePbMessage(m *ent.Message) (*pb.Message, error) {
	typei, err := strconv.Atoi(m.Type.String())
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot convert message type: %v", err)
	}
	return &pb.Message{
		Id:     m.ID,
		Type:   pb.Message_Types(typei),
		RoomId: m.RoomID,
		UserId: m.UserID,
		Text:   m.Text,
	}, nil
}
