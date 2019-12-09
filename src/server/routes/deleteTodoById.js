const { BadRequestError, NotFoundError } = require('./utils/Errors');

/*******/

/*
 * A concrete implementation for validating data extracted from the request.
 * Used in the route handler composed for the deployed app.
 *
 * Defining this function separately enables testing the concrete implementation in isolation.
 */
const requestIsValid = id => !!id && +id > 0;

/*
 * A concrete implementation for testing that the todo exists.
 * Used in the route handler composed for the deployed app.
 *
 * Defining this function separately enables testing the concrete implementation in isolation.
 */
const todoWithIdExists = getTodoById => async (id) => {
  const todo = await getTodoById(id);
  return !!todo;
};

/*******/

/*
 * A more pure implementation for defining the route handler.
 * Allows overriding certain parts of the handler, making testing easier.
 */
const defineHandler = getOps => async (req, res) => {
  const {
    requestIsValid,
    todoWithIdExists,
    deleteTodoById,
  } = getOps(req.__user);

  const { id } = req.params;

  if (!requestIsValid(id)) throw new BadRequestError('Invalid todoID!');

  const todoExists = await todoWithIdExists(id);
  if (!todoExists) throw new NotFoundError('No such Todo');

  const removedCount = await deleteTodoById(id);

  return res.send({ removedCount });
};

/*
 * The main export of this file.
 * Returns a route handler function given an implementation of storage factory.
 */
const getHandler = getStorage => {
  const getOps = user => {
    const {
      getTodoById,
      deleteTodoById,
    } = getStorage(user);

    return {
      requestIsValid,
      todoWithIdExists: todoWithIdExists(getTodoById),
      deleteTodoById,
    };
  };

  return defineHandler(getOps);
};

/*******/

/*
 * Export all functions defined in this file.
 * This enables unit tests to exercise parts of the handler in isolation.
 */
module.exports = {
  requestIsValid,
  todoWithIdExists,
  defineHandler,

  getHandler,
};
