// Global Cypress support setup.
// Add custom commands and global hooks here when needed.

import "./commands";
beforeEach(() => {
  cy.log("Cypress beforeEach: test starting");
});

afterEach(function () {
  if (this.currentTest?.state === "failed") {
    cy.log("Cypress afterEach: test failed");
  } else {
    cy.log("Cypress afterEach: test completed");
  }
});