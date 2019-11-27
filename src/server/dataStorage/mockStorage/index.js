/*
 * A concrete implementation of persistent storage for the Todo app using in-memory storage.
 */

const { propLens, set, projectByLenses } = require('../../utils/lenses');
const { pipe } = require('../../utils/functions');
const { User, Todo } = require('../../models');
const { data } = require('./data');

const TODO = 'TODO';
const USER = 'USER';

const typeLens = propLens('__type');
const {
  userIdLens,
} = Todo;
const {
  usernameLens,
  passwordLens,
} = User;

const findByLens = lens => value => item => lens.get(item) === value;

const byType = findByLens(typeLens);
const byUserId = findByLens(Todo.userIdLens);
const byUsername = findByLens(usernameLens);
const byId = id => item => typeLens.get(item) === TODO ?
  Todo.idLens.get(item) === +id :
  User.idLens.get(item) === +id;

const newId = (() => {
  let nextId = 10;
  return () => nextId++;
})();

/*
 * Define each persistent storage action separately to enable unit testing each
 * function in isolation.
 */

const createTodo = (storage, user) => data => {
  const newData = pipe(
    set(userIdLens, user.id),
    set(Todo.idLens, newId()),
    set(typeLens, TODO),
  )(data);
  storage.push(newData);
  return newData;
};

const getTodos = (storage, user) => () => {
  const todos = storage.filter(
    byType(TODO)
  ).filter(
    byUserId(user.id)
  );
  return todos;
};

const getTodoById = (storage, user) => id => {
  const todo = storage.filter(
    byType(TODO)
  ).filter(
    byUserId(user.id)
  ).find(
    byId(id)
  );
  return todo;
};

const updateTodoById = (storage, user) => async (id, data) => {
  const index = storage.findIndex(item =>
    byType(TODO)(item) && byUserId(user.id)(item) && byId(id)(item)
  );

  const newData = pipe(
    set(Todo.idLens, Todo.idLens.get(storage[index])),
    set(userIdLens, user.id),
    set(typeLens, TODO),
  )(data);

  if (index >= 0) {
    storage.splice(index, 1, newData);
    return newData;
  }
  throw new Error('Todo not found!');
};

const deleteTodoById = (storage, user) => id => {
  const index = storage.findIndex(item =>
    byType(TODO)(item) && byUserId(user.id)(item) && byId(id)(item)
  );

  if (index >= 0) {
    storage.splice(index, 1);
    return 1;
  }
  return 0;
};

const getUsers = storage => async () => {
  const { publicLenses } = User;
  const publicLenseSet = Object.values(publicLenses);
  const users = storage.filter(byType(USER));
  return projectByLenses(publicLenseSet)(users);
};

const getPasswordByUsername = storage => async username => {
  const user = storage.filter(
    byType(USER)
  ).find(
    byUsername(username)
  );
  return passwordLens.get(user);
};

const getUserByUsername = storage => async username => {
  const { publicLenses } = User;
  const publicLenseSet = Object.values(publicLenses);
  const user = storage.filter(
    byType(USER)
  ).find(
    byUsername(username)
  );
  return projectByLenses(publicLenseSet)(user);
};

/*
 * Produce methods for interacting with persistent storage. Parameterizing over
 * user enables this storage implementation to handle data access restrictions
 * and automatically supplementing userId value to input data
 */
const getStorageFactory = (storage = data) => user => {
  return {
    createTodo: createTodo(storage, user),
    getTodos: getTodos(storage, user),
    getTodoById: getTodoById(storage, user),
    updateTodoById: updateTodoById(storage, user),
    deleteTodoById: deleteTodoById(storage, user),
    getUsers: getUsers(storage),
    getPasswordByUsername: getPasswordByUsername(storage),
    getUserByUsername: getUserByUsername(storage),
  };
};

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
