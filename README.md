# HTTP Middleware Responses

> Express middleware, exposes configurable response methods in `res`.


## Getting Started

```shell
npm install --save @cork-labs/http-middleware-responses
```

```javascript
// your application setup
const httpResponses = require('@cork-labs/http-middleware-responses');
app.use(httpResponses());

// your route
app.get('/path/:id', (req, res, next) => {
  if ( ... ) {
    return res.notFound(`Thing with ID: ${req.params.id} could not be found.`);
  }
  res.meta('next', '/path/foobar');
  res.ok(data);
});
```




## API

### res.meta(key, value) / res.meta({ key: value, ... })

Sets one ore more headers at once.

The `meta()` method adds metadata to the response. Metadata is sent as custom, namespaced, headers.

```javascript
res.meta('next', '/path/foobar');
```

With the default configuration, the code above will set the header  `x-cork-labs-next: /path/foobar`.

You can customise the custom headers namespace when setting up the middleware.

### res.\<data\>(data)

Invoke a method that sends data.

- `ok(data)`
- `created(data)`
- `accepeted(data)`
- `noAuthoritativeInformation(data)`

These methods simply send the provied data.

```javascript
res.ok({foo: 'bar'});
```

With the default configuration, the above code results in the following response.

```json
// status 200
{
  "foo": "bar"
}
```

The behaviour can be overriden and new methods can be added when setting up the middleware.

### res.\<no-content\>()

Invoke a method that does not send data.

- `noContent()`
- `resetContent()`

These methods send an empty message with the appropriate status code.

```javascript
res.noContent();
```

With the default configuration, the above code results in the following response.

```json
// status 404
{
  "error": "NotFound"
}
```

The behaviour can be overriden and new methods can be added when setting up the middleware.

### res.\<error\>([details])

Invoke a method that sends a `4xx` or `5xx` error, optionally providing error details.

With the default configuration, the code above will result in the following response being sent.

```json
// status 404
{
  "error": "NotFound",
  "details": "Thing with ID: 42 could not be found."
}
```

The list of default methods, their status codes, and error strings is available in [src/methods.js](./src/methods.js).

You can override all error codes and text and extend the error list with your own map when setting up the middleware.


## Configuration

The middleware can be configured via an options object when calling its factory function.

```javascript
const options = { ns: 'x-yourapp' };
app.use(httpResponses(options));
```

### ns (default: 'x-cork-labs')

Changes the custom headers prefix.

```javascript
const options = {
  methods: {
    ns: 'x-your-app'
  }
}
app.use(httpResponses(options));
```

### keys (default: { error: 'error', details: 'details' })

Customises the keys used in error responses.


```javascript
const options = {
  keys: {
    error: 'code',
    details: 'info'
  }
}
app.use(httpResponses(options));
```

### methods (default: null)

The built-in error methods are provided by [src/methods.js](./src/methods.js).

Extend or override the available methods by providing an object under `methods` where:
  - `key` is the name of the method to expose in the `res` object.
  - `value` is either a method definition or a method factory.

```javascript
const options = {
  methods: {
    key: <value>
  }
}
app.use(httpResponses(options));
```

#### Method definitions

Provide an object with:
  - `type` of response, one of `data`, `no-content`, `client-error` and `server-error`
  - `status` code
  - `text` to send (only used in `client-error` and `sever-error` methods)

```javascript
const options = {
  methods: {
    foo: {
      type: 'client-error',
      status: 499,
      text: 'Foo'
    }
  }
}
app.use(httpResponses(options));

// your route
res.fooError('more foo'); // 499 { "error": "Foo", "details": "more foo" }
```

#### Method factories

Provide a function that accepts `(req, res)` and returns the actual function to expose.

```javascript
const options = {
  methods: {
    fooData: (req, res) => (foo, bar) => res.status(999).json({ foo, bar })
  }
};
app.use(httpResponses(options));

// your route
res.fooData('foo', 'bar'); // 999 { "foo": "foo", "bar": "bar" }
```


## Develop

```shell
# lint and fix
npm run lint

# run test suite
npm test

# lint and test
npm run build

# serve test coverage
npm run coverage

# publish a minor version
node_modules/.bin/npm-bump minor
```

### Contributing

We'd love for you to contribute to our source code and to make it even better than it is today!

Check [CONTRIBUTING](https://github.com/cork-labs/contributing/blob/master/CONTRIBUTING.md) before submitting issues and PRs.


## Tools

- [npm-bump](https://www.npmjs.com/package/npm-bump)
- [chai](http://chaijs.com/api/)
- [sinon](http://sinonjs.org/)
- [sinon-chai](https://github.com/domenic/sinon-chai)


## [MIT License](LICENSE)

[Copyright (c) 2018 Cork Labs](http://cork-labs.mit-license.org/2018)
