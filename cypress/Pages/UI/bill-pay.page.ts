import UIActions from '../../support/utils/ui-actions';

class BillPayPage {
  private readonly selectors = {
    form: '#billpayForm',
    heading: '#rightPanel h1, #rightPanel h2',
    name: "#billpayForm input[name='payee.name']",
    address: "#billpayForm input[name='payee.address.street']",
    city: "#billpayForm input[name='payee.address.city']",
    state: "#billpayForm input[name='payee.address.state']",
    zip: "#billpayForm input[name='payee.address.zipCode']",
    phone: "#billpayForm input[name='payee.phoneNumber']",
    account: "#billpayForm input[name='payee.accountNumber']",
    confirmAccount: "#billpayForm input[name='verifyAccount']",
    amount: "#billpayForm input[name='amount']",
    submit: "#billpayForm input[type='button'][value='Send Payment']",
    validationErrors: '#rightPanel .error, #rightPanel .error-message',
  };

  visit(): void { UIActions.clickLinkByText('Bill Pay'); }
  heading() { return cy.get(this.selectors.heading).filter(':visible'); }
  payeeNameInput() { return cy.get(this.selectors.name); }
  fillName(value: string): void { UIActions.typeText(this.selectors.name, value); }
  fillAddress(address: string, city: string, state: string, zip: string): void {
    UIActions.typeText(this.selectors.address, address);
    UIActions.typeText(this.selectors.city, city);
    UIActions.typeText(this.selectors.state, state);
    UIActions.typeText(this.selectors.zip, zip);
  }
  fillPhone(value: string): void { UIActions.typeText(this.selectors.phone, value); }
  fillAccount(value: string): void { UIActions.typeText(this.selectors.account, value); }
  confirmAccount(value: string): void { UIActions.typeText(this.selectors.confirmAccount, value); }
  fillAmount(value: string): void { UIActions.typeText(this.selectors.amount, value); }
  submit(): void { UIActions.clickBySelector(this.selectors.submit); }
  submitButton() { return cy.get(this.selectors.submit); }
  validationErrors() { return cy.get(this.selectors.validationErrors); }
  confirmation() { return cy.get('#billpayResult:visible'); }
}
export default new BillPayPage();
