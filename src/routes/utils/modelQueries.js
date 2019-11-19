const getItemById = (Model, id) => Model.query().where({ id }).first();
const getAllItems = Model => Model.query();

module.exports = {
  getItemById,
  getAllItems,
};
