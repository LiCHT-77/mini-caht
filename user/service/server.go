package service

import (
	"context"

	"entgo.io/ent/dialect/sql"
	roompb "github.com/LiCHT-77/mini-chat/room/pb"
	"github.com/LiCHT-77/mini-chat/user/auth"
	"github.com/LiCHT-77/mini-chat/user/ent"
	"github.com/LiCHT-77/mini-chat/user/ent/user"
	"github.com/LiCHT-77/mini-chat/user/pb"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
)

type Server struct {
	dbClient          *ent.Client
	roomServiceClient roompb.RoomServiceClient
	jwtManager        *auth.JWTManager
	hashKey           int
}

func NewUserServer(dbClient *ent.Client, jwtManager *auth.JWTManager, hashKey int, roomServiceClient roompb.RoomServiceClient) pb.UserServiceServer {
	return &Server{
		dbClient:          dbClient,
		roomServiceClient: roomServiceClient,
		jwtManager:        jwtManager,
		hashKey:           hashKey,
	}
}

// An user login by generate JWT token
func (s *Server) Login(ctx context.Context, request *pb.LoginRequest) (*pb.LoginResponse, error) {
	user, err := s.dbClient.
		User.
		Query().
		Where(user.Email(request.GetEmail())).
		Only(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot find user: %v", err)
	}

	password := []byte(request.GetPassword())

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), password)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "incorrect username/password")
	}

	pbUser := pb.User{
		Id:    int32(user.ID),
		Name:  user.Name,
		Email: user.Email,
	}
	token, err := s.jwtManager.Generate(&pbUser)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot generate access token")
	}

	return &pb.LoginResponse{User: &pbUser, AccessToken: token}, nil
}

// Create an user and login
func (s *Server) Register(ctx context.Context, request *pb.RegisterRequest) (*pb.RegisterResponse, error) {
	password := []byte(request.GetUser().Password)
	hashed, err := bcrypt.GenerateFromPassword(password, 10)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "incorrect password: %w", err)
	}
	user, err := s.dbClient.User.
		Create().
		SetName(request.GetUser().Name).
		SetEmail(request.GetUser().Email).
		SetPassword(string(hashed)).
		Save(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot create new user: %w", err)
	}

	pbUser := pb.User{
		Id:    int32(user.ID),
		Name:  user.Name,
		Email: user.Email,
	}
	token, err := s.jwtManager.Generate(&pbUser)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot generate access token")
	}

	return &pb.RegisterResponse{User: &pbUser, AccessToken: token}, nil
}

// Get an user by user_id
func (s *Server) GetUser(ctx context.Context, request *pb.GetUserRequest) (*pb.GetUserResponse, error) {
	user, err := s.dbClient.User.Get(ctx, int(request.GetId()))
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot find user: %v", err)
	}

	pbUser := pb.User{
		Id:    int32(user.ID),
		Name:  user.Name,
		Email: user.Email,
	}

	return &pb.GetUserResponse{User: &pbUser}, nil
}

// Update authorized user info
func (s *Server) PutUser(ctx context.Context, request *pb.PutUserRequest) (*emptypb.Empty, error) {
	if authUser, err := auth.GetAuthUser(ctx, s); err != nil || authUser.Id != request.GetId() {
		return nil, status.Errorf(codes.PermissionDenied, "cannot update user")
	}

	if _, err := s.dbClient.User.
		UpdateOneID(int(request.GetId())).
		SetName(request.User.GetName()).
		SetEmail(request.User.GetEmail()).
		Save(ctx); err != nil {
		return nil, status.Errorf(codes.Internal, "cannot update user: %v", err)
	}

	return &emptypb.Empty{}, nil
}

// Delete an user by user_id
func (s *Server) DeleteUser(ctx context.Context, request *pb.DeleteUserRequest) (*emptypb.Empty, error) {
	return &emptypb.Empty{}, nil
}

// Get user list by array of user_id
func (s *Server) GetUsers(ctx context.Context, request *pb.GetUsersRequest) (*pb.GetUsersResponse, error) {
	var ids []int
	for _, id := range request.GetIds() {
		ids = append(ids, int(id))
	}

	users, err := s.dbClient.User.Query().Where(func(s *sql.Selector) {
		s.Where(sql.InInts(user.FieldID, ids...))
	}).All(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot get users: %v", err)
	}

	var pbUsers []*pb.User
	for _, eu := range users {
		pbUsers = append(pbUsers, encodeToProtoUser(eu))
	}

	return &pb.GetUsersResponse{User: pbUsers}, nil
}

// Authorized user add friend by user_id
func (s *Server) AddFriend(ctx context.Context, request *pb.AddFriendRequest) (*emptypb.Empty, error) {
	authUser, err := auth.GetAuthUser(ctx, s)
	if err != nil {
		return nil, status.Errorf(codes.PermissionDenied, "cannot update user: %v", err)
	}

	_, err = s.dbClient.User.
		UpdateOneID(int(authUser.GetId())).
		AddFriendIDs(int(request.GetId())).
		Save(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot add friend: %v", err)
	}

	return &emptypb.Empty{}, nil
}

// Authorized user remove friend by user_id
func (s *Server) RemoveFriend(ctx context.Context, request *pb.RemoveFriendRequest) (*emptypb.Empty, error) {
	authUser, err := auth.GetAuthUser(ctx, s)
	if err != nil {
		return nil, status.Errorf(codes.PermissionDenied, "cannot update user: %v", err)
	}

	_, err = s.dbClient.User.
		UpdateOneID(int(authUser.GetId())).
		RemoveFriendIDs(int(request.GetId())).
		Save(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot add friend: %v", err)
	}

	return &emptypb.Empty{}, nil
}

// Get user list friends of an user
func (s *Server) GetFriends(ctx context.Context, request *pb.GetFriendsRequest) (*pb.GetFriendsResponse, error) {
	user, err := s.dbClient.User.Get(ctx, int(request.GetId()))
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot find user: %v", err)
	}

	friends, err := user.QueryFriends().All(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot get friends: %v", err)
	}

	var pbFriends []*pb.User
	for _, friend := range friends {
		pbFriends = append(pbFriends, encodeToProtoUser(friend))
	}

	return &pb.GetFriendsResponse{Friend: pbFriends}, nil
}

func (s *Server) Search(ctx context.Context, request *pb.SearchRequest) (*pb.SearchResponse, error) {
	keyword := request.GetKeyword()
	users, err := s.dbClient.User.Query().Where(user.NameContains(keyword)).Limit(50).All(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	var response pb.SearchResponse

	for _, user := range users {
		response.User = append(response.User, encodeToProtoUser(user))
	}

	return &response, nil
}

// Get auth.JwtManger
func (s *Server) GetJwtManager() *auth.JWTManager {
	return s.jwtManager
}

// ent.User to pb.User
func encodeToProtoUser(user *ent.User) *pb.User {
	return &pb.User{
		Id:    int32(user.ID),
		Name:  user.Name,
		Email: user.Email,
	}
}
