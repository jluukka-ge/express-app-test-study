const { BadRequestError, NotFoundError } = require('./utils/Errors');

const requestIsValid = id => !!id && !Number.isInteger(id);
const resultIsValid = todo => !!todo;

const getHandler = getStorage => async (req, res) => {
  const { getTodoById } = getStorage(req.__user);
  const { id } = req.params;

  if (!requestIsValid(id)) throw new BadRequestError('Invalid TodoID!');

  const todo = await getTodoById(id);
  if (!resultIsValid(todo)) throw new NotFoundError('No such Todo');

  res.send(todo);
};

module.exports = {
  requestIsValid,
  resultIsValid,
  
  getHandler,
};
