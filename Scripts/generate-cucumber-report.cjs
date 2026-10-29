
const fs = require("node:fs");
const path = require("node:path");

async function main() {
  const jsonDir = path.resolve("reports/cucumber");
  const reportPath = path.resolve("reports/html");

  if (!fs.existsSync(jsonDir)) {
    throw new Error(`JSON directory not found: ${jsonDir}`);
  }

  const jsonFiles = fs
    .readdirSync(jsonDir)
    .filter((file) => file.endsWith(".json"));

  if (jsonFiles.length === 0) {
    throw new Error(
      `No Cucumber JSON reports found in ${jsonDir}. Run Cypress first.`
    );
  }

  const { generate } = await import("multiple-cucumber-html-reporter");

  fs.mkdirSync(reportPath, { recursive: true });

  await generate({
    jsonDir,
    reportPath,
    reportName: "ParaBank Automation Test Report",
    pageTitle: "ParaBank Cypress Test Results",
    displayDuration: true,
    metadata: {
      browser: {
        name: "chrome",
        version: "local",
      },
      device: "Local machine",
      platform: {
        name: process.platform,
        version: process.version,
      },
    },
  });

  console.log(`Report generated: ${path.join(reportPath, "index.html")}`);
}

main().catch((error) => {
  console.error("HTML report generation failed:", error);
  process.exitCode = 1;
});

