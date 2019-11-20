const get = (lens) => data => lens.get(data);
const set = (lens, v) => data => lens.set(data, v);

const propLens = prop => ({
  get: o => o && o[prop],
  set: (o, v) => o && ({ ...o, [prop]: v }),
});

module.exports = {
  get,
  set,
  propLens,
};
