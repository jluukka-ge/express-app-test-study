const getHandler = storage => async (req, res) => {
  const { getTodos } = storage(req.__user);
  const todos = await getTodos();
  res.send(todos);
};

module.exports = {
  getHandler,
};
