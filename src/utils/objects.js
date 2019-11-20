const omit = (object, ...props) => {
  const rest = props.reduce((acc, prop) => {
    const {
      [prop]: _, // eslint-disable-line no-unused-vars
      ...rest
    } = acc;
    return rest;
  }, object);
  return rest;
};

module.exports = {
  omit,
};
