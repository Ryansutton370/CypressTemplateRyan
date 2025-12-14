require("dotenv").config();
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").default;

module.exports = async (on, config) => {
  await addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", createBundler({
    plugins: [createEsbuildPlugin(config)],
  }));

  config.env.baseUrl = process.env.BASEURL;

  return config;
};
