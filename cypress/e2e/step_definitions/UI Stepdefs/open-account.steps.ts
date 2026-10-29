import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import OpenAccountPage from '../../../Pages/UI/open-account.page';

Given('the user navigates to the Open New Account page', () => OpenAccountPage.visit());
Then('the account type dropdown is present', () => OpenAccountPage.accountTypeDropdown().should('be.visible'));
Then('the {string} button is present', (label: string) => {
  if (label !== 'Open New Account') throw new Error(`Unsupported button: ${label}`);
  OpenAccountPage.submitButton().should('be.visible');
});
When('the user selects account type {string}', (type: string) => {
  if (type !== 'CHECKING' && type !== 'SAVINGS') throw new Error(`Unsupported account type: ${type}`);
  OpenAccountPage.selectType(type);
});
Then('the confirmation message contains {string}', (message: string) => OpenAccountPage.result().should('contain.text', message));
When('the user navigates to the activity page for the new account ID', () => OpenAccountPage.openActivityForNewAccount());
Then('the displayed account ID matches the newly created account', () => OpenAccountPage.newAccountId().then((id) => cy.get('#rightPanel').should('contain.text', id)));
