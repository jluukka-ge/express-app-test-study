const {
  createItem,
  getItemById,
  getItemByProps,
  getAllItems,
  deleteItemById,
  projectByLenses,
  currentTimestamp,
  restrictAccessByUser,
} = require('./utils/modelQueries');

const createTodo = ({ Todo }, user) => data => {
  const { userId } = Todo.lenses;
  const newData = userId.set(data, user.id);
  return createItem(Todo, newData);
};

const getTodos = ({ Todo }, user) => () => restrictAccessByUser(user)(
  getAllItems(Todo)
);

const getTodoById = ({ Todo }, user) => id => restrictAccessByUser(user)(
  getItemById(Todo, id)
);

const updateTodoById = ({ Todo }, user) => async (id, data) => {
  const { updatedAt } = Todo.lenses;
  const instance = await restrictAccessByUser(user)(
    getItemById(Todo, id)
  );
  return instance.$query().updateAndFetch(
    updatedAt.set(data, currentTimestamp(Todo))
  );
};

const deleteTodoById = ({ Todo }, user) => id => restrictAccessByUser(user)(
  deleteItemById(Todo, id)
);

const getUsers = ({ User }) => async () => {
  const { publicLenses } = User;
  const publicLenseSet = Object.values(publicLenses);
  const users = await getAllItems(User);
  return projectByLenses(publicLenseSet)(users);
};

const getPasswordByUsername = ({ User }) => async username => {
  const user = await getItemByProps(User, { username });
  return user.password;
};

const getUserByUsername = ({ User }) => async username => {
  const { publicLenses } = User;
  const publicLenseSet = Object.values(publicLenses);
  const user = await getItemByProps(User, { username });
  return projectByLenses(publicLenseSet)(user);
};

const getStorage = models => user => {
  return {
    createTodo: createTodo(models, user),
    getTodos: getTodos(models, user),
    getTodoById: getTodoById(models, user),
    updateTodoById: updateTodoById(models, user),
    deleteTodoById: deleteTodoById(models, user),
    getUsers: getUsers(models),
    getPasswordByUsername: getPasswordByUsername(models),
    getUserByUsername: getUserByUsername(models),

    models
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

  getStorage,
};
