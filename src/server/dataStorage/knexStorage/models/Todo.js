const { tables } = require('../../../../../constants');
const { jsonSchema } = require('../../../models/Todo');

const defineTodo = BaseClass => {
  return class Todo extends BaseClass {
    static get tableName() {
      return tables.TODO_TABLE;
    }

    static get jsonSchema() {
      return jsonSchema;
    }
  };
};

module.exports = {
  defineTodo,
};
