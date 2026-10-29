import UIActions from '../../support/utils/ui-actions';

class RequestLoanPage {
  private readonly selectors = {
    amount: '#amount',
    downPayment: '#downPayment',
    submit: "#rightPanel input[type='button'][value='Apply Now'], #rightPanel input[type='submit'][value='Apply Now']",
    result: '#loanRequestResult',
    status: '#loanStatus',
    heading: '#rightPanel h1, #rightPanel h2',
  };
  visit(): void { UIActions.clickLinkByText('Request Loan'); }
  heading() { return cy.get(this.selectors.heading).filter(':visible'); }
  amountInput() { return cy.get(this.selectors.amount); }
  downPaymentInput() { return cy.get(this.selectors.downPayment); }
  enterAmount(value: string): void { UIActions.typeText(this.selectors.amount, value); }
  enterDownPayment(value: string): void { UIActions.typeText(this.selectors.downPayment, value); }
  submit(): void { UIActions.clickBySelector(this.selectors.submit); }
  submitButton() { return cy.get(this.selectors.submit); }
  result() { return cy.get(this.selectors.result); }
  status() { return cy.get(this.selectors.status); }
}
export default new RequestLoanPage();
