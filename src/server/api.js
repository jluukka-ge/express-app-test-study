const registerApi = ({ router, routes, middleware }) => {
  const {
    loginUser,
    getUsers,
    getTodos,
    getTodosById,
    createTodo,
    updateTodoById,
    deleteTodoById,
  } = routes;

  const {
    authenticate,
  } = middleware;

  router.post('/login', loginUser);
  router.get('/users', authenticate, getUsers);
  router.get('/todos', authenticate, getTodos);
  router.get('/todos/:id', authenticate, getTodosById);
  router.post('/todos', authenticate, createTodo);
  router.put('/todos/:id', authenticate, updateTodoById);
  router.delete('/todos/:id', authenticate, deleteTodoById);

  return router;
};

module.exports = {
  registerApi,
};
