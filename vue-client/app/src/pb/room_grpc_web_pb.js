/**
 * @fileoverview gRPC-Web generated client stub for minichat.room
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')
const proto = {};
proto.minichat = {};
proto.minichat.room = require('./room_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.minichat.room.RoomServiceClient =
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
proto.minichat.room.RoomServicePromiseClient =
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
 *   !proto.minichat.room.GetRoomRequest,
 *   !proto.minichat.room.Room>}
 */
const methodDescriptor_RoomService_GetRoom = new grpc.web.MethodDescriptor(
  '/minichat.room.RoomService/GetRoom',
  grpc.web.MethodType.UNARY,
  proto.minichat.room.GetRoomRequest,
  proto.minichat.room.Room,
  /**
   * @param {!proto.minichat.room.GetRoomRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.minichat.room.Room.deserializeBinary
);


/**
 * @param {!proto.minichat.room.GetRoomRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.minichat.room.Room)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.minichat.room.Room>|undefined}
 *     The XHR Node Readable Stream
 */
proto.minichat.room.RoomServiceClient.prototype.getRoom =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/minichat.room.RoomService/GetRoom',
      request,
      metadata || {},
      methodDescriptor_RoomService_GetRoom,
      callback);
};


/**
 * @param {!proto.minichat.room.GetRoomRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.minichat.room.Room>}
 *     Promise that resolves to the response
 */
proto.minichat.room.RoomServicePromiseClient.prototype.getRoom =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/minichat.room.RoomService/GetRoom',
      request,
      metadata || {},
      methodDescriptor_RoomService_GetRoom);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.minichat.room.Room,
 *   !proto.minichat.room.Room>}
 */
const methodDescriptor_RoomService_CreateRoom = new grpc.web.MethodDescriptor(
  '/minichat.room.RoomService/CreateRoom',
  grpc.web.MethodType.UNARY,
  proto.minichat.room.Room,
  proto.minichat.room.Room,
  /**
   * @param {!proto.minichat.room.Room} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.minichat.room.Room.deserializeBinary
);


/**
 * @param {!proto.minichat.room.Room} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.minichat.room.Room)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.minichat.room.Room>|undefined}
 *     The XHR Node Readable Stream
 */
proto.minichat.room.RoomServiceClient.prototype.createRoom =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/minichat.room.RoomService/CreateRoom',
      request,
      metadata || {},
      methodDescriptor_RoomService_CreateRoom,
      callback);
};


/**
 * @param {!proto.minichat.room.Room} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.minichat.room.Room>}
 *     Promise that resolves to the response
 */
proto.minichat.room.RoomServicePromiseClient.prototype.createRoom =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/minichat.room.RoomService/CreateRoom',
      request,
      metadata || {},
      methodDescriptor_RoomService_CreateRoom);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.minichat.room.Room,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_RoomService_PutRoom = new grpc.web.MethodDescriptor(
  '/minichat.room.RoomService/PutRoom',
  grpc.web.MethodType.UNARY,
  proto.minichat.room.Room,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.minichat.room.Room} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.minichat.room.Room} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.minichat.room.RoomServiceClient.prototype.putRoom =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/minichat.room.RoomService/PutRoom',
      request,
      metadata || {},
      methodDescriptor_RoomService_PutRoom,
      callback);
};


/**
 * @param {!proto.minichat.room.Room} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.minichat.room.RoomServicePromiseClient.prototype.putRoom =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/minichat.room.RoomService/PutRoom',
      request,
      metadata || {},
      methodDescriptor_RoomService_PutRoom);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.minichat.room.DeleteRoomRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_RoomService_DeleteRoom = new grpc.web.MethodDescriptor(
  '/minichat.room.RoomService/DeleteRoom',
  grpc.web.MethodType.UNARY,
  proto.minichat.room.DeleteRoomRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.minichat.room.DeleteRoomRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.minichat.room.DeleteRoomRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.minichat.room.RoomServiceClient.prototype.deleteRoom =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/minichat.room.RoomService/DeleteRoom',
      request,
      metadata || {},
      methodDescriptor_RoomService_DeleteRoom,
      callback);
};


/**
 * @param {!proto.minichat.room.DeleteRoomRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.minichat.room.RoomServicePromiseClient.prototype.deleteRoom =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/minichat.room.RoomService/DeleteRoom',
      request,
      metadata || {},
      methodDescriptor_RoomService_DeleteRoom);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.minichat.room.GetRoomListRequest,
 *   !proto.minichat.room.GetRoomListResponse>}
 */
const methodDescriptor_RoomService_GetRoomList = new grpc.web.MethodDescriptor(
  '/minichat.room.RoomService/GetRoomList',
  grpc.web.MethodType.UNARY,
  proto.minichat.room.GetRoomListRequest,
  proto.minichat.room.GetRoomListResponse,
  /**
   * @param {!proto.minichat.room.GetRoomListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.minichat.room.GetRoomListResponse.deserializeBinary
);


/**
 * @param {!proto.minichat.room.GetRoomListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.minichat.room.GetRoomListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.minichat.room.GetRoomListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.minichat.room.RoomServiceClient.prototype.getRoomList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/minichat.room.RoomService/GetRoomList',
      request,
      metadata || {},
      methodDescriptor_RoomService_GetRoomList,
      callback);
};


/**
 * @param {!proto.minichat.room.GetRoomListRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.minichat.room.GetRoomListResponse>}
 *     Promise that resolves to the response
 */
proto.minichat.room.RoomServicePromiseClient.prototype.getRoomList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/minichat.room.RoomService/GetRoomList',
      request,
      metadata || {},
      methodDescriptor_RoomService_GetRoomList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.minichat.room.JoinRoomRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_RoomService_JoinRoom = new grpc.web.MethodDescriptor(
  '/minichat.room.RoomService/JoinRoom',
  grpc.web.MethodType.UNARY,
  proto.minichat.room.JoinRoomRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.minichat.room.JoinRoomRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.minichat.room.JoinRoomRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.minichat.room.RoomServiceClient.prototype.joinRoom =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/minichat.room.RoomService/JoinRoom',
      request,
      metadata || {},
      methodDescriptor_RoomService_JoinRoom,
      callback);
};


/**
 * @param {!proto.minichat.room.JoinRoomRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.minichat.room.RoomServicePromiseClient.prototype.joinRoom =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/minichat.room.RoomService/JoinRoom',
      request,
      metadata || {},
      methodDescriptor_RoomService_JoinRoom);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.minichat.room.ExitRoomRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_RoomService_ExitRoom = new grpc.web.MethodDescriptor(
  '/minichat.room.RoomService/ExitRoom',
  grpc.web.MethodType.UNARY,
  proto.minichat.room.ExitRoomRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.minichat.room.ExitRoomRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.minichat.room.ExitRoomRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.minichat.room.RoomServiceClient.prototype.exitRoom =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/minichat.room.RoomService/ExitRoom',
      request,
      metadata || {},
      methodDescriptor_RoomService_ExitRoom,
      callback);
};


/**
 * @param {!proto.minichat.room.ExitRoomRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.minichat.room.RoomServicePromiseClient.prototype.exitRoom =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/minichat.room.RoomService/ExitRoom',
      request,
      metadata || {},
      methodDescriptor_RoomService_ExitRoom);
};


module.exports = proto.minichat.room;

