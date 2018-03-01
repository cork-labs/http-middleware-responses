# HTTP Middleware Cookies

> Express middleware, exposes configurable response methods in `res`.


## Getting Started

```shell
npm install --save @cork-labs/http-middleware-responses
```

```javascript
// your application setup
const httpResponses = require('@cork-labs/http-middleware-cookies');
app.use(httpResponses());

// your route
app.get('/path/:id', (req, res, next) => {
  if ( ... ) {
    return res.notFound(`Thing with ID: ${req.params.id} could not be found.`);
  }
  res.meta('next', '/path/foobar');
  res.data(data);
});
```

### Response Data

The default behaviour of `data()` is to send json data in a RESTful way.

The extra `noContent()` and `created()` methods are also available.

### Response Meta

The `meta()` method adds metadata to the request. This will be sent in the form of custom, namespaced, headers.
With the default configuration, the above code would set the header  `x-cork-labs-next: /path/foobar`.

### Response Errors

The default error methods are configured in [errorMap](./src/errorMap.js).

All error methods, such as `notFound()`, take an optional details argument. With the default configuration,
this would produce something like:

```json
// status 404
{
  "error": "NotFound",
  "details": "Thing with ID: 42 could not be found."
}
```


## Config

The middleware can be configured via an options object when calling its factory function.

```javascript
const options = { ns: 'x-yourapp' };
httpResponses(options);
```

### ns (default: 'x-cork-labs')

Changes the custom headers prefix.

### keys (default: { error: 'error', details: 'details' })

Customises the keys used in error responses.

### errors (default: null)

Extend or override the available error methods by providing an object where:
- the key is the name of the method to expose in the `res` object.
- the value is an object with the status code and the error text to

```javascript
const config = {
  errors: {
    fooError: {
      status: 499,
      text: 'Foo'
    }
  }
}
httpResponses(config);

// your route
res.fooError('more foo'); // { "error": "Foo", "details": "more foo" }
```
### methods (default: null)

Extend or override the response methods by providing an object where:
- the key is the name of the method to expose in the `res` object.
- the value is a function that accepts `req, res` and must return the actual function to expose.

```javascript
const config = {
  methods: {
    fooData: (req, res) => (foo, bar) => res.status(299).data({ foo, bar })
  }
};
httpResponses(config);

// your route
res.fooData('foo', 'bar');
```


## API

### res.meta(key, value)

### res.meta(object)

### res.data(data)

### res.noContent()

### res.<error>([details])

The list of default error methods, their status codes, and error strings is available in [errorMap](./src/errorMap.js).


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
