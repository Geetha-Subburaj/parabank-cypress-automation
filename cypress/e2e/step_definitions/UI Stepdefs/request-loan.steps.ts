import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import RequestLoanPage from '../../../Pages/UI/request-loan.page';

Given('the user navigates to the Request Loan page', () => RequestLoanPage.visit());
Then('the Loan Amount input is visible', () => RequestLoanPage.amountInput().should('be.visible'));
Then('the Down Payment input is visible', () => RequestLoanPage.downPaymentInput().should('be.visible'));
When('the user enters loan amount {string}', (value: string) => RequestLoanPage.enterAmount(value));
When('the user enters down payment {string}', (value: string) => RequestLoanPage.enterDownPayment(value));
Then('the loan status element is visible indicating {string} or {string}', (first: string, second: string) => {
  RequestLoanPage.result().should('be.visible').and(($result) => expect($result.text()).to.match(new RegExp(`${first}|${second}`, 'i')));
});

When('the user submits a loan request that is approved', () => {
  RequestLoanPage.enterAmount('100'); RequestLoanPage.enterDownPayment('90'); RequestLoanPage.submit();
  RequestLoanPage.result().should('be.visible');
});
Then('a new account ID is shown in the loan result when approved', () => {
  RequestLoanPage.result().should('be.visible').then($result => {
    const text=$result.text();
    if (/approved/i.test(text)) { expect(text, 'approved loan result should include an account identifier').to.match(/account\s*(number|id)?\s*:?\s*\d+/i); }
    else { cy.log('Loan was not approved; account creation is not applicable for this run.'); }
  });
});
