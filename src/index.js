'use strict';

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

const response = function (config) {
  config = Object.assign({}, defaults, config);
  config.keys = Object.assign({}, defaultKeys, config.keys);
  const methods = Object.assign({}, config.methods);
  for (let key in availableMethods) {
    methods[key] = Object.assign({}, availableMethods[key]);
  }
  Object.assign(methods, config.methods);

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

  const dataMethod = (name, options) => {
    return (req, res) => (data) => {
      res.status(options.status);
      res.json(data);
    };
  };

  const noContentMethod = (name, options) => {
    return (req, res) => () => {
      res.status(options.status);
      res.json();
    };
  };

  const errorMethod = (name, options) => {
    return (req, res) => (details) => {
      const payload = {};
      payload[config.keys.error] = options.text;
      if (details) {
        payload[config.keys.details] = details;
      }
      res.status(options.status);
      res.json(payload);
    };
  };

  for (let name in methods) {
    if (typeof methods[name] !== 'function') {
      switch (methods[name].type) {
        case 'data':
          methods[name] = dataMethod(name, methods[name]);
          break;
        case 'no-content':
          methods[name] = noContentMethod(name, methods[name]);
          break;
        case 'client-error':
        case 'server-error':
          methods[name] = errorMethod(name, methods[name]);
          break;
        default:
          throw new Error(`Invalid method definition for method "${name}".`);
      }
    }
  }

  const makeMethod = function (name, req, res) {
    const method = methods[name](req, res);
    return function () {
      method.apply(null, arguments);
    };
  };

  // -- middleware

  return function (req, res, next) {
    res._meta = {};
    res.meta = (metaOrKey, value) => {
      meta(res, metaOrKey, value);
    }; ;
    for (let name in methods) {
      res[name] = makeMethod(name, req, res);
    }
    next();
  };
};

module.exports = response;
