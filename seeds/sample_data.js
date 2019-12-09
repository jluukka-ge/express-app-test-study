const { USER_TABLE, TODO_TABLE } = require('../constants/tables');
const { hashPassword } = require('../src/server/accounts/password');

const TEST_PASSWORD = 'test';

const TODO_LIST = [
  {
    title: 'Buy bread'
  }, {
    title: 'Pay rent'
  }, {
    title: 'Take the dog for a walk'
  }
];

const USER_LIST = [
  {
    username: 'pentti',
    name: 'Pentti',
    lastName: 'Placeholder',
  }, {
    username: 'milla',
    name: 'Milla',
    lastName: 'Mallikas',
  }, {
    username: 'kaija',
    name: 'Kaija',
    lastName: 'Koodari',
  }
];

const seed = async function (knex) {
  const { hash } = await hashPassword(TEST_PASSWORD);
  await knex(USER_TABLE).insert(USER_LIST.map(user => ({ ...user, password: hash })));
  const users = await knex(USER_TABLE).select('*');

  const promises = users.map( user => {
    const userTodos = TODO_LIST.map(baseItem => {
      const userTodoDetails = {
        userId: user.id,
        description: `${user.name} remember: ${baseItem.title}`
      };
      return Object.assign(userTodoDetails, baseItem);
    });
    return knex(TODO_TABLE).insert(userTodos);
  });
  await Promise.all(promises);
  console.log('seed done');
};

module.exports = {
  TODO_LIST,
  USER_LIST,

  seed,
};
