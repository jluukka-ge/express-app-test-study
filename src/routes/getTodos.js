const getHandler = ({ Todo }) => async (req, res) => {
  const todos = await Todo.query();
  res.send(todos);
};

module.exports = {
  getHandler,
};
