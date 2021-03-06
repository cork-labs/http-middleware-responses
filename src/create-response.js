'use strict';

function createResponse (config, methods) {
  class Response {
    constructor (req, res) {
      this._req = req;
      this._res = res;
    }

    severity (severity) {
      this._res.severity = severity;
    }

    code (code) {
      this._res.errorCode = code;
    }
  }

  // -- private

  const dataMethod = (name, options) => {
    return function (data) {
      this._res.severity = this._res.severity || options.severity;
      this._res.status(options.status);
      this._res.json(data);
    };
  };

  const noContentMethod = (name, options) => {
    return function () {
      this._res.severity = this._res.severity || options.severity;
      this._res.status(options.status);
      this._res.json();
    };
  };

  const errorMethod = (name, options) => {
    return function (code, details) {
      const payload = {};
      payload[config.keys.error] = options.text;
      if (code) {
        payload[config.keys.code] = code;
      }
      if (details) {
        payload[config.keys.details] = details;
      }
      this._res.severity = this._res.severity || options.severity;
      this._res.errorCode = this._res.errorCode || code;
      this._res.status(options.status);
      this._res.json(payload);
    };
  };

  for (let name in methods) {
    if (typeof methods[name] === 'function') {
      Response.prototype[name] = methods[name];
    } else {
      switch (methods[name].type) {
        case 'data':
          Response.prototype[name] = dataMethod(name, methods[name]);
          break;
        case 'no-content':
          Response.prototype[name] = noContentMethod(name, methods[name]);
          break;
        case 'client-error':
        case 'server-error':
          Response.prototype[name] = errorMethod(name, methods[name]);
          break;
        default:
          throw new Error(`Invalid method definition for method "${name}".`);
      }
    }
  }

  return Response;
}

module.exports = createResponse;
