const registerApi = ({ router, routes, middleware }) => {
  const {
    loginUser,
    getUsers,
    getTodos,
    getTodosById,
  } = routes;

  const {
    authenticate,
  } = middleware;

  router.post('/login', loginUser);
  router.get('/users', authenticate, getUsers);
  router.get('/todos', authenticate, getTodos);
  router.get('/todos/:id', authenticate, getTodosById);

  return router;
};

module.exports = {
  registerApi,
};
