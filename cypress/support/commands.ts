/// <reference path="./commands.d.ts" />
Cypress.Commands.add("loginAsConfiguredUser", () => {
  cy.env(["PARABANK_USERNAME", "PARABANK_PASSWORD"]).then(
    ({ PARABANK_USERNAME, PARABANK_PASSWORD }) => {
      if (!PARABANK_USERNAME || !PARABANK_PASSWORD) {
        throw new Error(
          "ParaBank login credentials are missing."
        );
      }

      cy.visit("/");

      cy.get('input[name="username"]')
        .clear()
        .type(PARABANK_USERNAME);

      cy.get('input[name="password"]')
        .clear()
        .type(PARABANK_PASSWORD, { log: false });

      cy.get('input[value="Log In"]').click();

      cy.url().should("include", "overview.htm");
    }
  );
});
