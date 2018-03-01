'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;

const httpResponses = require('../src/index');

describe('httpResponses ()', function () {
  it('should be a function', function () {
    expect(httpResponses).to.be.a('function');
  });

  describe('when invoked', function () {
    beforeEach(function () {
      this.config = {
        ns: 'x-namespace'
      };
      this.middleware = httpResponses(this.config);
    });

    it('should return a middleware function', function () {
      expect(this.middleware).to.be.a('function');
      expect(this.middleware.length).to.equal(3);
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

      it('should expose the "data" function in res', function () {
        expect(this.res.data).to.be.a('function');
      });

      it('should expose the "noContent" function in res', function () {
        expect(this.res.noContent).to.be.a('function');
      });

      it('should expose the "badRequest" function in res', function () {
        expect(this.res.badRequest).to.be.a('function');
      });

      describe('when meta() is invoked with two strings', function () {
        beforeEach(function () {
          this.res.meta('foo', 'bar');
        });

        it('should store the pair in "_meta"', function () {
          expect(this.res._meta).to.be.an('object');
          expect(this.res._meta.foo).to.equal('bar');
        });

        describe('and data() is invoked', function () {
          beforeEach(function () {
            this.res.data();
          });

          it('should set the header in the response', function () {
            expect(this.res.header).to.have.been.calledWithExactly('x-namespace-foo', 'bar');
          });
        });
      });

      describe('when meta() is invoked with an object', function () {
        beforeEach(function () {
          this.res.meta({foo: 'bar'});
        });

        it('should store the pair in "_meta"', function () {
          expect(this.res._meta).to.be.an('object');
          expect(this.res._meta.foo).to.equal('bar');
        });

        describe('and data() is invoked', function () {
          beforeEach(function () {
            this.res.data();
          });

          it('should set the header in the response', function () {
            expect(this.res.header).to.have.been.calledWithExactly('x-namespace-foo', 'bar');
          });
        });
      });

      describe('when data() is invoked', function () {
        beforeEach(function () {
          this.data = {};
          this.res.data(this.data);
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
          this.res.noContent();
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
          this.res.internalServerError(this.details);
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
            this.res.internalServerError(this.details);
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

      describe('when "config.errors" overrides an existing error', function () {
        beforeEach(function () {
          this.config = {
            errors: {
              internalServerError: {
                status: 599,
                text: 'foobar'
              }
            }
          };
          this.middleware = httpResponses(this.config);
          this.middleware(this.req, this.res, this.nextSpy);
        });

        describe('and an error method is invoked', function () {
          beforeEach(function () {
            this.res.internalServerError();
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

      describe('when "config.methods" overrides an existing method', function () {
        beforeEach(function () {
          this.methodFactory = sinon.stub();
          this.method = sinon.spy();
          this.methodFactory.returns(this.method);
          this.config = {
            methods: {
              internalServerError: this.methodFactory
            }
          };
          this.middleware = httpResponses(this.config);
          this.middleware(this.req, this.res, this.nextSpy);
        });

        it('should invoke the custom method factory', function () {
          expect(this.methodFactory).to.have.been.calledWithExactly(this.req, this.res);
        });

        describe('and the exposed method is invoked', function () {
          beforeEach(function () {
            this.res.internalServerError('foo', 'bar');
          });

          it('should invoke the method returned by thg factory', function () {
            expect(this.method).to.have.been.calledWithExactly('foo', 'bar');
          });
        });
      });
    });
  });
});
