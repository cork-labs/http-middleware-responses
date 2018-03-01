'use strict';

const errorMap = {
  badRequest: {
    status: 400,
    text: 'BadRequest'
  },
  unauthorized: {
    status: 401,
    text: 'Unauthorized'
  },
  paymentRequired: {
    status: 402,
    text: 'PaymentRequired'
  },
  forbidden: {
    status: 403,
    text: 'Forbidden'
  },
  notFound: {
    status: 404,
    text: 'NotFound'
  },
  methodNotAllowed: {
    status: 405,
    text: 'MethodNotAllowed'
  },
  notAcceptable: {
    status: 406,
    text: 'NotAcceptable'
  },
  proxyAuthenticationRequired: {
    status: 407,
    text: 'ProxyAuthenticationRequired'
  },
  requestTimeout: {
    status: 408,
    text: 'RequestTimeout'
  },
  conflict: {
    status: 409,
    text: 'Conflict'
  },
  gone: {
    status: 410,
    text: 'Gone'
  },
  lengthRequired: {
    status: 411,
    text: 'LengthRequired'
  },
  preconditionFailed: {
    status: 412,
    text: 'PreconditionFailed'
  },
  payloadTooLarge: {
    status: 413,
    text: 'PayloadTooLarge'
  },
  uriTooLong: {
    status: 414,
    text: 'URITooLong'
  },
  unsupportedMediaType: {
    status: 415,
    text: 'UnsupportedMediaType'
  },
  rangeNotSatisfiable: {
    status: 416,
    text: 'RangeNotSatisfiable'
  },
  expectationFailed: {
    status: 417,
    text: 'ExpectationFailed'
  },
  imATeapot: {
    status: 418,
    text: 'ImATeapot'
  },
  misdirectedRequest: {
    status: 421,
    text: 'MisdirectedRequest'
  },
  unprocessableEntity: {
    status: 422,
    text: 'UnprocessableEntity'
  },
  locked: {
    status: 423,
    text: 'Locked'
  },
  failedDependency: {
    status: 424,
    text: 'FailedDependency'
  },
  unorderedCollection: {
    status: 425,
    text: 'UnorderedCollection'
  },
  upgradeRequired: {
    status: 426,
    text: 'UpgradeRequired'
  },
  preconditionRequired: {
    status: 428,
    text: 'PreconditionRequired'
  },
  tooManyRequests: {
    status: 429,
    text: 'TooManyRequests'
  },
  requestHeaderFieldsTooLarge: {
    status: 431,
    text: 'RequestHeaderFieldsTooLarge'
  },
  unavailableForLegalReasons: {
    status: 451,
    text: 'UnavailableForLegalReasons'
  },
  internalServerError: {
    status: 500,
    text: 'InternalServerError'
  },
  notImplemented: {
    status: 501,
    text: 'NotImplemented'
  },
  badGateway: {
    status: 502,
    text: 'BadGateway'
  },
  serviceUnavailable: {
    status: 503,
    text: 'ServiceUnavailable'
  },
  gatewayTimeout: {
    status: 504,
    text: 'GatewayTimeout'
  },
  hTTPVersionNotSupported: {
    status: 505,
    text: 'HTTPVersionNotSupported'
  },
  variantAlsoNegotiates: {
    status: 506,
    text: 'VariantAlsoNegotiates'
  },
  insufficientStorage: {
    status: 507,
    text: 'InsufficientStorage'
  },
  loopDetected: {
    status: 508,
    text: 'LoopDetected'
  },
  bandwidthLimitExceeded: {
    status: 509,
    text: 'BandwidthLimitExceeded'
  },
  notExtended: {
    status: 510,
    text: 'NotExtended'
  },
  networkAuthenticationRequired: {
    status: 511,
    text: 'NetworkAuthenticationRequired'
  }
};

module.exports = errorMap;
