const { getHandler: finalRoute } = require('./finalRoute');
const { getHandler: loginUser } = require('./loginUser');
const { getHandler: getUsers } = require('./getUsers');
const { getHandler: getTodos } = require('./getTodos');
const { getHandler: getTodoById } = require('./getTodoById');
const { getHandler: createTodo } = require('./createTodo');
const { getHandler: updateTodoById } = require('./updateTodoById');
const { getHandler: deleteTodoById } = require('./deleteTodoById');

const { getMiddleware: getAuthenticationMiddleware } = require('./middleware/authentication');

const getRoutes = storage => ({
  finalRoute: finalRoute(storage),
  loginUser: loginUser(storage),
  getUsers: getUsers(storage),
  getTodos: getTodos(storage),
  getTodosById: getTodoById(storage),
  createTodo: createTodo(storage),
  updateTodoById: updateTodoById(storage),
  deleteTodoById: deleteTodoById(storage),
});

const getMiddleware = storage => ({
  authenticate: getAuthenticationMiddleware(storage),
});

module.exports = {
  getRoutes,
  getMiddleware,
};
