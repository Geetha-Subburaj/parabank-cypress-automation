import UIActions from '../../support/utils/ui-actions';

export interface RegistrationUser {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;
}

class RegisterPage {
  private readonly fields = {
    firstName: "[id='customer.firstName']",
    lastName: "[id='customer.lastName']",
    address: "[id='customer.address.street']",
    city: "[id='customer.address.city']",
    state: "[id='customer.address.state']",
    zipCode: "[id='customer.address.zipCode']",
    phone: "[id='customer.phoneNumber']",
    ssn: "[id='customer.ssn']",
    username: "[id='customer.username']",
    password: "[id='customer.password']",
    confirmPassword: "[id='repeatedPassword']",
    submit: "input[value='Register']",
  };

  visit(): void { cy.visit('/register.htm'); }

  fillRegistrationForm(user: RegistrationUser, blankField?: keyof RegistrationUser): void {
    const values: Record<keyof RegistrationUser, string> = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
      phone: user.phone,
      ssn: user.ssn,
      username: user.username,
      password: user.password,
    };

    (Object.keys(values) as Array<keyof RegistrationUser>).forEach((key) => {
      const selector = this.fields[key];
      cy.get(selector).clear();
      if (key !== blankField && values[key]) UIActions.typeText(selector, values[key]);
    });

    cy.get(this.fields.confirmPassword).clear();
    if (blankField !== 'password' && user.password) UIActions.typeText(this.fields.confirmPassword, user.password);
  }

  clickRegister(): void { UIActions.clickBySelector(this.fields.submit); }
  getErrorMessages() { return cy.get('.error'); }
  verifyFieldError(errorSelector: string): void { cy.get(errorSelector).should('be.visible'); }
  verifyUsernameError(): void { cy.get("[id='customer.username.errors']").should('be.visible'); }
}
export default new RegisterPage();
