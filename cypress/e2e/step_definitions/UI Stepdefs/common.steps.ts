import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../../Pages/UI/login.page';
import UIActions from '../../../support/utils/ui-actions';

Given("the user is logged in to ParaBank", () => {
  cy.loginAsConfiguredUser();
});
When('the user clicks the {string} button', (label: string) => UIActions.clickButtonByText(label));
When('the user clicks the {string} link', (label: string) => UIActions.clickLinkByText(label));
When('the user clicks {string}', (label: string) => UIActions.clickText(label));
Then('the {string} button is visible', (label: string) => UIActions.assertButtonVisibleByText(label));
Then('the confirmation message {string} is displayed', (message: string) => cy.get('#rightPanel').should('contain.text', message));
Then('the heading {string} is visible', (heading: string) => cy.get('#rightPanel h1, #rightPanel h2').filter(':visible').should('contain.text', heading));
Then('the browser URL contains {string}', (part: string) => cy.url().should('include', part));
