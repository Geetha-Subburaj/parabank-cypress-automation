import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import BillPayPage from "../../../Pages/UI/bill-pay.page";

Given('the user navigates to the Bill Pay page', () => BillPayPage.visit());
Then('the payee name input is visible', () => BillPayPage.payeeNameInput().should('be.visible'));
When('the user fills in the payee name {string}', (value: string) => BillPayPage.fillName(value));
When('the user fills in the payee address {string}, city {string}, state {string}, zip {string}', (address: string, city: string, state: string, zip: string) => BillPayPage.fillAddress(address, city, state, zip));
When('the user fills in the payee phone {string}', (value: string) => BillPayPage.fillPhone(value));
When('the user fills in the payee account number {string}', (value: string) => BillPayPage.fillAccount(value));
When('the user confirms the account number {string}', (value: string) => BillPayPage.confirmAccount(value));
When('the user enters payment amount {string}', (value: string) => BillPayPage.fillAmount(value));
When('the user clicks the {string} button without filling any fields', (label: string) => {
  if (label !== 'Send Payment') throw new Error(`Unexpected empty-form submit button: ${label}`);
  BillPayPage.submit();
});
Then('at least one validation error is displayed', () => BillPayPage.validationErrors().should('have.length.greaterThan', 0));

When('the user submits the bill pay form with {string} set to {string}', (field: string, value: string) => {
  const normalized = value === '(empty)' ? '' : value;
  const data = { name: 'Practice Payee', address: '456 Pay Street', city: 'Paytown', state: 'NY', zip: '10001', phone: '555-0200', account: '12345', amount: '50' };
  BillPayPage.fillName(data.name); BillPayPage.fillAddress(data.address, data.city, data.state, data.zip); BillPayPage.fillPhone(data.phone); BillPayPage.fillAccount(data.account); BillPayPage.confirmAccount(data.account); BillPayPage.fillAmount(data.amount);
  if (field.toLowerCase() === 'payee name') BillPayPage.fillName(normalized);
  else if (field.toLowerCase() === 'account number') BillPayPage.fillAccount(normalized);
  else if (field.toLowerCase() === 'amount') BillPayPage.fillAmount(normalized);
  else throw new Error(`Unsupported practice field: ${field}`);
  BillPayPage.submit();
});
Then('a validation error is shown', () => cy.get('#rightPanel').should($panel => { const text=$panel.text().toLowerCase(); const hasError=$panel.find('.error, #billpayError:visible, .error-message').length>0 || /error|invalid|enter|must|not valid|cannot/.test(text); expect(hasError, 'validation or rejection message is shown').to.equal(true); }));
