const { getAllItems } = require('./utils/modelQueries');

const getHandler = ({ User }) => async (req, res) => {
  const users = await getAllItems(User);
  res.send(users);
};

module.exports = {
  getHandler,
};
