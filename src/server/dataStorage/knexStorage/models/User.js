const { tables } = require('../../../../../constants');
const { jsonSchema } = require('../../../models/User');

const defineUser = BaseClass => {
  return class User extends BaseClass {
    static get tableName() {
      return tables.USER_TABLE;
    }

    static get jsonSchema() {
      return jsonSchema;
    }
  };
};

module.exports = {
  defineUser,
};
