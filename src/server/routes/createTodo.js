const { set } = require('../utils/lenses');
const { pipe } = require('../utils/functions');
const { BadRequestError } = require('./utils/Errors');
const { Todo } = require('../models');

// Get model utilities from the Todo model
const {
  titleLens,
  descriptionLens,
  getEmptyTodo,
} = Todo;

const requestIsValid = title => !!title;

const createTodoFromFields = createTodo => (title, description) => {
  const data = pipe(
    set(titleLens, title),
    set(descriptionLens, description)
  )(getEmptyTodo());

  const createTodoEntry = createTodo(data);
  return createTodoEntry;
};

const getHandler = getStorage => async (req, res) => {
  const { createTodo } = getStorage(req.__user);

  // Assume Todo data to have the same shape over the network as it is in the data model
  const title = titleLens.get(req.body);
  const description = descriptionLens.get(req.body);

  if (!requestIsValid(title)) throw new BadRequestError('Invalid todo data!');

  const newTodo = await createTodoFromFields(createTodo)(title, description);

  res.send({ data: newTodo });
};

module.exports = {
  requestIsValid,
  createTodoFromFields,

  getHandler,
};
