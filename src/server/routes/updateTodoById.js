const { set } = require('../utils/lenses');
const { pipe } = require('../utils/functions');
const { BadRequestError } = require('./utils/Errors');

const requestedIdIsValid = id => !!id;
const todoDataIsValid = title => !!title;

const getHandler = storage => async (req, res) => {
  const { updateTodoById, models: { Todo } } = storage(req.__user);
  const {
    title: titleLens,
    description: descriptionLens
  } = Todo.lenses;

  const { id } = req.params;

  const title = titleLens.get(req.body);
  const description = descriptionLens.get(req.body);

  if (!todoDataIsValid(title) || !requestedIdIsValid(id)){
    throw new BadRequestError('Invalid todo data!');
  }

  const data = pipe(
    set(titleLens, title),
    set(descriptionLens, description)
  )({});

  const updatedTodo = await updateTodoById(id, data);

  res.send({ data: updatedTodo });
};

module.exports = {
  requestedIdIsValid,
  todoDataIsValid,
  getHandler,
};
