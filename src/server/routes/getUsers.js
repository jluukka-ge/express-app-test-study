const {
  getAllItems,
  projectByLenses,
} = require('./utils/modelQueries');
const { publicLenses } = require('../models/User');

const publicLenseSet = Object.values(publicLenses);

const getHandler = ({ User }) => async (req, res) => {
  const users = await getAllItems(User);
  const publicData = projectByLenses(publicLenseSet)(users);
  res.send(publicData);
};

module.exports = {
  getHandler,
};
