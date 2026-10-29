
import UIActions from '../../support/utils/ui-actions';

class OpenAccountPage {
  private readonly selectors = {
    accountType: '#type',
    fromAccount: '#fromAccountId',
    submit: "#rightPanel input[type='button'][value='Open New Account'], #rightPanel input[type='submit'][value='Open New Account']",
    result: '#openAccountResult',
    newAccountId: '#newAccountId',
    heading: '#rightPanel h1, #rightPanel h2',
  };

  visit(): void {
    UIActions.clickLinkByText('Open New Account');
  }

  heading() {
    return cy.get(this.selectors.heading).filter(':visible');
  }

  accountTypeDropdown() {
    return cy.get(this.selectors.accountType);
  }

  submitButton() {
    return cy.get(this.selectors.submit);
  }

  selectType(type: 'CHECKING' | 'SAVINGS'): void {
    const value = type === 'CHECKING' ? '0' : '1';

    cy.get(this.selectors.accountType)
      .should('be.visible')
      .select(value)
      .should('have.value', value);
  }

  selectFundingAccount(): void {
  cy.get(this.selectors.fromAccount)
    .should('be.visible')
    .find('option')
    .should('have.length.greaterThan', 0)
    .first()
    .invoke('val')
    .then((accountId) => {
      if (accountId == null || accountId === '') {
        throw new Error('No valid funding account is available.');
      }

      cy.get(this.selectors.fromAccount)
        .select(String(accountId))
        .should('have.value', String(accountId));
    });

  }

  submit(): void {
  this.selectFundingAccount();
  UIActions.clickBySelector(this.selectors.submit);
}

  result() {
    return cy.get(this.selectors.result);
  }

 newAccountId(): Cypress.Chainable<string> {
  return cy.get(this.selectors.newAccountId)
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      const id = text.trim();

      expect(id, 'newly created account ID').not.to.be.empty;
      return id;
    });
}

 openActivityForNewAccount(): void {
  this.newAccountId().then((id) => {
    cy.visit(`/activity.htm?id=${encodeURIComponent(id)}`);
    cy.get('#rightPanel').should('be.visible');
  });
}
}

export default new OpenAccountPage();
