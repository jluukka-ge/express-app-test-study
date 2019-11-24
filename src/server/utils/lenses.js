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

module.exports = {
  get,
  set,
  propLens,
};
