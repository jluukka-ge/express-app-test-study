/*
 * A concrete implementation of persistent storage for the Todo app using Knex.
 */

const Knex = require('knex');
const { Model } = require('objection');
const { User, Todo } = require('../../models');
const { getModels } = require('./models');
const knexConfig = require('../../../../knexfile');
const { projectByLenses } = require('../../utils/lenses');
const {
  createItem,
  getItemById,
  getItemByProps,
  getAllItems,
  deleteItemById,
  currentTimestamp,
  restrictAccessByUser,
} = require('./utils/modelQueries');

// Initialize knex the SQL query builder.
const knex = Knex(knexConfig.development);

// Create or migrate the database:
knex.migrate.latest();

// Bind the knex instance to the base Model class
Model.knex(knex);

// Get data models subclassed from this objection Model
const models = getModels(Model);

const {
  userId: userIdLens,
  updatedAt: updatedAtLens,
} = Todo.lenses;

const { publicLenses } = User;
const publicUserLenseSet = Object.values(publicLenses);

/*
 * Define each persistent storage action separately to enable unit testing each
 * function in isolation.
 */

const createTodo = (dbModels, user) => data => {
  const newData = userIdLens.set(data, user.id);
  return createItem(dbModels.Todo, newData);
};

const getTodos = (dbModels, user) => () => restrictAccessByUser(user)(
  getAllItems(dbModels.Todo)
);

const getTodoById = (dbModels, user) => id => restrictAccessByUser(user)(
  getItemById(dbModels.Todo, id)
);

const updateTodoById = (dbModels, user) => async (id, data) => {
  const instance = await restrictAccessByUser(user)(
    getItemById(dbModels.Todo, id)
  );
  return instance.$query().updateAndFetch(
    updatedAtLens.set(data, currentTimestamp(dbModels.Todo))
  );
};

const deleteTodoById = (dbModels, user) => id => restrictAccessByUser(user)(
  deleteItemById(dbModels.Todo, id)
);

const getUsers = (dbModels) => async () => {
  const users = await getAllItems(dbModels.User);
  return projectByLenses(publicUserLenseSet)(users);
};

const getPasswordByUsername = (dbModels) => async username => {
  const user = await getItemByProps(dbModels.User, { username });
  return user.password;
};

const getUserByUsername = (dbModels) => async username => {
  const user = await getItemByProps(dbModels.User, { username });
  return projectByLenses(publicUserLenseSet)(user);
};

/*
 * Produce methods for interacting with persistent storage. Parameterizing over
 * user enables this storage implementation to handle data access restrictions
 * and automatically supplementing userId value to input data
 */
const getStorageFactory = () => user => ({
  createTodo: createTodo(models, user),
  getTodos: getTodos(models, user),
  getTodoById: getTodoById(models, user),
  updateTodoById: updateTodoById(models, user),
  deleteTodoById: deleteTodoById(models, user),
  getUsers: getUsers(models),
  getPasswordByUsername: getPasswordByUsername(models),
  getUserByUsername: getUserByUsername(models),
});

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
  getUsers,
  getPasswordByUsername,
  getUserByUsername,

  getStorageFactory,
};
