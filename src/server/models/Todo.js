const { propLens, set } = require('../utils/lenses');
const { pipe } = require('../utils/functions');

// Define lenses (accessors) for this data model
const idLens = propLens('id');
const titleLens = propLens('title');
const descriptionLens = propLens('description');
const userIdLens = propLens('userId');
const createdAtLens = propLens('createdAt');
const updatedAtLens = propLens('updatedAt');

const lenses = {
  id: idLens,
  title: titleLens,
  description: descriptionLens,
  userId: userIdLens,
  createdAt: createdAtLens,
  updatedAt: updatedAtLens,
};

/*
 * JSON schema as described by json-schema.org
 */
const jsonSchema = {
  type: 'object',
  required: ['title'],

  properties: {
    id: { type: 'integer' },
    title: { type: 'string', minLength: 1, maxLength: 255 },
    description: { type: 'string', minLength: 1, maxLength: 255 },
    userId: { type: ['integer', 'null'] },
  },
};

/*
 * Get empty instance of a Todo
 */
const getEmptyTodo = () => pipe(
  set(idLens, undefined),
  set(titleLens, undefined),
  set(descriptionLens, undefined),
  set(userIdLens, undefined),
  set(createdAtLens, undefined),
  set(updatedAtLens, undefined),
)({});

module.exports = {
  idLens,
  titleLens,
  descriptionLens,
  userIdLens,
  createdAtLens,
  updatedAtLens,
  lenses,

  jsonSchema,
  getEmptyTodo,
};
