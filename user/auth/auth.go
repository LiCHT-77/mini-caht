package auth

import (
	"context"

	"github.com/LiCHT-77/mini-chat/user/pb"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

type AuthInterceptor struct {
	jwtManager *JWTManager
	authOnly   map[string]bool
}

func NewAuthInterceptor(jwtManager *JWTManager, accessibleRoles map[string]bool) *AuthInterceptor {
	return &AuthInterceptor{jwtManager, accessibleRoles}
}

func (i *AuthInterceptor) Unary() grpc.UnaryServerInterceptor {
	return func(
		ctx context.Context,
		req interface{},
		info *grpc.UnaryServerInfo,
		handler grpc.UnaryHandler,
	) (interface{}, error) {
		err := i.authorize(ctx, info.FullMethod)
		if err != nil {
			return nil, err
		}

		if authOnly := i.isAuthOnly(info.FullMethod); authOnly {
			accessToken, err := GetAccessToken(ctx)
			if err != nil {
				return nil, err
			}
			ctx = metadata.AppendToOutgoingContext(ctx, "authorization", accessToken)
		}

		return handler(ctx, req)
	}
}

func (i *AuthInterceptor) Stream() grpc.StreamServerInterceptor {
	return func(
		srv interface{},
		stream grpc.ServerStream,
		info *grpc.StreamServerInfo,
		handler grpc.StreamHandler,
	) error {
		err := i.authorize(stream.Context(), info.FullMethod)
		if err != nil {
			return err
		}

		return handler(srv, stream)
	}
}

func (i *AuthInterceptor) isAuthOnly(method string) bool {
	authOnly, ok := i.authOnly[method]
	return ok && authOnly
}

func (i *AuthInterceptor) authorize(ctx context.Context, method string) error {
	if authOnly := i.isAuthOnly(method); !authOnly {
		return nil
	}

	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return status.Errorf(codes.Unauthenticated, "metadata is not provided")
	}

	values := md["authorization"]
	if len(values) == 0 {
		return status.Errorf(codes.Unauthenticated, "authorization token is not provided")
	}

	accessToken, err := GetAccessToken(ctx)
	if err != nil {
		return err
	}
	if _, err := i.jwtManager.Verify(accessToken); err != nil {
		return status.Errorf(codes.Unauthenticated, "access token is invalid: %v", err)
	}

	return nil
}

func GetAccessToken(ctx context.Context) (string, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return "", status.Errorf(codes.Unauthenticated, "metadata is not provided")
	}

	values := md["authorization"]
	if len(values) == 0 {
		return "", status.Errorf(codes.Unauthenticated, "authorization token is not provided")
	}

	accessToken := values[0]

	return accessToken, nil
}

type HasAuthServer interface {
	GetJwtManager() *JWTManager
}

func GetAuthUser(ctx context.Context, s HasAuthServer) (*pb.User, error) {
	accessToken, err := GetAccessToken(ctx)
	if err != nil {
		return nil, err
	}
	claims, err := s.GetJwtManager().Verify(accessToken)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "access token is invalid: %v", err)
	}

	return claims.User, nil
}
