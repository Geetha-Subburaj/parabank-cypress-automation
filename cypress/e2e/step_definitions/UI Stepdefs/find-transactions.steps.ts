import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import FindTransactionsPage from '../../../Pages/UI/find-transactions.page';
import DateUtils from '../../../support/utils/date-utils';
import ApiClient from '../../../Pages/API/api-client';

Given('the user navigates to the Find Transactions page', () => FindTransactionsPage.visit());
When('the user enters {string} in the amount search field', (value: string) => FindTransactionsPage.enterAmount(value));
When("the user enters today's date in the date search field", () => FindTransactionsPage.enterDate(DateUtils.today()));
When('the user enters a valid transaction ID in the ID search field', () => {
  cy.env(['PARABANK_USERNAME', 'PARABANK_PASSWORD']).then(({ PARABANK_USERNAME, PARABANK_PASSWORD }) => {
    if (typeof PARABANK_USERNAME !== 'string' || typeof PARABANK_PASSWORD !== 'string') {
      throw new Error('Credentials are required to locate a valid transaction.');
    }
    return ApiClient.login(PARABANK_USERNAME, PARABANK_PASSWORD).then((login) => {
      expect(login.status).to.eq(200);
      const customerId = (login.body as Record<string, unknown>).id;
      return ApiClient.request('GET', `customers/${customerId}/accounts`, { headers: { Accept: 'application/json' } }).then((accountsResponse) => {
        expect(accountsResponse.status).to.eq(200);
        const accounts = accountsResponse.body as Array<Record<string, unknown>>;
        expect(accounts).to.be.an('array').and.not.be.empty;
        return ApiClient.request('GET', `accounts/${accounts[0].id}/transactions`, { headers: { Accept: 'application/json' } }).then((transactionsResponse) => {
          expect(transactionsResponse.status).to.eq(200);
          const transactions = transactionsResponse.body as Array<Record<string, unknown>>;
          expect(transactions).to.be.an('array').and.not.be.empty;
          const transactionId = transactions[0].id ?? transactions[0].transactionId;
          expect(transactionId, 'transaction ID from API').to.exist;
          FindTransactionsPage.enterTransactionId(String(transactionId));
        });
      });
    });
  });
});
When('the user enters the date from {string} in the from-date field', (relativeDate: string) => {
  if (relativeDate !== '7 days ago') throw new Error(`Unsupported relative date: ${relativeDate}`);
  FindTransactionsPage.enterFromDate(DateUtils.daysAgo(7));
});
When("the user enters today's date in the to-date field", () => FindTransactionsPage.enterToDate(DateUtils.today()));
Then('either a results table is shown or the text {string} is visible', (message: string) => {
  cy.get('#rightPanel').should(($panel) => {
    expect($panel.find('#transactionTable').length > 0 || $panel.text().includes(message)).to.equal(true);
  });
});
Then('either the matching transaction details are shown or an error message is visible', () => {
  cy.get('#rightPanel').should(($panel) => {
    expect($panel.find('#transactionTable, .error, .error-message').length).to.be.greaterThan(0);
  });
});

Then('the text {string} is visible', (message: string) => {
  cy.get('#rightPanel').should('be.visible').and('contain.text', message);
});
Then('the transaction results table should be displayed', () => {
  FindTransactionsPage.resultsArea()
    .should('be.visible');

  cy.get('#resultContainer')
    .should('be.visible');

  cy.get('#transactionTable')
    .should('be.visible');
});

Then('no transaction records should be displayed', () => {
  cy.get('#transactionTable tbody tr')
    .should('have.length', 0);
});
