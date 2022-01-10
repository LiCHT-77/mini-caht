package service

import (
	"context"
	"strings"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqljson"
	"github.com/LiCHT-77/mini-chat/room/ent"
	"github.com/LiCHT-77/mini-chat/room/ent/room"
	"github.com/LiCHT-77/mini-chat/room/pb"
	"github.com/LiCHT-77/mini-chat/user/auth"
	userpb "github.com/LiCHT-77/mini-chat/user/pb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
	ts "google.golang.org/protobuf/types/known/timestamppb"
)

type Server struct {
	dbClient          *ent.Client
	userServiceClient userpb.UserServiceClient
	jwtManager        *auth.JWTManager
}

func NewRoomServer(dbClient *ent.Client, jwtManager *auth.JWTManager, userServiceClient userpb.UserServiceClient) pb.RoomServiceServer {
	return &Server{
		dbClient:          dbClient,
		userServiceClient: userServiceClient,
		jwtManager:        jwtManager,
	}
}

// Get a room
func (s *Server) GetRoom(ctx context.Context, request *pb.GetRoomRequest) (*pb.Room, error) {
	room, err := s.dbClient.Room.Get(ctx, request.GetRoomId())
	if err != nil {
		return nil, status.Errorf(codes.Internal, "connot find room: %v", err)
	}
	r, err := encodePbRoom(ctx, room, s)
	if err != nil {
		return nil, err
	}
	return r, nil
}

// Create a room
func (s *Server) CreateRoom(ctx context.Context, request *pb.Room) (*pb.Room, error) {
	room, err := s.dbClient.
		Room.
		Create().
		SetName(request.GetName()).
		SetUserIds(request.GetUserId()).
		Save(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "connot create room: %v", err)
	}

	r, err := encodePbRoom(ctx, room, s)
	if err != nil {
		return nil, err
	}
	return r, nil
}

// Update room info
func (s *Server) PutRoom(ctx context.Context, request *pb.Room) (*emptypb.Empty, error) {
	user, err := auth.GetAuthUser(ctx, s)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "cannot get an authorized user: %v", err)
	}

	room, err := s.dbClient.Room.Get(ctx, request.GetId())
	if err != nil {
		return nil, status.Errorf(codes.Internal, "connot find room: %v", err)
	}

	// ルームメンバーでないユーザーは編集できない
	if !Int32Contains(room.UserIds, user.GetId()) {
		return nil, status.Errorf(codes.PermissionDenied, "authorized user is not member of the room")
	}

	if _, err := room.Update().SetName(request.Name).Save(ctx); err != nil {
		return nil, status.Errorf(codes.Internal, "connot update room: %v", err)
	}

	return &emptypb.Empty{}, nil
}

// Delete a room by room_id
func (s *Server) DeleteRoom(ctx context.Context, request *pb.DeleteRoomRequest) (*emptypb.Empty, error) {
	return nil, nil
}

// Get room list
func (s *Server) GetRoomList(ctx context.Context, request *pb.GetRoomListRequest) (*pb.GetRoomListResponse, error) {
	rooms, err := s.dbClient.Room.Query().Where(func(s *sql.Selector) {
		s.Where(sqljson.ValueContains(room.FieldUserIds, request.GetUserId()))
	}).All(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot get rooms: %v", err)
	}

	var roomList []*pb.Room

	for _, room := range rooms {
		r, err := encodePbRoom(ctx, room, s)
		if err != nil {
			return nil, err
		}
		roomList = append(roomList, r)
	}

	return &pb.GetRoomListResponse{Room: roomList}, nil
}

// User join a room
func (s *Server) JoinRoom(ctx context.Context, request *pb.JoinRoomRequest) (*emptypb.Empty, error) {
	authUser, err := auth.GetAuthUser(ctx, s)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "cannot get an authorized user: %v", err)
	}

	room, err := s.dbClient.Room.Get(ctx, request.GetRoomId())
	if err != nil {
		return nil, status.Errorf(codes.Internal, "connot get room: %v", err)
	}

	// ルームメンバーでないユーザーは他のユーザーを参加させることはできない
	if authUser.Id != request.GetUserId() && !Int32Contains(room.UserIds, authUser.Id) {
		return nil, status.Errorf(codes.PermissionDenied, "a user is not room member cannot have other users join the room")
	}

	// すでに対象ユーザーがルームメンバーでないこと
	if Int32Contains(room.UserIds, request.GetUserId()) {
		return nil, status.Errorf(codes.PermissionDenied, "this user already joined the room")
	}

	if _, err := room.Update().
		SetUserIds(append(room.UserIds, request.GetUserId())).
		Save(ctx); err != nil {
		return nil, status.Errorf(codes.Internal, "cannot join room: %v", err)
	}

	return &emptypb.Empty{}, nil
}

// User exit a room
func (s *Server) ExitRoom(ctx context.Context, request *pb.ExitRoomRequest) (*emptypb.Empty, error) {
	authUser, err := auth.GetAuthUser(ctx, s)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "cannot get an authorized user: %v", err)
	}

	room, err := s.dbClient.Room.Get(ctx, request.GetRoomId())
	if err != nil {
		return nil, status.Errorf(codes.Internal, "connot get room: %v", err)
	}

	// ルームメンバーでないユーザーは他のユーザーを退出させることはできない
	if authUser.Id != request.GetUserId() && !Int32Contains(room.UserIds, authUser.Id) {
		return nil, status.Errorf(codes.PermissionDenied, "a user is not room member cannot have other users exit the room")
	}

	// すでに対象ユーザーがルームメンバーでないこと
	if !Int32Contains(room.UserIds, request.GetUserId()) {
		return nil, status.Errorf(codes.PermissionDenied, "this user is not room member")
	}

	// 退出するユーザーを削除
	var newUserIds []int32
	for _, userId := range room.UserIds {
		if userId != request.GetUserId() {
			newUserIds = append(newUserIds, userId)
		}
	}

	if _, err := room.Update().
		SetUserIds(newUserIds).
		Save(ctx); err != nil {
		return nil, status.Errorf(codes.Internal, "cannot exit room: %v", err)
	}

	return &emptypb.Empty{}, nil
}

// Get auth.JwtManger
func (s *Server) GetJwtManager() *auth.JWTManager {
	return s.jwtManager
}

func Int32Contains(s []int32, e int32) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}

func encodePbRoom(ctx context.Context, room *ent.Room, s *Server) (*pb.Room, error) {
	roomName := room.Name
	if roomName == "" {
		getUsersRequest := &userpb.GetUsersRequest{
			Ids: room.UserIds,
		}
		response, err := s.userServiceClient.GetUsers(ctx, getUsersRequest)
		if err != nil {
			return nil, err
		}
		users := response.GetUser()

		authUser, err := auth.GetAuthUser(ctx, s)
		if err != nil {
			return nil, err
		}

		userNames := []string{}
		for _, user := range users {
			if user.GetId() != authUser.Id {
				userNames = append(userNames, user.GetName())
			}
		}

		roomName = strings.Join(userNames, ",")
	}
	return &pb.Room{
		Id:        room.ID,
		Name:      roomName,
		UserId:    room.UserIds,
		CreatedAt: ts.New(room.CreateTime),
		UpdatedAt: ts.New(room.UpdateTime),
	}, nil
}
