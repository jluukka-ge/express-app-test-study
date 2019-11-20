const { authenticate } = require('./middleware');

const registerApi = ({ router, routes }) => {
  const {
    loginUser,
    getUsers,
    getTodos,
    getTodosById,
  } = routes;

  router.get('/login', loginUser);
  router.get('/users', authenticate, getUsers);
  router.get('/todos', authenticate, getTodos);
  router.get('/todos/:id', authenticate, getTodosById);

  return router;
};

module.exports = {
  registerApi,
};
