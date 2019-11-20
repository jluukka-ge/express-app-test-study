const { getAllItems } = require('./utils/modelQueries');

const getHandler = ({ Todo }) => async (req, res) => {
  const todos = await getAllItems(Todo).where({ userId: req.__user.id });
  res.send(todos);
};

module.exports = {
  getHandler,
};
