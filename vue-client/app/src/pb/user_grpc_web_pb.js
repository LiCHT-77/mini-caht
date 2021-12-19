/**
 * @fileoverview gRPC-Web generated client stub for grpcuser
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.grpcuser = require('./user_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.grpcuser.UserServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.grpcuser.UserServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.grpcuser.LoginRequest,
 *   !proto.grpcuser.LoginResponse>}
 */
const methodDescriptor_UserService_Login = new grpc.web.MethodDescriptor(
  '/grpcuser.UserService/Login',
  grpc.web.MethodType.UNARY,
  proto.grpcuser.LoginRequest,
  proto.grpcuser.LoginResponse,
  /**
   * @param {!proto.grpcuser.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpcuser.LoginResponse.deserializeBinary
);


/**
 * @param {!proto.grpcuser.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.grpcuser.LoginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grpcuser.LoginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grpcuser.UserServiceClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grpcuser.UserService/Login',
      request,
      metadata || {},
      methodDescriptor_UserService_Login,
      callback);
};


/**
 * @param {!proto.grpcuser.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grpcuser.LoginResponse>}
 *     Promise that resolves to the response
 */
proto.grpcuser.UserServicePromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/grpcuser.UserService/Login',
      request,
      metadata || {},
      methodDescriptor_UserService_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.grpcuser.RegisterRequest,
 *   !proto.grpcuser.RegisterResponse>}
 */
const methodDescriptor_UserService_Register = new grpc.web.MethodDescriptor(
  '/grpcuser.UserService/Register',
  grpc.web.MethodType.UNARY,
  proto.grpcuser.RegisterRequest,
  proto.grpcuser.RegisterResponse,
  /**
   * @param {!proto.grpcuser.RegisterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpcuser.RegisterResponse.deserializeBinary
);


/**
 * @param {!proto.grpcuser.RegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.grpcuser.RegisterResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grpcuser.RegisterResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grpcuser.UserServiceClient.prototype.register =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grpcuser.UserService/Register',
      request,
      metadata || {},
      methodDescriptor_UserService_Register,
      callback);
};


/**
 * @param {!proto.grpcuser.RegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grpcuser.RegisterResponse>}
 *     Promise that resolves to the response
 */
proto.grpcuser.UserServicePromiseClient.prototype.register =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/grpcuser.UserService/Register',
      request,
      metadata || {},
      methodDescriptor_UserService_Register);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.grpcuser.GetUserRequest,
 *   !proto.grpcuser.GetUserResponse>}
 */
const methodDescriptor_UserService_GetUser = new grpc.web.MethodDescriptor(
  '/grpcuser.UserService/GetUser',
  grpc.web.MethodType.UNARY,
  proto.grpcuser.GetUserRequest,
  proto.grpcuser.GetUserResponse,
  /**
   * @param {!proto.grpcuser.GetUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpcuser.GetUserResponse.deserializeBinary
);


/**
 * @param {!proto.grpcuser.GetUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.grpcuser.GetUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grpcuser.GetUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grpcuser.UserServiceClient.prototype.getUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grpcuser.UserService/GetUser',
      request,
      metadata || {},
      methodDescriptor_UserService_GetUser,
      callback);
};


/**
 * @param {!proto.grpcuser.GetUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grpcuser.GetUserResponse>}
 *     Promise that resolves to the response
 */
proto.grpcuser.UserServicePromiseClient.prototype.getUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/grpcuser.UserService/GetUser',
      request,
      metadata || {},
      methodDescriptor_UserService_GetUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.grpcuser.PutUserRequest,
 *   !proto.grpcuser.PutUserResponse>}
 */
const methodDescriptor_UserService_PutUser = new grpc.web.MethodDescriptor(
  '/grpcuser.UserService/PutUser',
  grpc.web.MethodType.UNARY,
  proto.grpcuser.PutUserRequest,
  proto.grpcuser.PutUserResponse,
  /**
   * @param {!proto.grpcuser.PutUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpcuser.PutUserResponse.deserializeBinary
);


/**
 * @param {!proto.grpcuser.PutUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.grpcuser.PutUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grpcuser.PutUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grpcuser.UserServiceClient.prototype.putUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grpcuser.UserService/PutUser',
      request,
      metadata || {},
      methodDescriptor_UserService_PutUser,
      callback);
};


/**
 * @param {!proto.grpcuser.PutUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grpcuser.PutUserResponse>}
 *     Promise that resolves to the response
 */
proto.grpcuser.UserServicePromiseClient.prototype.putUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/grpcuser.UserService/PutUser',
      request,
      metadata || {},
      methodDescriptor_UserService_PutUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.grpcuser.DeleteUserRequest,
 *   !proto.grpcuser.DeleteUserResponse>}
 */
const methodDescriptor_UserService_DeleteUser = new grpc.web.MethodDescriptor(
  '/grpcuser.UserService/DeleteUser',
  grpc.web.MethodType.UNARY,
  proto.grpcuser.DeleteUserRequest,
  proto.grpcuser.DeleteUserResponse,
  /**
   * @param {!proto.grpcuser.DeleteUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpcuser.DeleteUserResponse.deserializeBinary
);


/**
 * @param {!proto.grpcuser.DeleteUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.grpcuser.DeleteUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grpcuser.DeleteUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grpcuser.UserServiceClient.prototype.deleteUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grpcuser.UserService/DeleteUser',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteUser,
      callback);
};


/**
 * @param {!proto.grpcuser.DeleteUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grpcuser.DeleteUserResponse>}
 *     Promise that resolves to the response
 */
proto.grpcuser.UserServicePromiseClient.prototype.deleteUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/grpcuser.UserService/DeleteUser',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.grpcuser.GetUsersRequest,
 *   !proto.grpcuser.GetUsersResponse>}
 */
const methodDescriptor_UserService_GetUsers = new grpc.web.MethodDescriptor(
  '/grpcuser.UserService/GetUsers',
  grpc.web.MethodType.UNARY,
  proto.grpcuser.GetUsersRequest,
  proto.grpcuser.GetUsersResponse,
  /**
   * @param {!proto.grpcuser.GetUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpcuser.GetUsersResponse.deserializeBinary
);


/**
 * @param {!proto.grpcuser.GetUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.grpcuser.GetUsersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grpcuser.GetUsersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grpcuser.UserServiceClient.prototype.getUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grpcuser.UserService/GetUsers',
      request,
      metadata || {},
      methodDescriptor_UserService_GetUsers,
      callback);
};


/**
 * @param {!proto.grpcuser.GetUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grpcuser.GetUsersResponse>}
 *     Promise that resolves to the response
 */
proto.grpcuser.UserServicePromiseClient.prototype.getUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/grpcuser.UserService/GetUsers',
      request,
      metadata || {},
      methodDescriptor_UserService_GetUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.grpcuser.AddFriendRequest,
 *   !proto.grpcuser.AddFriendResponse>}
 */
const methodDescriptor_UserService_AddFriend = new grpc.web.MethodDescriptor(
  '/grpcuser.UserService/AddFriend',
  grpc.web.MethodType.UNARY,
  proto.grpcuser.AddFriendRequest,
  proto.grpcuser.AddFriendResponse,
  /**
   * @param {!proto.grpcuser.AddFriendRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpcuser.AddFriendResponse.deserializeBinary
);


/**
 * @param {!proto.grpcuser.AddFriendRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.grpcuser.AddFriendResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grpcuser.AddFriendResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grpcuser.UserServiceClient.prototype.addFriend =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grpcuser.UserService/AddFriend',
      request,
      metadata || {},
      methodDescriptor_UserService_AddFriend,
      callback);
};


/**
 * @param {!proto.grpcuser.AddFriendRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grpcuser.AddFriendResponse>}
 *     Promise that resolves to the response
 */
proto.grpcuser.UserServicePromiseClient.prototype.addFriend =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/grpcuser.UserService/AddFriend',
      request,
      metadata || {},
      methodDescriptor_UserService_AddFriend);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.grpcuser.RemoveFriendRequest,
 *   !proto.grpcuser.RemoveFriendResponse>}
 */
const methodDescriptor_UserService_RemoveFriend = new grpc.web.MethodDescriptor(
  '/grpcuser.UserService/RemoveFriend',
  grpc.web.MethodType.UNARY,
  proto.grpcuser.RemoveFriendRequest,
  proto.grpcuser.RemoveFriendResponse,
  /**
   * @param {!proto.grpcuser.RemoveFriendRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpcuser.RemoveFriendResponse.deserializeBinary
);


/**
 * @param {!proto.grpcuser.RemoveFriendRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.grpcuser.RemoveFriendResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grpcuser.RemoveFriendResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grpcuser.UserServiceClient.prototype.removeFriend =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grpcuser.UserService/RemoveFriend',
      request,
      metadata || {},
      methodDescriptor_UserService_RemoveFriend,
      callback);
};


/**
 * @param {!proto.grpcuser.RemoveFriendRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grpcuser.RemoveFriendResponse>}
 *     Promise that resolves to the response
 */
proto.grpcuser.UserServicePromiseClient.prototype.removeFriend =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/grpcuser.UserService/RemoveFriend',
      request,
      metadata || {},
      methodDescriptor_UserService_RemoveFriend);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.grpcuser.GetFriendsRequest,
 *   !proto.grpcuser.GetFriendsResponse>}
 */
const methodDescriptor_UserService_GetFriends = new grpc.web.MethodDescriptor(
  '/grpcuser.UserService/GetFriends',
  grpc.web.MethodType.UNARY,
  proto.grpcuser.GetFriendsRequest,
  proto.grpcuser.GetFriendsResponse,
  /**
   * @param {!proto.grpcuser.GetFriendsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpcuser.GetFriendsResponse.deserializeBinary
);


/**
 * @param {!proto.grpcuser.GetFriendsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.grpcuser.GetFriendsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grpcuser.GetFriendsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grpcuser.UserServiceClient.prototype.getFriends =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grpcuser.UserService/GetFriends',
      request,
      metadata || {},
      methodDescriptor_UserService_GetFriends,
      callback);
};


/**
 * @param {!proto.grpcuser.GetFriendsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grpcuser.GetFriendsResponse>}
 *     Promise that resolves to the response
 */
proto.grpcuser.UserServicePromiseClient.prototype.getFriends =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/grpcuser.UserService/GetFriends',
      request,
      metadata || {},
      methodDescriptor_UserService_GetFriends);
};


module.exports = proto.grpcuser;

