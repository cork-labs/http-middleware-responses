'use strict';

const errorMethods = {
  // data
  ok: {
    type: 'data',
    status: 200
  },
  created: {
    type: 'data',
    status: 201
  },
  accepted: {
    type: 'data',
    status: 202
  },
  nonAuthoritativeInformation: {
    type: 'data',
    status: 203
  },
  // no content
  noContent: {
    type: 'no-content',
    status: 204
  },
  resetContent: {
    type: 'no-content',
    status: 205
  },
  // client errors
  badRequest: {
    type: 'client-error',
    status: 400,
    text: 'BadRequest'
  },
  unauthorized: {
    type: 'client-error',
    status: 401,
    text: 'Unauthorized'
  },
  paymentRequired: {
    type: 'client-error',
    status: 402,
    text: 'PaymentRequired'
  },
  forbidden: {
    type: 'client-error',
    status: 403,
    text: 'Forbidden'
  },
  notFound: {
    type: 'client-error',
    status: 404,
    text: 'NotFound'
  },
  methodNotAllowed: {
    type: 'client-error',
    status: 405,
    text: 'MethodNotAllowed'
  },
  notAcceptable: {
    type: 'client-error',
    status: 406,
    text: 'NotAcceptable'
  },
  proxyAuthenticationRequired: {
    type: 'client-error',
    status: 407,
    text: 'ProxyAuthenticationRequired'
  },
  requestTimeout: {
    type: 'client-error',
    status: 408,
    text: 'RequestTimeout'
  },
  conflict: {
    type: 'client-error',
    status: 409,
    text: 'Conflict'
  },
  gone: {
    type: 'client-error',
    status: 410,
    text: 'Gone'
  },
  lengthRequired: {
    type: 'client-error',
    status: 411,
    text: 'LengthRequired'
  },
  preconditionFailed: {
    type: 'client-error',
    status: 412,
    text: 'PreconditionFailed'
  },
  payloadTooLarge: {
    type: 'client-error',
    status: 413,
    text: 'PayloadTooLarge'
  },
  uriTooLong: {
    type: 'client-error',
    status: 414,
    text: 'URITooLong'
  },
  unsupportedMediaType: {
    type: 'client-error',
    status: 415,
    text: 'UnsupportedMediaType'
  },
  rangeNotSatisfiable: {
    type: 'client-error',
    status: 416,
    text: 'RangeNotSatisfiable'
  },
  expectationFailed: {
    type: 'client-error',
    status: 417,
    text: 'ExpectationFailed'
  },
  imATeapot: {
    type: 'client-error',
    status: 418,
    text: 'ImATeapot'
  },
  misdirectedRequest: {
    type: 'client-error',
    status: 421,
    text: 'MisdirectedRequest'
  },
  unprocessableEntity: {
    type: 'client-error',
    status: 422,
    text: 'UnprocessableEntity'
  },
  locked: {
    type: 'client-error',
    status: 423,
    text: 'Locked'
  },
  failedDependency: {
    type: 'client-error',
    status: 424,
    text: 'FailedDependency'
  },
  unorderedCollection: {
    type: 'client-error',
    status: 425,
    text: 'UnorderedCollection'
  },
  upgradeRequired: {
    type: 'client-error',
    status: 426,
    text: 'UpgradeRequired'
  },
  preconditionRequired: {
    type: 'client-error',
    status: 428,
    text: 'PreconditionRequired'
  },
  tooManyRequests: {
    type: 'client-error',
    status: 429,
    text: 'TooManyRequests'
  },
  requestHeaderFieldsTooLarge: {
    type: 'client-error',
    status: 431,
    text: 'RequestHeaderFieldsTooLarge'
  },
  unavailableForLegalReasons: {
    type: 'client-error',
    status: 451,
    text: 'UnavailableForLegalReasons'
  },
  // server errors
  internalServerError: {
    type: 'server-error',
    status: 500,
    text: 'InternalServerError'
  },
  notImplemented: {
    type: 'server-error',
    status: 501,
    text: 'NotImplemented'
  },
  badGateway: {
    type: 'server-error',
    status: 502,
    text: 'BadGateway'
  },
  serviceUnavailable: {
    type: 'server-error',
    status: 503,
    text: 'ServiceUnavailable'
  },
  gatewayTimeout: {
    type: 'server-error',
    status: 504,
    text: 'GatewayTimeout'
  },
  hTTPVersionNotSupported: {
    type: 'server-error',
    status: 505,
    text: 'HTTPVersionNotSupported'
  },
  variantAlsoNegotiates: {
    type: 'server-error',
    status: 506,
    text: 'VariantAlsoNegotiates'
  },
  insufficientStorage: {
    type: 'server-error',
    status: 507,
    text: 'InsufficientStorage'
  },
  loopDetected: {
    type: 'server-error',
    status: 508,
    text: 'LoopDetected'
  },
  bandwidthLimitExceeded: {
    type: 'server-error',
    status: 509,
    text: 'BandwidthLimitExceeded'
  },
  notExtended: {
    type: 'server-error',
    status: 510,
    text: 'NotExtended'
  },
  networkAuthenticationRequired: {
    type: 'server-error',
    status: 511,
    text: 'NetworkAuthenticationRequired'
  }
};

module.exports = errorMethods;
