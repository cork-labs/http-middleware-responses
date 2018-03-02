'use strict';

const createResponse = require('./create-response');
const availableMethods = require('./methods');

const defaults = {
  ns: 'x-cork-labs',
  keys: {},
  methods: {}
};

const defaultKeys = {
  error: 'error',
  details: 'details'
};

const middleware = function (config) {
  config = Object.assign({}, defaults, config);
  config.keys = Object.assign({}, defaultKeys, config.keys);
  const methods = {};
  for (let key in availableMethods) {
    methods[key] = Object.assign({}, availableMethods[key]);
  }
  config.methods = Object.assign(methods, config.methods);

  const Response = createResponse(config, methods);

  // -- private

  const meta = (res, metaOrKey, value) => {
    const meta = {};
    if (typeof metaOrKey === 'string') {
      meta[metaOrKey] = value;
    } else {
      Object.assign(meta, metaOrKey);
    }

    for (let key in meta) {
      const header = config.ns + '-' + key;
      res.header(header, meta[key]);
    }
  };

  // -- middleware

  return function (req, res, next) {
    res._meta = {};
    res.meta = (metaOrKey, value) => {
      meta(res, metaOrKey, value);
    };
    res.response = new Response(req, res);
    next();
  };
};

module.exports = middleware;
