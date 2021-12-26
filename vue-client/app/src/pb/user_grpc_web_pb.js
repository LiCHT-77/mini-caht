/**
 * @fileoverview gRPC-Web generated client stub for minichat.user
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.minichat = {};
proto.minichat.user = require('./user_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.minichat.user.UserServiceClient =
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
proto.minichat.user.UserServicePromiseClient =
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
 *   !proto.minichat.user.LoginRequest,
 *   !proto.minichat.user.LoginResponse>}
 */
const methodDescriptor_UserService_Login = new grpc.web.MethodDescriptor(
  '/minichat.user.UserService/Login',
  grpc.web.MethodType.UNARY,
  proto.minichat.user.LoginRequest,
  proto.minichat.user.LoginResponse,
  /**
   * @param {!proto.minichat.user.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.minichat.user.LoginResponse.deserializeBinary
);


/**
 * @param {!proto.minichat.user.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.minichat.user.LoginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.minichat.user.LoginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.minichat.user.UserServiceClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/minichat.user.UserService/Login',
      request,
      metadata || {},
      methodDescriptor_UserService_Login,
      callback);
};


/**
 * @param {!proto.minichat.user.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.minichat.user.LoginResponse>}
 *     Promise that resolves to the response
 */
proto.minichat.user.UserServicePromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/minichat.user.UserService/Login',
      request,
      metadata || {},
      methodDescriptor_UserService_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.minichat.user.RegisterRequest,
 *   !proto.minichat.user.RegisterResponse>}
 */
const methodDescriptor_UserService_Register = new grpc.web.MethodDescriptor(
  '/minichat.user.UserService/Register',
  grpc.web.MethodType.UNARY,
  proto.minichat.user.RegisterRequest,
  proto.minichat.user.RegisterResponse,
  /**
   * @param {!proto.minichat.user.RegisterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.minichat.user.RegisterResponse.deserializeBinary
);


/**
 * @param {!proto.minichat.user.RegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.minichat.user.RegisterResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.minichat.user.RegisterResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.minichat.user.UserServiceClient.prototype.register =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/minichat.user.UserService/Register',
      request,
      metadata || {},
      methodDescriptor_UserService_Register,
      callback);
};


/**
 * @param {!proto.minichat.user.RegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.minichat.user.RegisterResponse>}
 *     Promise that resolves to the response
 */
proto.minichat.user.UserServicePromiseClient.prototype.register =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/minichat.user.UserService/Register',
      request,
      metadata || {},
      methodDescriptor_UserService_Register);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.minichat.user.GetUserRequest,
 *   !proto.minichat.user.GetUserResponse>}
 */
const methodDescriptor_UserService_GetUser = new grpc.web.MethodDescriptor(
  '/minichat.user.UserService/GetUser',
  grpc.web.MethodType.UNARY,
  proto.minichat.user.GetUserRequest,
  proto.minichat.user.GetUserResponse,
  /**
   * @param {!proto.minichat.user.GetUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.minichat.user.GetUserResponse.deserializeBinary
);


/**
 * @param {!proto.minichat.user.GetUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.minichat.user.GetUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.minichat.user.GetUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.minichat.user.UserServiceClient.prototype.getUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/minichat.user.UserService/GetUser',
      request,
      metadata || {},
      methodDescriptor_UserService_GetUser,
      callback);
};


/**
 * @param {!proto.minichat.user.GetUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.minichat.user.GetUserResponse>}
 *     Promise that resolves to the response
 */
proto.minichat.user.UserServicePromiseClient.prototype.getUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/minichat.user.UserService/GetUser',
      request,
      metadata || {},
      methodDescriptor_UserService_GetUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.minichat.user.PutUserRequest,
 *   !proto.minichat.user.PutUserResponse>}
 */
const methodDescriptor_UserService_PutUser = new grpc.web.MethodDescriptor(
  '/minichat.user.UserService/PutUser',
  grpc.web.MethodType.UNARY,
  proto.minichat.user.PutUserRequest,
  proto.minichat.user.PutUserResponse,
  /**
   * @param {!proto.minichat.user.PutUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.minichat.user.PutUserResponse.deserializeBinary
);


/**
 * @param {!proto.minichat.user.PutUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.minichat.user.PutUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.minichat.user.PutUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.minichat.user.UserServiceClient.prototype.putUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/minichat.user.UserService/PutUser',
      request,
      metadata || {},
      methodDescriptor_UserService_PutUser,
      callback);
};


/**
 * @param {!proto.minichat.user.PutUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.minichat.user.PutUserResponse>}
 *     Promise that resolves to the response
 */
proto.minichat.user.UserServicePromiseClient.prototype.putUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/minichat.user.UserService/PutUser',
      request,
      metadata || {},
      methodDescriptor_UserService_PutUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.minichat.user.DeleteUserRequest,
 *   !proto.minichat.user.DeleteUserResponse>}
 */
const methodDescriptor_UserService_DeleteUser = new grpc.web.MethodDescriptor(
  '/minichat.user.UserService/DeleteUser',
  grpc.web.MethodType.UNARY,
  proto.minichat.user.DeleteUserRequest,
  proto.minichat.user.DeleteUserResponse,
  /**
   * @param {!proto.minichat.user.DeleteUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.minichat.user.DeleteUserResponse.deserializeBinary
);


/**
 * @param {!proto.minichat.user.DeleteUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.minichat.user.DeleteUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.minichat.user.DeleteUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.minichat.user.UserServiceClient.prototype.deleteUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/minichat.user.UserService/DeleteUser',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteUser,
      callback);
};


/**
 * @param {!proto.minichat.user.DeleteUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.minichat.user.DeleteUserResponse>}
 *     Promise that resolves to the response
 */
proto.minichat.user.UserServicePromiseClient.prototype.deleteUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/minichat.user.UserService/DeleteUser',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.minichat.user.GetUsersRequest,
 *   !proto.minichat.user.GetUsersResponse>}
 */
const methodDescriptor_UserService_GetUsers = new grpc.web.MethodDescriptor(
  '/minichat.user.UserService/GetUsers',
  grpc.web.MethodType.UNARY,
  proto.minichat.user.GetUsersRequest,
  proto.minichat.user.GetUsersResponse,
  /**
   * @param {!proto.minichat.user.GetUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.minichat.user.GetUsersResponse.deserializeBinary
);


/**
 * @param {!proto.minichat.user.GetUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.minichat.user.GetUsersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.minichat.user.GetUsersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.minichat.user.UserServiceClient.prototype.getUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/minichat.user.UserService/GetUsers',
      request,
      metadata || {},
      methodDescriptor_UserService_GetUsers,
      callback);
};


/**
 * @param {!proto.minichat.user.GetUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.minichat.user.GetUsersResponse>}
 *     Promise that resolves to the response
 */
proto.minichat.user.UserServicePromiseClient.prototype.getUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/minichat.user.UserService/GetUsers',
      request,
      metadata || {},
      methodDescriptor_UserService_GetUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.minichat.user.AddFriendRequest,
 *   !proto.minichat.user.AddFriendResponse>}
 */
const methodDescriptor_UserService_AddFriend = new grpc.web.MethodDescriptor(
  '/minichat.user.UserService/AddFriend',
  grpc.web.MethodType.UNARY,
  proto.minichat.user.AddFriendRequest,
  proto.minichat.user.AddFriendResponse,
  /**
   * @param {!proto.minichat.user.AddFriendRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.minichat.user.AddFriendResponse.deserializeBinary
);


/**
 * @param {!proto.minichat.user.AddFriendRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.minichat.user.AddFriendResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.minichat.user.AddFriendResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.minichat.user.UserServiceClient.prototype.addFriend =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/minichat.user.UserService/AddFriend',
      request,
      metadata || {},
      methodDescriptor_UserService_AddFriend,
      callback);
};


/**
 * @param {!proto.minichat.user.AddFriendRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.minichat.user.AddFriendResponse>}
 *     Promise that resolves to the response
 */
proto.minichat.user.UserServicePromiseClient.prototype.addFriend =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/minichat.user.UserService/AddFriend',
      request,
      metadata || {},
      methodDescriptor_UserService_AddFriend);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.minichat.user.RemoveFriendRequest,
 *   !proto.minichat.user.RemoveFriendResponse>}
 */
const methodDescriptor_UserService_RemoveFriend = new grpc.web.MethodDescriptor(
  '/minichat.user.UserService/RemoveFriend',
  grpc.web.MethodType.UNARY,
  proto.minichat.user.RemoveFriendRequest,
  proto.minichat.user.RemoveFriendResponse,
  /**
   * @param {!proto.minichat.user.RemoveFriendRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.minichat.user.RemoveFriendResponse.deserializeBinary
);


/**
 * @param {!proto.minichat.user.RemoveFriendRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.minichat.user.RemoveFriendResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.minichat.user.RemoveFriendResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.minichat.user.UserServiceClient.prototype.removeFriend =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/minichat.user.UserService/RemoveFriend',
      request,
      metadata || {},
      methodDescriptor_UserService_RemoveFriend,
      callback);
};


/**
 * @param {!proto.minichat.user.RemoveFriendRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.minichat.user.RemoveFriendResponse>}
 *     Promise that resolves to the response
 */
proto.minichat.user.UserServicePromiseClient.prototype.removeFriend =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/minichat.user.UserService/RemoveFriend',
      request,
      metadata || {},
      methodDescriptor_UserService_RemoveFriend);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.minichat.user.GetFriendsRequest,
 *   !proto.minichat.user.GetFriendsResponse>}
 */
const methodDescriptor_UserService_GetFriends = new grpc.web.MethodDescriptor(
  '/minichat.user.UserService/GetFriends',
  grpc.web.MethodType.UNARY,
  proto.minichat.user.GetFriendsRequest,
  proto.minichat.user.GetFriendsResponse,
  /**
   * @param {!proto.minichat.user.GetFriendsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.minichat.user.GetFriendsResponse.deserializeBinary
);


/**
 * @param {!proto.minichat.user.GetFriendsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.minichat.user.GetFriendsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.minichat.user.GetFriendsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.minichat.user.UserServiceClient.prototype.getFriends =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/minichat.user.UserService/GetFriends',
      request,
      metadata || {},
      methodDescriptor_UserService_GetFriends,
      callback);
};


/**
 * @param {!proto.minichat.user.GetFriendsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.minichat.user.GetFriendsResponse>}
 *     Promise that resolves to the response
 */
proto.minichat.user.UserServicePromiseClient.prototype.getFriends =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/minichat.user.UserService/GetFriends',
      request,
      metadata || {},
      methodDescriptor_UserService_GetFriends);
};


module.exports = proto.minichat.user;

