/** Generic, page-agnostic Cypress interactions. Page objects own selectors and business actions. */
class UIActions {
  private matchingControls(label: string) {
  const normalizedLabel = label.trim();

  return cy
    .get('button, input[type="button"], input[type="submit"]')
    .filter((_index, element) => {
      const $element = Cypress.$(element);

      const text = $element.text().trim();
      const value = String($element.val() ?? '').trim();

      return text === normalizedLabel || value === normalizedLabel;
    });
}

  clickButtonByText(label: string): void {
    this.matchingControls(label).should('have.length', 1).and('be.visible').click();
  }
  assertButtonVisibleByText(label: string): void {
    this.matchingControls(label).should('have.length', 1).and('be.visible');
  }
  clickLinkByText(label: string): void {
    cy.contains('a', label).should('have.length', 1).and('be.visible').click();
  }
  clickText(label: string): void {
    cy.get('body').then(($body) => {
      const links = $body.find('a').filter((_, el) => Cypress.$(el).text().trim() === label);
      if (links.length === 1) { cy.wrap(links).click(); }
      else { this.clickButtonByText(label); }
    });
  }
  clickBySelector(selector: string): void { cy.get(selector).should('have.length', 1).and('be.visible').click(); }
  typeText(selector: string, value: string): void {
  cy.get(selector).should('be.visible').clear();

  if (value !== '') {
    cy.get(selector).type(value);
  }
}
  selectOption(selector: string, value: string): void { cy.get(selector).should('be.visible').select(value); }
}
export default new UIActions();
