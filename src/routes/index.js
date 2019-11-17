const { getHandler: finalRoute } = require('./finalRoute');
const { getHandler: getUsers } = require('./getUsers');
const { getHandler: getTodos } = require('./getTodos');
const { getHandler: getTodoById } = require('./getTodoById');

const getRoutes = models => ({
  finalRoute: finalRoute(models),
  getUsers: getUsers(models),
  getTodos: getTodos(models),
  getTodosById: getTodoById(models),
});


module.exports = {
  getRoutes,
};
