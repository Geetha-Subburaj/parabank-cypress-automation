
import "dotenv/config";
import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";

const requiredEnv = (name: string): string => {
  const value = process.env[name];

  if (!value?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export default defineConfig({
  // Browser and test execution settings
  video: true,
  videoCompression: 32,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,

  // Artifact directories
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  downloadsFolder: "cypress/downloads",

  // Retry failed tests once in headless runs.
  // Do not retry tests in interactive Cypress open mode.
  retries: {
    runMode: 1,
    openMode: 0,
  },

  // Global timeouts
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  requestTimeout: 15000,
  responseTimeout: 30000,
  taskTimeout: 60000,

  // Browser viewport
  viewportWidth: 1280,
  viewportHeight: 720,

  e2e: {
    baseUrl: requiredEnv("PARABANK_BASE_URL"),

    specPattern: "features/**/*.feature",

    supportFile: "cypress/support/e2e.ts",

    // Cypress isolates tests by default.
    testIsolation: true,

    async setupNodeEvents(on, config) {
      config.env.PARABANK_USERNAME =
        requiredEnv("PARABANK_USERNAME");

      config.env.PARABANK_PASSWORD =
        requiredEnv("PARABANK_PASSWORD");

      config.env.PARABANK_API_BASE_URL =
        requiredEnv("PARABANK_API_BASE_URL");

      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});
