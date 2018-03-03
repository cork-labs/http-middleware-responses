'use strict';

const errorMethods = {
  // data
  ok: {
    type: 'data',
    status: 200,
    severity: 'info'
  },
  created: {
    type: 'data',
    status: 201,
    severity: 'info'
  },
  accepted: {
    type: 'data',
    status: 202,
    severity: 'info'
  },
  nonAuthoritativeInformation: {
    type: 'data',
    status: 203,
    severity: 'info'
  },
  // no content
  noContent: {
    type: 'no-content',
    status: 204,
    severity: 'info'
  },
  resetContent: {
    type: 'no-content',
    status: 205,
    severity: 'info'
  },
  // client errors
  badRequest: {
    type: 'client-error',
    status: 400,
    severity: 'warn',
    text: 'BadRequest'
  },
  unauthorized: {
    type: 'client-error',
    status: 401,
    severity: 'warn',
    text: 'Unauthorized'
  },
  paymentRequired: {
    type: 'client-error',
    status: 402,
    severity: 'warn',
    text: 'PaymentRequired'
  },
  forbidden: {
    type: 'client-error',
    status: 403,
    severity: 'warn',
    text: 'Forbidden'
  },
  notFound: {
    type: 'client-error',
    status: 404,
    severity: 'warn',
    text: 'NotFound'
  },
  methodNotAllowed: {
    type: 'client-error',
    status: 405,
    severity: 'warn',
    text: 'MethodNotAllowed'
  },
  notAcceptable: {
    type: 'client-error',
    status: 406,
    severity: 'warn',
    text: 'NotAcceptable'
  },
  proxyAuthenticationRequired: {
    type: 'client-error',
    status: 407,
    severity: 'warn',
    text: 'ProxyAuthenticationRequired'
  },
  requestTimeout: {
    type: 'client-error',
    status: 408,
    severity: 'warn',
    text: 'RequestTimeout'
  },
  conflict: {
    type: 'client-error',
    status: 409,
    severity: 'warn',
    text: 'Conflict'
  },
  gone: {
    type: 'client-error',
    status: 410,
    severity: 'warn',
    text: 'Gone'
  },
  lengthRequired: {
    type: 'client-error',
    status: 411,
    severity: 'warn',
    text: 'LengthRequired'
  },
  preconditionFailed: {
    type: 'client-error',
    status: 412,
    severity: 'warn',
    text: 'PreconditionFailed'
  },
  payloadTooLarge: {
    type: 'client-error',
    status: 413,
    severity: 'warn',
    text: 'PayloadTooLarge'
  },
  uriTooLong: {
    type: 'client-error',
    status: 414,
    severity: 'warn',
    text: 'URITooLong'
  },
  unsupportedMediaType: {
    type: 'client-error',
    status: 415,
    severity: 'warn',
    text: 'UnsupportedMediaType'
  },
  rangeNotSatisfiable: {
    type: 'client-error',
    status: 416,
    severity: 'warn',
    text: 'RangeNotSatisfiable'
  },
  expectationFailed: {
    type: 'client-error',
    status: 417,
    severity: 'warn',
    text: 'ExpectationFailed'
  },
  imATeapot: {
    type: 'client-error',
    status: 418,
    severity: 'warn',
    text: 'ImATeapot'
  },
  misdirectedRequest: {
    type: 'client-error',
    status: 421,
    severity: 'warn',
    text: 'MisdirectedRequest'
  },
  unprocessableEntity: {
    type: 'client-error',
    status: 422,
    severity: 'warn',
    text: 'UnprocessableEntity'
  },
  locked: {
    type: 'client-error',
    status: 423,
    severity: 'warn',
    text: 'Locked'
  },
  failedDependency: {
    type: 'client-error',
    status: 424,
    severity: 'warn',
    text: 'FailedDependency'
  },
  unorderedCollection: {
    type: 'client-error',
    status: 425,
    severity: 'warn',
    text: 'UnorderedCollection'
  },
  upgradeRequired: {
    type: 'client-error',
    status: 426,
    severity: 'warn',
    text: 'UpgradeRequired'
  },
  preconditionRequired: {
    type: 'client-error',
    status: 428,
    severity: 'warn',
    text: 'PreconditionRequired'
  },
  tooManyRequests: {
    type: 'client-error',
    status: 429,
    severity: 'warn',
    text: 'TooManyRequests'
  },
  requestHeaderFieldsTooLarge: {
    type: 'client-error',
    status: 431,
    severity: 'warn',
    text: 'RequestHeaderFieldsTooLarge'
  },
  unavailableForLegalReasons: {
    type: 'client-error',
    status: 451,
    severity: 'warn',
    text: 'UnavailableForLegalReasons'
  },
  // server errors
  internalServerError: {
    type: 'server-error',
    severity: 'error',
    status: 500,
    text: 'InternalServerError'
  },
  notImplemented: {
    type: 'server-error',
    severity: 'error',
    status: 501,
    text: 'NotImplemented'
  },
  badGateway: {
    type: 'server-error',
    severity: 'error',
    status: 502,
    text: 'BadGateway'
  },
  serviceUnavailable: {
    type: 'server-error',
    severity: 'error',
    status: 503,
    text: 'ServiceUnavailable'
  },
  gatewayTimeout: {
    type: 'server-error',
    severity: 'error',
    status: 504,
    text: 'GatewayTimeout'
  },
  hTTPVersionNotSupported: {
    type: 'server-error',
    severity: 'error',
    status: 505,
    text: 'HTTPVersionNotSupported'
  },
  variantAlsoNegotiates: {
    type: 'server-error',
    severity: 'error',
    status: 506,
    text: 'VariantAlsoNegotiates'
  },
  insufficientStorage: {
    type: 'server-error',
    severity: 'error',
    status: 507,
    text: 'InsufficientStorage'
  },
  loopDetected: {
    type: 'server-error',
    severity: 'error',
    status: 508,
    text: 'LoopDetected'
  },
  bandwidthLimitExceeded: {
    type: 'server-error',
    severity: 'error',
    status: 509,
    text: 'BandwidthLimitExceeded'
  },
  notExtended: {
    type: 'server-error',
    severity: 'error',
    status: 510,
    text: 'NotExtended'
  },
  networkAuthenticationRequired: {
    type: 'server-error',
    severity: 'error',
    status: 511,
    text: 'NetworkAuthenticationRequired'
  }
};

module.exports = errorMethods;
