const { User } = require('./models/User');
const { Todo } = require('./models/Todo');
const { BadRequestError, NotFoundError } = require('./Errors');

const registerApi = router => {
  router.get('/users', async (req, res) => {
    const users = await User.query();
    res.send(users);
  });

  router.get('/todos', async (req, res) => {
    const todos = await Todo.query();
    res.send(todos);
  });

  router.get('/todos/:id', async (req, res) => {
    const id = req.params.id;
    if (!id || Number.isInteger(id)) throw new BadRequestError('Invalid TodoID!');
    const todo = await Todo.query().where({ id }).first();
    if (!todo) throw new NotFoundError('No such Todo!');
    res.send(todo);
  });
};

module.exports = {
  registerApi,
};
