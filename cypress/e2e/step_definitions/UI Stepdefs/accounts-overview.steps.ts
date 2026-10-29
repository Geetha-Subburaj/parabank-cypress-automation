import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import AccountsOverviewPage from '../../../Pages/UI/accounts-overview.page';
import AccountDetailsPage from '../../../Pages/UI/account-details.page';


let expectedAccountId = '';
Given('the user navigates to the Accounts Overview page', () => AccountsOverviewPage.visit());
Then('at least one account link is visible in the accounts table', () => AccountsOverviewPage.accountLinks().should('have.length.greaterThan', 0).first().should('be.visible'));
When('the user clicks on the first account link', () => {
  AccountsOverviewPage.accountLinks().first().invoke('attr', 'href').then((href) => {
    const match = href?.match(/[?&]id=(\d+)/);
    expectedAccountId = match?.[1] ?? '';
    expect(expectedAccountId, 'account ID in first account link').not.to.be.empty;
    AccountsOverviewPage.clickFirstAccount();
  });
});
Then('the "Account Details" heading is visible on the destination page', () => cy.get('#rightPanel h1, #rightPanel h2').filter(':visible').should('contain.text', 'Account Details'));
Then('the total balance cell in the accounts table footer is visible', () => AccountsOverviewPage.totalBalanceCell().should('be.visible'));

Then("Account Details page shows the correct account ID", () => {
  AccountDetailsPage.verifyAccountIdIsDisplayed();
});

Then("Account Details page shows current balance", () => {
  AccountDetailsPage.verifyCurrentBalanceIsDisplayed();
});
