const { tables } = require('../../../constants');

const defineTodo = BaseClass => {
  return class Todo extends BaseClass {
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
  };
};

module.exports = {
  defineTodo
};
