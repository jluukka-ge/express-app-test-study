const getHandler = getStorage => async (req, res) => {
  const { getTodos } = getStorage(req.__user);
  const todos = await getTodos();
  res.send(todos);
};

module.exports = {
  getHandler,
};
