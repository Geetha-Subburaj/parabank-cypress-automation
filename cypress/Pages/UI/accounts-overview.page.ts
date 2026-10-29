import UIActions from '../../support/utils/ui-actions';
class AccountsOverviewPage {
  private readonly selectors = { heading: '#rightPanel h1, #rightPanel h2', accountLinks: '#accountTable a[href*="activity.htm?id="], #accountTable tbody a', totalBalance: '#accountTable tfoot td', detailId: '#accountId', detailBalance: '#balance' };
  visit(): void
   { 
    UIActions.clickLinkByText('Accounts Overview');
   }
  heading() {
     return cy.get(this.selectors.heading).filter(':visible');
     }
  accountLinks() {
     return cy.get(this.selectors.accountLinks).filter(':visible'); 
    }
  clickFirstAccount(): void {
     this.accountLinks().first().click(); 
    }
  firstAccountId(): Cypress.Chainable<string>
   { 
    return this.accountLinks().first().invoke('text').then(t => t.trim());
   }
  totalBalanceCell() 
  { return cy.get(this.selectors.totalBalance).filter(':visible');

   }
  displayedAccountId() { 
    return cy.get('#rightPanel').then($p => { const direct=$p.find('#accountId'); if(direct.length) return Cypress.$(direct).text().trim(); const text=$p.text(); const match=text.match(/Account Number:\s*(\d+)/i); return match?.[1] ?? ''; }); }
  currentAccountBalance() { return cy.get('#rightPanel').then($p => { const direct=$p.find('#balance'); if(direct.length) return Cypress.$(direct).text().trim(); const match=$p.text().match(/Balance:\s*\$?([\d,.]+)/i); return match?.[1] ?? ''; }); }
}
export default new AccountsOverviewPage();
