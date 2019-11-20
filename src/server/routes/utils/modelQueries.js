const getItemById = (Model, id) => Model.query().where({ id }).first();
const getItemByProps = (Model, props) => Model.query().where(props).first();
const getAllItems = Model => Model.query();

const projectByLenses = lenses => data => {
  return lenses.reduce((acc, lense) => {
    return lense.set(acc, lense.get(data));
  }, {});
};

const getAllWithProjection = async (Model, publicLenses) => {
  const items = await getAllItems(Model);
  return items.map(
    projectByLenses(publicLenses)
  );
};

module.exports = {
  getItemById,
  getItemByProps,
  getAllItems,
  projectByLenses,
  getAllWithProjection,
};
