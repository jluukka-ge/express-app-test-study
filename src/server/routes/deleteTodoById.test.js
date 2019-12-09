/*
* The `deleteTodoById` route handler definition is broken down into several functions from which
* the final handler function is composed. This approach allows unit tests to target specific
* parts of the function with ease.
*
* In this test file, the route handler will be tested from bottom up – testing specific parts of
* the handler thoroughly and moving up to larger and more complex functions. Testing the more
* complex parts becomes easier when we can assume the more specific parts to work as expected.
* Also, because we have the ability to override certain operations used by the handler function,
* we can cut corners where we already have a high degree of confidence in the handler function,
* focusing each test on the exact part of the handler which we want to exercise.
*/

const { expect } = require('chai');
const sinon = require('sinon');
const { BadRequestError, NotFoundError } = require('./utils/Errors');
const {
  requestIsValid,
  todoWithIdExists,
  defineHandler,

  getHandler,
} = require('./deleteTodoById');

describe('Route: deleteTodoById', () => {
  /*
   * The first tests will focus on the smallest operations used by the handler function. Once we
   * have a high degree of confidence in these functions, we can assume them to work properly and
   * replace them with something simpler in the tests that follow.
   */
  describe('Operation: requestIsValid', () => {
    it('returns `true` for truthy values', () => {
      [
        1,
        '1',
        true,
      ].forEach(value => {
        expect(
          requestIsValid(value)
        ).to.equal(true);
      });
    });

    it('returns `false` for falsy values', () => {
      [
        0,
        '',
        false,
      ].forEach(value => {
        expect(
          requestIsValid(value)
        ).to.equal(false);
      });
    });

    it('returns `false` for numeric values less than or equal to zero', () => {
      [
        0,
        -1,
        '-2',
        '0',
      ].forEach(value => {
        expect(
          requestIsValid(value)
        ).to.equal(false);
      });
    });
  });

  describe('Operation: todoWithIdExists', () => {
    it('calls the given fetcher function with the provided id', async () => {
      const fetcher = sinon.spy();
      const _todoWithIdExists = todoWithIdExists(fetcher);
      const arg = Math.random();
      await _todoWithIdExists(arg);
      expect(fetcher.calledWith(arg));
    });

    it('returns `true` when the fetcher function returns truthy values', () => {
      const results = [
        1,
        '-1',
        true,
      ].map(async (value) => {
        const getValue = () => value;
        const _todoWithIdExists = todoWithIdExists(getValue);
        expect(
          await _todoWithIdExists()
        ).to.equal(true);
      });
      return Promise.all(results);
    });

    it('returns `false` when the fetcher function retuns falsy values', () => {
      const results = [
        0,
        '',
        false,
      ].map(async (value) => {
        const getValue = () => value;
        const _todoWithIdExists = todoWithIdExists(getValue);
        expect(
          await _todoWithIdExists()
        ).to.equal(false);
      });
      return Promise.all(results);
    });
  });

  /*
   * Now that the concrete operations have been tested, we can test that validations are done
   * as expected, appropriate exceptions are thrown and that the operation that would perform
   * a DB call is executed only if the the validations allow it. We can also test that the
   * all necessary data is provided when producing the response.
   */
  describe('defineHandler', () => {
    it('throws a Bad Request error for an invalid todo id', done => {
      const getOps = () => ({ requestIsValid: () => false });
      const handler = defineHandler(getOps);
      handler({ params: {} })
        .then(() => done(new Error('Expected handler call to fail')))
        .catch(e => {
          expect(e).to.be.instanceof(BadRequestError);
          done();
        });
    });

    it('throws a Not Found error for a missing todo', done => {
      const getOps = () => ({
        requestIsValid: () => true,
        todoWithIdExists: () => false,
      });
      const handler = defineHandler(getOps);
      handler({ params: {} })
        .then(() => done(new Error('Expected handler call to fail')))
        .catch(e => {
          expect(e).to.be.instanceof(NotFoundError)
          done();
        });
    });

    it('should not call `deleteTodoById` with invalid id', done => {
      const deleteTodoById = sinon.spy();
      const getOps = () => ({
        requestIsValid: () => false,
        todoWithIdExists: () => true,
        deleteTodoById,
      });
      const handler = defineHandler(getOps);
      handler({ params: {} })
        .then(() => done(new Error('Expected handler call to fail')))
        .catch(() => {
          expect(deleteTodoById.notCalled).to.equal(true);
          done();
        });
    });

    it('should not call `deleteTodoById` with missing todo', done => {
      const deleteTodoById = sinon.spy();
      const getOps = () => ({
        requestIsValid: () => true,
        todoWithIdExists: () => false,
        deleteTodoById,
      });
      const handler = defineHandler(getOps);
      handler({ params: {} })
        .then(() => done(new Error('Expected handler call to fail')))
        .catch(() => {
          expect(deleteTodoById.notCalled).to.equal(true);
          done()
        });
    });

    it('should call `deleteTodoById` with id from request with passing validations', done => {
      const deleteTodoById = sinon.spy();
      const getOps = () => ({
        requestIsValid: () => true,
        todoWithIdExists: () => true,
        deleteTodoById,
      });
      const id = 'xyz';
      const handler = defineHandler(getOps);
      handler({ params: { id } }, { send: () => {} })
        .then(() => {
          expect(deleteTodoById.calledWith(id)).to.equal(true);
          done();
        })
        .catch(done);
    });

    it('should provide an object with `removedCount` property for `res.send`',done => {
      const removedCount = 1;
      const deleteTodoById = () => removedCount;
      const send = sinon.spy();
      const getOps = () => ({
        requestIsValid: () => true,
        todoWithIdExists: () => true,
        deleteTodoById,
      });
      const id = 'xyz';
      const handler = defineHandler(getOps);
      handler({ params: { id } }, { send })
        .then(() => {
          expect(send.calledWith({ removedCount })).to.equal(true);
          done();
        })
        .catch(done);
    });
  });

  /*
   * At this point, we should be quite confident about the functionality of the handler defined
   * here. The `getHandler` function should be tested at least by testing that it returns the
   * kind of a function we expect – the kind which takes `req` and `res` objects as arguments
   * and forms a response by calling operations in the `res` object. We don't need to be very
   * specific about what the route handler has achieved. We just need to make sure a route
   * handler hsa been returned.
   */
  describe('getHandler', () => {
    it('produces a function, which can be used as a route handler', done => {
      const getStorage = () => ({
        getTodoById: () => ({}),
        deleteTodoById: () => 1,
      });
      const req = { params: { id: 1 } };
      const res = { send: () => done() };

      const handler = getHandler(getStorage);
      handler(req, res);
    });
  });
});
