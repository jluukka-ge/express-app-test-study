const { set } = require('../utils/lenses');
const { pipe } = require('../utils/functions');
const { BadRequestError } = require('./utils/Errors');

const requestIsValid = title => !!title;

const getHandler = storage => async (req, res) => {
  const { createTodo, models: { Todo } } = storage(req.__user);
  const {
    title: titleLens,
    description: descriptionLens
  } = Todo.lenses;

  const title = titleLens.get(req.body);
  const description = descriptionLens.get(req.body);

  if (!requestIsValid(title)) throw new BadRequestError('Invalid todo data!');

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
