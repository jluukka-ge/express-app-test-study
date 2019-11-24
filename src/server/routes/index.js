const { getHandler: finalRoute } = require('./finalRoute');
const { getHandler: loginUser } = require('./loginUser');
const { getHandler: getUsers } = require('./getUsers');
const { getHandler: getTodos } = require('./getTodos');
const { getHandler: getTodoById } = require('./getTodoById');
const { getHandler: createTodo } = require('./createTodo');
const { getHandler: updateTodoById } = require('./updateTodoById');
const { getHandler: deleteTodoById } = require('./deleteTodoById');

const { getMiddleware: getAuthenticationMiddleware } = require('./middleware/authentication');

// Define routes, parameterized over storage implementation
const getRoutes = getStorage => ({
  finalRoute: finalRoute(getStorage),
  loginUser: loginUser(getStorage),
  getUsers: getUsers(getStorage),
  getTodos: getTodos(getStorage),
  getTodosById: getTodoById(getStorage),
  createTodo: createTodo(getStorage),
  updateTodoById: updateTodoById(getStorage),
  deleteTodoById: deleteTodoById(getStorage),
});

// Define middleware, parameterized over storage implementation
const getMiddleware = getStorage => ({
  authenticate: getAuthenticationMiddleware(getStorage),
});

module.exports = {
  getRoutes,
  getMiddleware,
};
