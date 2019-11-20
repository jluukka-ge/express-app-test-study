const { tables } = require('../../../constants');

const { propLens } = require('../utils/lenses');
const { omit } = require('../utils/objects');

const lenses = {
  id: propLens('id'),
  username: propLens('username'),
  name:  propLens('name'),
  lastname: propLens('lastName'),
  password: propLens('password'),
};

const publicLenses = omit(lenses, 'password');

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
          password: { type: 'string', minLength: 3, maxLength: 255 },
        },
      };
    }
  };
};

module.exports = {
  lenses,
  publicLenses,
  defineUser,
};
