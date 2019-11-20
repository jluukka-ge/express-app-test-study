const { getHandler: finalRoute } = require('./finalRoute');
const { getHandler: loginUser } = require('./loginUser');
const { getHandler: getUsers } = require('./getUsers');
const { getHandler: getTodos } = require('./getTodos');
const { getHandler: getTodoById } = require('./getTodoById');

const { getMiddleware: getAuthenticationMiddleware } = require('./middleware/authentication');

const getRoutes = models => ({
  finalRoute: finalRoute(models),
  loginUser: loginUser(models),
  getUsers: getUsers(models),
  getTodos: getTodos(models),
  getTodosById: getTodoById(models),
});

const getMiddleware = models => ({
  authenticate: getAuthenticationMiddleware(models),
});

module.exports = {
  getRoutes,
  getMiddleware,
};
