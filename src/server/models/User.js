const { propLens, set } = require('../utils/lenses');
const { omit } = require('../utils/objects');
const { pipe } = require('../utils/functions');

// Define lenses (accessors) for this data model
const idLens = propLens('id');
const usernameLens = propLens('username');
const nameLens = propLens('name');
const lastNameLens = propLens('lastName');
const passwordLens = propLens('password');
const createdAtLens = propLens('createdAt');
const updatedAtLens = propLens('updatedAt');

const lenses = {
  id: idLens,
  username: usernameLens,
  name: nameLens,
  lastname: lastNameLens,
  password: passwordLens,
  createdAt: createdAtLens,
  updatedAt: updatedAtLens,
};

/*
 * Define which data fields are safe to be passed around
 */
const publicLenses = omit(lenses, 'password');

/*
 * JSON schema as described by json-schema.org
 */
const jsonSchema = {
  type: 'object',
  required: ['username'],

  properties: {
    id: { type: 'integer' },
    name: { type: 'string', minLength: 1, maxLength: 255 },
    password: { type: 'string', minLength: 3, maxLength: 255 },
  },
};


/*
 * Get empty instance of a Todo
 */
const getEmptyUser = () => pipe(
  set(idLens, undefined),
  set(usernameLens, undefined),
  set(nameLens, undefined),
  set(lastNameLens, undefined),
  set(passwordLens, undefined),
  set(createdAtLens, undefined),
  set(updatedAtLens, undefined),
)({});

module.exports = {
  idLens,
  usernameLens,
  nameLens,
  lastNameLens,
  passwordLens,
  createdAtLens,
  updatedAtLens,

  lenses,
  publicLenses,

  jsonSchema,
  getEmptyUser,
};
