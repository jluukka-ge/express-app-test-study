const { getAllItems } = require('./utils/modelQueries');

const getHandler = ({ Todo }) => async (req, res) => {
  const todos = await getAllItems(Todo);
  res.send(todos);
};

module.exports = {
  getHandler,
};
