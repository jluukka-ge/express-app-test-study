const {
  getAllWithProjection,
} = require('./utils/modelQueries');
const { publicLenses } = require('../models/User');

const publicLenseSet = Object.values(publicLenses);

const getHandler = ({ User }) => async (req, res) => {
  const users = await getAllWithProjection(User, publicLenseSet);
  res.send(users);
};

module.exports = {
  getHandler,
};
