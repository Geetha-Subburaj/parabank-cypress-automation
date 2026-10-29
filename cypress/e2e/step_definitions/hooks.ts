
import {
  Before,
  After,
} from "@badeball/cypress-cucumber-preprocessor";

// ============================================
// UI SCENARIO HOOKS
// ============================================

Before({ tags: "@ui" }, () => {
  cy.log("========== UI SCENARIO STARTING ==========");

  cy.clearCookies();
  cy.clearLocalStorage();

  cy.log("UI browser state cleared");
});

After({ tags: "@ui" }, () => {
  cy.log("========== UI SCENARIO COMPLETED ==========");
});

// ============================================
// API SCENARIO HOOKS
// ============================================

Before({ tags: "@api" }, () => {
  cy.log("========== API SCENARIO STARTING ==========");
});

After({ tags: "@api" }, () => {
  cy.log("========== API SCENARIO COMPLETED ==========");
});
