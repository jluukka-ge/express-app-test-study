const { set } = require('../utils/lenses');
const { pipe } = require('../utils/functions');
const { BadRequestError } = require('./utils/Errors');
const { Todo } = require('../models');

// Get utilities from the Todo model
const {
  titleLens,
  descriptionLens,
  getEmptyTodo,
} = Todo;

const requestedIdIsValid = id => !!id;
const todoDataIsValid = title => !!title;

const updateTodoWithFields = updateTodoById => (id, title, description) => {
  const data = pipe(
    set(titleLens, title),
    set(descriptionLens, description)
  )(getEmptyTodo());

  const updateTodoEntry = updateTodoById(id, data);
  return updateTodoEntry;
};

const getHandler = getStorage => async (req, res) => {
  const { updateTodoById } = getStorage(req.__user);
  const { id } = req.params;

  // Assume Todo data to have the same shape over the network as it is in the data model
  const title = titleLens.get(req.body);
  const description = descriptionLens.get(req.body);

  if (!todoDataIsValid(title) || !requestedIdIsValid(id)){
    throw new BadRequestError('Invalid todo data!');
  }

  const updatedTodo = await updateTodoWithFields(updateTodoById)(id, title, description);

  res.send({ data: updatedTodo });
};

module.exports = {
  requestedIdIsValid,
  todoDataIsValid,

  getHandler,
};
