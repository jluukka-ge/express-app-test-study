const { tables } = require('../../constants');

const defineUser = BaseClass => {
  return class User extends BaseClass {
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
  };
};

module.exports = {
  defineUser,
};
