import UIActions from '../../support/utils/ui-actions';

class FindTransactionsPage {
  private readonly fields = {
    amount: '#amount',
    date: '#transactionDate',
    fromDate: '#fromDate',
    toDate: '#toDate',
    transactionId: '#transactionId',
  };
  visit(): void 
  { UIActions.clickLinkByText('Find Transactions');

   }
  heading() { 
    return cy.get('#rightPanel h1, #rightPanel h2').filter(':visible');
   }
  enterAmount(value: string): void { 
    UIActions.typeText(this.fields.amount, value); 
  }
  enterDate(value: string): void {
     UIActions.typeText(this.fields.date, value);
     }
  enterFromDate(value: string): void 
  { UIActions.typeText(this.fields.fromDate, value);

   }
  enterToDate(value: string): void {
     UIActions.typeText(this.fields.toDate, value);
     }
  enterTransactionId(value: string): void 
  { UIActions.typeText(this.fields.transactionId, value);
    
   }
  findByAmount(): void {
  UIActions.clickBySelector('#findByAmount');
}

findByDate(): void {
  UIActions.clickBySelector('#findByDate');
}

findByDateRange(): void {
  UIActions.clickBySelector('#findByDateRange');
}

findById(): void {
  UIActions.clickBySelector('#findById');
}
  resultsArea() { return cy.get('#rightPanel'); }
  transactionRows() { return cy.get('#transactionTable tbody tr'); }
  firstTransactionId(): Cypress.Chainable<string> {
    return this.transactionRows().first().find('a').first().invoke('text').then((text) => text.trim());
  }
}
export default new FindTransactionsPage();
