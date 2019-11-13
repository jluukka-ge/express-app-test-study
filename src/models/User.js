const { Model } = require('objection');
const { tables } = require('../../constants');

class User extends Model {
  static get tableName() {
    return tables.USER_TABLE;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }
}

module.exports = {
  User,
};
