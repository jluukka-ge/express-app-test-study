const { Model } = require('objection');
const { tables } = require('../../constants');

class Todo extends Model {
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

module.exports = {
  Todo
};
