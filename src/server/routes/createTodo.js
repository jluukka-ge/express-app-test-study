const { set } = require('../utils/lenses');
const { pipe } = require('../utils/functions');
const { BadRequestError } = require('./utils/Errors');

const requestIsValid = title => !!title;

const getHandler = getStorage => async (req, res) => {
  const { createTodo, models: { Todo } } = getStorage(req.__user);

  // Get lenses from the Todo model
  const {
    title: titleLens,
    description: descriptionLens
  } = Todo.lenses;

  // Assume Todo data to have the same shape over the network as it is in the data model
  const title = titleLens.get(req.body);
  const description = descriptionLens.get(req.body);

  if (!requestIsValid(title)) throw new BadRequestError('Invalid todo data!');

  // Create a new Todo object
  const data = pipe(
    set(titleLens, title),
    set(descriptionLens, description)
  )({});

  const newTodo = await createTodo(data);

  res.send({ data: newTodo });
};

module.exports = {
  requestIsValid,
  getHandler,
};
