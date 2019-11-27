/*
 * Lenses are portable, immutable and flexible accessors for objects, originating
 * from Functional Programming land. Useful for decoupling data shape from domain logic.
 */

// Utility function for getting a value using lenses
const get = (lens) => data => lens.get(data);

// Utility function for setting a value using lenses
const set = (lens, v) => data => lens.set(data, v);

// Produces a lens (a getter and setter pair) for given property name
const propLens = prop => ({
  get: o => o && o[prop],
  set: (o, v) => o && ({ ...o, [prop]: v }),
});

const projectItemByLenses = lenses => data => {
  return lenses.reduce((acc, lense) => {
    return lense.set(acc, lense.get(data));
  }, {});
};

const projectArrayByLenses = lenses => items => items.map(projectItemByLenses(lenses));

const projectByLenses = lenses => data =>
  Array.isArray(data) ? projectArrayByLenses(lenses)(data) : projectItemByLenses(lenses)(data);

module.exports = {
  get,
  set,
  propLens,
  projectItemByLenses,
  projectArrayByLenses,
  projectByLenses,
};
