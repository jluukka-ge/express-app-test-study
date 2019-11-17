const { defineTodo } = require('./Todo');
const { defineUser } = require('./User');

const getModels = BaseClass => {
  return {
    Todo: defineTodo(BaseClass),
    User: defineUser(BaseClass),
  };
};

module.exports = {
  getModels,
};
