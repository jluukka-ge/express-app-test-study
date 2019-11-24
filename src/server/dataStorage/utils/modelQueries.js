/*
 * Generic functions for wirking with Knex model queries
 */

const createItem = (Model, data) => Model.query().insert(data);

const getItemById = (Model, id) => Model.query().findById(id).first();
const getItemByProps = (Model, props) => Model.query().where(props).first();
const getAllItems = Model => Model.query();

const deleteItemById = (Model, id) => Model.query().deleteById(id);

const projectItemByLenses = lenses => data => {
  return lenses.reduce((acc, lense) => {
    return lense.set(acc, lense.get(data));
  }, {});
};

const projectArrayByLenses = lenses => items => items.map(projectItemByLenses(lenses));

const projectByLenses = lenses => data =>
  Array.isArray(data) ? projectArrayByLenses(lenses)(data) : projectItemByLenses(lenses)(data);

const currentTimestamp = Model => Model.fn().now();

const restrictAccessByUser = user => queryBuilder => {
  if (!user || !user.id) throw new Error('`user` not defined!');
  return queryBuilder.where({ userId: user.id });
};

module.exports = {
  createItem,
  getItemById,
  getItemByProps,
  getAllItems,
  deleteItemById,
  projectItemByLenses,
  projectArrayByLenses,
  projectByLenses,
  currentTimestamp,
  restrictAccessByUser,
};
