const { tables } = require('../../../constants');

const { propLens } = require('../utils/lenses');

const lenses = {
  id: propLens('id'),
  title: propLens('title'),
  description:  propLens('description'),
  userId: propLens('userId'),
  createdAt: propLens('createdAt'),
  updatedAt: propLens('updatedAt'),
};

const defineTodo = BaseClass => {
  class Todo extends BaseClass {
    static get tableName() {
      return tables.TODO_TABLE;
    }

    static get jsonSchema() {
      return {
        type: 'object',
        required: ['title'],

        properties: {
          id: { type: 'integer' },
          title: { type: 'string', minLength: 1, maxLength: 255 },
          description: { type: 'string', minLength: 1, maxLength: 255 },
          userId: { type: ['integer', 'null'] },
        },
      };
    }
  }
  Todo.lenses = lenses;
  return Todo;
};

module.exports = {
  lenses,
  defineTodo,
};
