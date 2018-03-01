'use strict';

const errorMap = require('./errorMap');

const defaults = {
  ns: 'x-cork-labs',
  keys: {},
  errors: {},
  methods: {}
};

const defaultKeys = {
  error: 'error',
  details: 'details'
};

const response = function (config) {
  config = Object.assign({}, defaults, config);
  config.keys = Object.assign({}, defaultKeys, config.keys);

  const errors = Object.assign(errorMap, config.errors);

  // -- private

  const meta = (res, metaOrKey, value) => {
    const _meta = {};
    if (typeof metaOrKey === 'string') {
      _meta[metaOrKey] = value;
    } else {
      Object.assign(_meta, metaOrKey);
    }

    for (let key in _meta) {
      const header = config.ns + '-' + key;
      res.header(header, res._meta[key]);
    }
  };

  const methods = {
    data: (req, res) => (data) => {
      res.status(200);
      res.json(data);
    },
    noContent: (req, res) => () => {
      res.status(204);
      res.json();
    },
    created: (req, res) => () => {
      res.status(204);
      res.json();
    }
  };

  for (let error in errors) {
    methods[error] = (req, res) => {
      return (details) => {
        const payload = {};
        payload[config.keys.error] = errors[error].text;
        if (details) {
          payload[config.keys.details] = details;
        }
        res.status(errors[error].status);
        res.json(payload);
      };
    };

    Object.assign(methods, config.methods);
  }

  const makeMethod = function (key, req, res) {
    const method = methods[key](req, res);
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
    for (let key in methods) {
      res[key] = makeMethod(key, req, res);
    }
    next();
  };
};

module.exports = response;
