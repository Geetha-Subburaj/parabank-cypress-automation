

const { spawnSync } = require("node:child_process");
const process = require("node:process");

const npmCommand = process.platform === "win32" ? "npx.cmd" : "npx";

// Pass an optional feature path from the command line.
const feature = process.argv[2];

const cypressArgs = ["cypress", "run"];

if (feature) {
  cypressArgs.push("--spec", feature);
}

console.log(
  feature
    ? `Running feature: ${feature}`
    : "Running the complete Cypress test suite"
);

const testRun = spawnSync(npmCommand, cypressArgs, {
  stdio: "inherit",
  shell: process.platform === "win32",
});

if (testRun.error) {
  console.error("Failed to start Cypress:", testRun.error);
  process.exit(1);
}

// Generate the HTML report even if some tests failed.
const reportRun = spawnSync(
  process.execPath,
  ["scripts/generate-cucumber-report.cjs"],
  { stdio: "inherit" }
);

if (reportRun.error || reportRun.status !== 0) {
  console.error("HTML report generation failed.");
  process.exit(1);
}

// Preserve Cypress's pass/fail exit status.
process.exit(testRun.status ?? 1);
