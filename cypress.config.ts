import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  pageLoadTimeout: 100000, // Set the page load timeout to 10 seconds (milliseconds)
  defaultCommandTimeout: 100000, // Set the default command timeout to 10 seconds (milliseconds)
  e2e: {
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    excludeSpecPattern: "*.ts",
    specPattern: "cypress/integration/**/features/*.feature",
    experimentalRunAllSpecs: true,
  },
});
