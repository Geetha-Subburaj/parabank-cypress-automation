import UIActions from '../../support/utils/ui-actions';

class TransferFundsPage {
  private readonly selectors = {
    amount: '#amount',
    from: '#fromAccountId',
    to: '#toAccountId',
    submit: "#rightPanel input[type='button'][value='Transfer'], #rightPanel input[type='submit'][value='Transfer']",
    result: '#showResult',
    heading: '#rightPanel h1, #rightPanel h2',
  };
  visit(): void { 
    UIActions.clickLinkByText('Transfer Funds');
   }
  heading() {
     return cy.get(this.selectors.heading).filter(':visible');
     }
  amountInput() { 
    return cy.get(this.selectors.amount);
   }
  fromDropdown() { 
    return cy.get(this.selectors.from);
   }
  toDropdown() { 
    return cy.get(this.selectors.to); 
  }
  enterAmount(value: string): void { 
    UIActions.typeText(this.selectors.amount, value); 
  }
  selectFirstSourceAccount(): void {
     this.fromDropdown().find('option').eq(0).then(($option) => UIActions.selectOption(this.selectors.from, String($option.val()))); 
    }
  selectSecondDestinationAccount(): void { 
    this.toDropdown().find('option').eq(1).then(($option) => UIActions.selectOption(this.selectors.to, String($option.val()))); }
  submit(): void { 
    UIActions.clickBySelector(this.selectors.submit); }
  submitButton() {
     return cy.get(this.selectors.submit); }
  result() { 
    return cy.get(this.selectors.result); }
  accountOptionCount(which: 'from' | 'to'): Cypress.Chainable<number> {
    
    const selector = which === 'from' ? this.selectors.from : this.selectors.to;
    return cy.get(selector).find('option').its('length');
  }
}
export default new TransferFundsPage();
