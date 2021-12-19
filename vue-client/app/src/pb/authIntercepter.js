


const AuthUnaryInterceptor = function() {};

/**
 * @export
 * @abstract
 * @template REQUEST, RESPONSE
 * @param {!Request<REQUEST, RESPONSE>} request
 * @param {function(!Request<REQUEST,RESPONSE>):!Promise<!UnaryResponse<RESPONSE>>}
 *     invoker
 * @return {!Promise<!UnaryResponse<RESPONSE>>}
 */
AuthUnaryInterceptor.prototype.intercept = function(request, invoker) {
  request.withMetadata("authorization", "")
};


const AuthStreamInterceptor = function() {};

/**
 * @export
 * @abstract
 * @template REQUEST, RESPONSE
 * @param {!Request<REQUEST, RESPONSE>} request
 * @param {function(!Request<REQUEST,RESPONSE>):!ClientReadableStream<RESPONSE>}
 *     invoker
 * @return {!ClientReadableStream<RESPONSE>}
 */
AuthStreamInterceptor.prototype.intercept = function(request, invoker) {};


exports = {
  AuthUnaryInterceptor,
  AuthStreamInterceptor
};