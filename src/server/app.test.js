const request = require('supertest');

const { getApp } = require('./app');
const { getStorageFactory } = require('./dataStorage/mockStorage');
const { getClient } = require('../client/supertestClient');

describe('Todo app', () => {
  it('produces an authentication error on protected APIs', () => {
    const getStorage = getStorageFactory();
    const app = getApp(getStorage);

    const {
      getUsers,
    } = getClient(app);

    return getUsers()
      .expect(401);
  });

  it('returns an array of users', async () => {
    const getStorage = getStorageFactory();
    const app = getApp(getStorage);

    const {
      getUsers,
      login,
    } = getClient(app);

    const token = await login('pentti', 'test').then(response => response.res.text);
    return getUsers(token)
      .expect(200, [
        { id: 1, username: 'pentti' },
        { id: 2, username: 'milla' },
        { id: 3, username: 'kaija' },
      ]);
  });

  it('returns an array of todos for a user', async () => {
    const getStorage = getStorageFactory();
    const app = getApp(getStorage);

    const {
      getTodos,
      login,
    } = getClient(app);

    const token = await login('pentti', 'test').then(response => response.res.text);
    return getTodos(token)
      .expect(200, [
        { id: 1, userId: 1, __type: 'TODO', title: 'pentti', description: 'bread' },
        { id: 2, userId: 1, __type: 'TODO', title: 'pentti', description: 'rent' },
        { id: 3, userId: 1, __type: 'TODO', title: 'pentti', description: 'walk' },
      ]);
  });
});
