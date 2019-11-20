const getItemById = (Model, id) => Model.query().where({ id }).first();
const getItemByProps = (Model, props) => Model.query().where(props).first();
const getAllItems = Model => Model.query();

const projectItemByLenses = lenses => data => {
  return lenses.reduce((acc, lense) => {
    return lense.set(acc, lense.get(data));
  }, {});
};

const projectArrayByLenses = lenses => items => items.map(projectItemByLenses(lenses));

const projectByLenses = lenses => data =>
  Array.isArray(data) ? projectArrayByLenses(lenses)(data) : projectItemByLenses(lenses)(data);

module.exports = {
  getItemById,
  getItemByProps,
  getAllItems,
  projectItemByLenses,
  projectArrayByLenses,
  projectByLenses,
};
