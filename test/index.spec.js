'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;

const httpResponses = require('../src/index');

describe('httpResponses()', function () {
  it('should be a function', function () {
    expect(httpResponses).to.be.a('function');
  });

  describe('when invoked', function () {
    beforeEach(function () {
      this.middleware = httpResponses();
    });

    it('should return a middleware function', function () {
      expect(this.middleware).to.be.a('function');
      expect(this.middleware.length).to.equal(3);
    });
  });

  describe('middleware api', function () {
    beforeEach(function () {
      this.config = {
        ns: 'x-namespace'
      };
      this.middleware = httpResponses(this.config);
    });

    describe('when the middleware function is invoked', function () {
      beforeEach(function () {
        this.req = {};
        this.res = {
          status: sinon.spy(),
          header: sinon.spy(),
          json: sinon.spy()
        };
        this.nextSpy = sinon.spy();
        this.middleware(this.req, this.res, this.nextSpy);
      });

      it('should invoke the next() argument', function () {
        expect(this.nextSpy).to.have.callCount(1);
      });

      it('should expose the "meta" function in res', function () {
        expect(this.res.meta).to.be.a('function');
        expect(this.res.meta.length).to.equal(2);
      });

      it('should expose the "response" object in res', function () {
        expect(this.res.response).to.be.an('object');
        expect(this.res.response.constructor.name).to.equal('Response');
      });

      it('should expose the "ok" function in res.response', function () {
        expect(this.res.response.ok).to.be.a('function');
      });

      it('should expose the "noContent" function in res.response', function () {
        expect(this.res.response.noContent).to.be.a('function');
      });

      it('should expose the "badRequest" function in res.response', function () {
        expect(this.res.response.badRequest).to.be.a('function');
      });

      describe('when meta() is invoked with two strings', function () {
        beforeEach(function () {
          this.res.meta('foo', 'bar');
        });

        it('should set the header in the response', function () {
          expect(this.res.header).to.have.been.calledWithExactly('x-namespace-foo', 'bar');
        });
      });

      describe('when meta() is invoked with an object', function () {
        beforeEach(function () {
          this.res.meta({foo: 'bar'});
        });

        it('should set the header in the response', function () {
          expect(this.res.header).to.have.been.calledWithExactly('x-namespace-foo', 'bar');
        });
      });

      describe('when ok() is invoked', function () {
        beforeEach(function () {
          this.data = {};
          this.res.response.ok(this.data);
        });

        it('should invoke "res.status()"', function () {
          expect(this.res.status).to.have.been.calledWithExactly(200);
        });

        it('should invoke "res.json()"', function () {
          expect(this.res.json).to.have.been.calledWithExactly(this.data);
        });
      });

      describe('when noContent() is invoked', function () {
        beforeEach(function () {
          this.res.response.noContent();
        });

        it('should invoke "res.status()"', function () {
          expect(this.res.status).to.have.been.calledWithExactly(204);
        });

        it('should invoke "res.json()"', function () {
          expect(this.res.json).to.have.been.calledWithExactly();
        });
      });

      describe('when internalServerError() is invoked', function () {
        beforeEach(function () {
          this.details = { foo: 'bar' };
          this.res.response.internalServerError(this.details);
        });

        it('should invoke "res.status()"', function () {
          expect(this.res.status).to.have.been.calledWithExactly(500);
        });

        it('should invoke "res.json()"', function () {
          const expectedPayload = {
            error: 'InternalServerError',
            details: {
              foo: 'bar'
            }
          };
          expect(this.res.json).to.have.been.calledWithExactly(expectedPayload);
        });
      });
    });
  });

  describe('middleware configuration', function () {
    beforeEach(function () {
      this.req = {};
      this.res = {
        status: sinon.spy(),
        header: sinon.spy(),
        json: sinon.spy()
      };
      this.nextSpy = sinon.spy();
    });

    describe('when "config.keys" is set', function () {
      beforeEach(function () {
        this.config = {
          keys: {
            error: 'e',
            details: 'd'
          }
        };
        this.middleware = httpResponses(this.config);
        this.middleware(this.req, this.res, this.nextSpy);
      });

      describe('and internalServerError() is invoked', function () {
        beforeEach(function () {
          this.details = { foo: 'bar' };
          this.res.response.internalServerError(this.details);
        });

        it('should invoke "res.json()" with the modified key', function () {
          const expectedPayload = {
            e: 'InternalServerError',
            d: {
              foo: 'bar'
            }
          };
          expect(this.res.json).to.have.been.calledWithExactly(expectedPayload);
        });
      });
    });

    describe('when "config.methods" overrides an existing data method', function () {
      beforeEach(function () {
        this.config = {
          methods: {
            ok: {
              type: 'data',
              status: 299
            }
          }
        };
        this.middleware = httpResponses(this.config);
        this.middleware(this.req, this.res, this.nextSpy);
      });

      describe('and that error method is invoked', function () {
        beforeEach(function () {
          this.data = { foo: 'bar' };
          this.res.response.ok(this.data);
        });

        it('should invoke "res.status()"', function () {
          expect(this.res.status).to.have.been.calledWithExactly(299);
        });

        it('should invoke "res.json()" with the modified key', function () {
          expect(this.res.json).to.have.been.calledWithExactly(this.data);
        });
      });
    });

    describe('when "config.methods" overrides an existing noContent method', function () {
      beforeEach(function () {
        this.config = {
          methods: {
            noContent: {
              type: 'no-content',
              status: 299
            }
          }
        };
        this.middleware = httpResponses(this.config);
        this.middleware(this.req, this.res, this.nextSpy);
      });

      describe('and that error method is invoked', function () {
        beforeEach(function () {
          this.data = { foo: 'bar' };
          this.res.response.noContent(this.data);
        });

        it('should invoke "res.status()"', function () {
          expect(this.res.status).to.have.been.calledWithExactly(299);
        });

        it('should invoke "res.json()" with the modified key', function () {
          expect(this.res.json).to.have.been.calledWithExactly();
        });
      });
    });

    describe('when "config.methods" overrides an existing error method', function () {
      beforeEach(function () {
        this.config = {
          methods: {
            internalServerError: {
              type: 'server-error',
              status: 599,
              text: 'foobar'
            }
          }
        };
        this.middleware = httpResponses(this.config);
        this.middleware(this.req, this.res, this.nextSpy);
      });

      describe('and that error method is invoked', function () {
        beforeEach(function () {
          this.res.response.internalServerError();
        });

        it('should invoke "res.status()"', function () {
          expect(this.res.status).to.have.been.calledWithExactly(599);
        });

        it('should invoke "res.json()" with the modified key', function () {
          const expectedPayload = {
            error: 'foobar'
          };
          expect(this.res.json).to.have.been.calledWithExactly(expectedPayload);
        });
      });
    });

    describe('when "config.methods" supplies a method factory', function () {
      beforeEach(function () {
        this.method = sinon.spy();
        this.config = {
          methods: {
            internalServerError: this.method
          }
        };
        this.middleware = httpResponses(this.config);
        this.middleware(this.req, this.res, this.nextSpy);
      });

      describe('and the exposed method is invoked', function () {
        beforeEach(function () {
          this.res.response.internalServerError('foo', 'bar');
        });

        it('should invoke the method returned by the factory', function () {
          expect(this.method).to.have.been.calledWithExactly('foo', 'bar');
        });
      });
    });

    describe('when "config.methods" supplies an invalid method definition', function () {
      beforeEach(function () {
        this.config = {
          methods: {
            internalServerError: {}
          }
        };
      });

      it('should throw an error', function () {
        var fn = () => {
          this.middleware = httpResponses(this.config);
        };
        expect(fn).to.throw('Invalid method definition');
      });
    });
  });
});
