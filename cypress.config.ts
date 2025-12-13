import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    excludeSpecPattern: "*.ts",
    specPattern: "cypress/integration/**/features/*.feature",
    experimentalRunAllSpecs: true,
  },
});
