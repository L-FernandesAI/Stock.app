module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    fullySpecified: false,
  };
  return config;
};
