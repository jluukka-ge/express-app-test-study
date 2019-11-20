const {
  BadRequestError,
  NotFoundError,
} = require('../utils/Errors');

const { getItemById } = require('./utils/modelQueries');

const queryIsValid = id => id && !Number.isInteger(id);
const resultIsValid = todo => !todo;

const getHandler = ({ Todo }) => async (req, res) => {
  const { id } = req.params;
  if (!queryIsValid(id)) throw new BadRequestError('Invalid TodoID!');
  const todo = await getItemById(Todo, id).where({ userId: req.__user.id });
  if (resultIsValid(todo)) throw new NotFoundError('No such Todo');
  res.send(todo);
};

module.exports = {
  queryIsValid,
  resultIsValid,
  getHandler,
};
