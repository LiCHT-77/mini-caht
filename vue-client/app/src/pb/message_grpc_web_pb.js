/**
 * @fileoverview gRPC-Web generated client stub for minichat.message
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')
const proto = {};
proto.minichat = {};
proto.minichat.message = require('./message_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.minichat.message.MessageServiceClient =
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
proto.minichat.message.MessageServicePromiseClient =
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
 *   !proto.minichat.message.GetMessageRequest,
 *   !proto.minichat.message.Message>}
 */
const methodDescriptor_MessageService_GetMessage = new grpc.web.MethodDescriptor(
  '/minichat.message.MessageService/GetMessage',
  grpc.web.MethodType.UNARY,
  proto.minichat.message.GetMessageRequest,
  proto.minichat.message.Message,
  /**
   * @param {!proto.minichat.message.GetMessageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.minichat.message.Message.deserializeBinary
);


/**
 * @param {!proto.minichat.message.GetMessageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.minichat.message.Message)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.minichat.message.Message>|undefined}
 *     The XHR Node Readable Stream
 */
proto.minichat.message.MessageServiceClient.prototype.getMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/minichat.message.MessageService/GetMessage',
      request,
      metadata || {},
      methodDescriptor_MessageService_GetMessage,
      callback);
};


/**
 * @param {!proto.minichat.message.GetMessageRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.minichat.message.Message>}
 *     Promise that resolves to the response
 */
proto.minichat.message.MessageServicePromiseClient.prototype.getMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/minichat.message.MessageService/GetMessage',
      request,
      metadata || {},
      methodDescriptor_MessageService_GetMessage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.minichat.message.Message,
 *   !proto.minichat.message.Message>}
 */
const methodDescriptor_MessageService_PostMessage = new grpc.web.MethodDescriptor(
  '/minichat.message.MessageService/PostMessage',
  grpc.web.MethodType.UNARY,
  proto.minichat.message.Message,
  proto.minichat.message.Message,
  /**
   * @param {!proto.minichat.message.Message} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.minichat.message.Message.deserializeBinary
);


/**
 * @param {!proto.minichat.message.Message} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.minichat.message.Message)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.minichat.message.Message>|undefined}
 *     The XHR Node Readable Stream
 */
proto.minichat.message.MessageServiceClient.prototype.postMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/minichat.message.MessageService/PostMessage',
      request,
      metadata || {},
      methodDescriptor_MessageService_PostMessage,
      callback);
};


/**
 * @param {!proto.minichat.message.Message} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.minichat.message.Message>}
 *     Promise that resolves to the response
 */
proto.minichat.message.MessageServicePromiseClient.prototype.postMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/minichat.message.MessageService/PostMessage',
      request,
      metadata || {},
      methodDescriptor_MessageService_PostMessage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.minichat.message.GetMessageListRequest,
 *   !proto.minichat.message.Message>}
 */
const methodDescriptor_MessageService_GetMessageList = new grpc.web.MethodDescriptor(
  '/minichat.message.MessageService/GetMessageList',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.minichat.message.GetMessageListRequest,
  proto.minichat.message.Message,
  /**
   * @param {!proto.minichat.message.GetMessageListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.minichat.message.Message.deserializeBinary
);


/**
 * @param {!proto.minichat.message.GetMessageListRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.minichat.message.Message>}
 *     The XHR Node Readable Stream
 */
proto.minichat.message.MessageServiceClient.prototype.getMessageList =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/minichat.message.MessageService/GetMessageList',
      request,
      metadata || {},
      methodDescriptor_MessageService_GetMessageList);
};


/**
 * @param {!proto.minichat.message.GetMessageListRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.minichat.message.Message>}
 *     The XHR Node Readable Stream
 */
proto.minichat.message.MessageServicePromiseClient.prototype.getMessageList =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/minichat.message.MessageService/GetMessageList',
      request,
      metadata || {},
      methodDescriptor_MessageService_GetMessageList);
};


module.exports = proto.minichat.message;

