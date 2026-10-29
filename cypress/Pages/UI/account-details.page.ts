
class AccountDetailsPage {
  private accountId = "#accountId";
  private balance = "#balance";

 
 verifyAccountIdIsDisplayed(): void {
    cy.get(this.accountId)
      .should("be.visible")
      .should(($element) => {
        expect($element.text().trim()).not.to.be.empty;
      });
  }

  verifyCurrentBalanceIsDisplayed(): void {
    cy.get(this.balance)
      .should("be.visible")
      .should(($element) => {
        expect($element.text().trim()).not.to.be.empty;
      });
  }

  }


export default new AccountDetailsPage();
