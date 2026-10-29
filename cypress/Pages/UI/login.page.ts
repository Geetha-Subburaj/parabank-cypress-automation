import UIActions from '../../support/utils/ui-actions';

class LoginPage {
  private readonly selectors = {
    username: 'input[name="username"]',
    password: 'input[name="password"]',
    loginButton: 'input[value="Log In"]',
    registerLink: 'a[href*="register.htm"]',
    forgotLoginLink: 'a[href*="lookup.htm"]',
    error: '.error',
  };

  visit(): void { cy.visit('/'); }
  enterUsername(username: string): void { UIActions.typeText(this.selectors.username, username); }
  enterPassword(password: string): void { UIActions.typeText(this.selectors.password, password); }
  clickLogin(): void { UIActions.clickBySelector(this.selectors.loginButton); }
  clickRegister(): void { UIActions.clickBySelector(this.selectors.registerLink); }
  clickForgotLoginInfo(): void { UIActions.clickBySelector(this.selectors.forgotLoginLink); }
  verifyLoginError(message: string): void { cy.get(this.selectors.error).should('be.visible').and('contain.text', message); }
  verifyForgotLoginVisible(): void { cy.contains('a', 'Forgot login info?').should('be.visible'); }
}
export default new LoginPage();
