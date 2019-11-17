const registerApi = ({ router, routes }) => {
  const {
    getUsers,
    getTodos,
    getTodosById,
  } = routes;

  router.get('/users', getUsers);
  router.get('/todos', getTodos);
  router.get('/todos/:id', getTodosById);

  return router;
};

module.exports = {
  registerApi,
};
