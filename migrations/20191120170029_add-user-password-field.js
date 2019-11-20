const { tables } = require('../constants');

const PASSWORD_COLUMN = 'password';

exports.up = knex => {
  return knex.schema.hasColumn(tables.USER_TABLE, PASSWORD_COLUMN).then(columnExists => {
    if (!columnExists) {
      return knex.schema.alterTable(tables.USER_TABLE, t => {
        t.string(PASSWORD_COLUMN).notNullable().defaultTo('-');
      });
    }
  });
};

exports.down = knex => {
  return knex.schema.hasColumn(tables.USER_TABLE, PASSWORD_COLUMN).then(columnExists => {
    if (columnExists) {
      return knex.schema.alterTable(tables.USER_TABLE, t => {
        t.dropColumn(PASSWORD_COLUMN);
      });
    }
  });
};
