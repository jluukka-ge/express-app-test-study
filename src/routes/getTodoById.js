const {
  BadRequestError,
  NotFoundError,
} = require('../utils/Errors');

const getHandler = ({ Todo }) => async (req, res) => {
  const id = req.params.id;
  if (!id || Number.isInteger(id)) throw new BadRequestError('Invalid TodoID!');
  const todo = await Todo.query().where({ id }).first();
  if (!todo) throw new NotFoundError('No such Todo!');
  res.send(todo);
};

module.exports = {
  getHandler,
};
