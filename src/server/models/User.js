const { tables } = require('../../../constants');

const { propLens } = require('../utils/lenses');
const { omit } = require('../utils/objects');

// Define lenses (accessors) for this data model
const lenses = {
  id: propLens('id'),
  username: propLens('username'),
  name:  propLens('name'),
  lastname: propLens('lastName'),
  password: propLens('password'),
  createdAt: propLens('createdAt'),
  updatedAt: propLens('updatedAt'),
};

/*
 * Define which data fields are safe to be passed around
 */
const publicLenses = omit(lenses, 'password');

const defineUser = BaseClass => {
  class User extends BaseClass {
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
  }
  // Allow access to lenses through the data model class
  User.lenses = lenses;
  User.publicLenses = publicLenses;
  return User;
};

module.exports = {
  lenses,
  publicLenses,
  defineUser,
};
