const path = require("path");
module.exports = async ({ config, mode }) => {
  config.resolve.alias["@"] = path.resolve(__dirname, "../src");

  // Return the altered config
  return config;
};
