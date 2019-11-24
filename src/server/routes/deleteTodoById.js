const { BadRequestError, NotFoundError } = require('./utils/Errors');

const requestIsValid = id => !!id;

const getHandler = getStorage => async (req, res) => {
  const { deleteTodoById } = getStorage(req.__user);
  const { id } = req.params;

  if (!requestIsValid(id)) throw new BadRequestError('Invalid todoID!');

  const removedCount = await deleteTodoById(id);

  if (removedCount === 0) throw new NotFoundError('No such Todo');

  res.send({ removedCount });
};

module.exports = {
  requestIsValid,
  getHandler,
};
