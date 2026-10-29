
declare global {
  namespace Cypress {
    interface Chainable {
      loginAsConfiguredUser: () => Cypress.Chainable;
    }
  }
}

export {};
