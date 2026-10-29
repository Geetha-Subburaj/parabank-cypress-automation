
import {
  Given,
  When,
  Then
} from "@badeball/cypress-cucumber-preprocessor";

import RegisterPage, {
  type RegistrationUser
} from "../../../Pages/UI/register.page";

interface RegistrationFixture {
  validUser: Omit<RegistrationUser, "username"> & {
    usernamePrefix: string;
  };
  duplicateUsername: string;
  requiredFields: Array<{
    name: string;
    key: keyof RegistrationUser;
    selector: string;
    errorSelector: string;
  }>;
}

let data: RegistrationFixture;
let currentUser: RegistrationUser;

function generateUsername(prefix: string): string {
  return `${prefix}${Date.now()}${Cypress._.random(100000, 999999)}`;
}

function createUser(username?: string): RegistrationUser {
  return {
    firstName: data.validUser.firstName,
    lastName: data.validUser.lastName,
    address: data.validUser.address,
    city: data.validUser.city,
    state: data.validUser.state,
    zipCode: data.validUser.zipCode,
    phone: data.validUser.phone,
    ssn: data.validUser.ssn,
    username: username ?? generateUsername(data.validUser.usernamePrefix),
    password: data.validUser.password
  };
}

beforeEach(() => {
  cy.fixture("registration-data.json").then((fixture: RegistrationFixture) => {
    data = fixture;
  });
});

Given("the user is on the ParaBank registration page", () => {
  RegisterPage.visit();
});

When("the user fills in all required registration fields with valid data", () => {
  currentUser = createUser();
  cy.log(`Generated username: ${currentUser.username}`);
  RegisterPage.fillRegistrationForm(currentUser);
});

Then("a welcome or success message is displayed", () => {
  cy.get("#rightPanel").should("be.visible").and("contain.text", "Welcome");
});

Then("the user is logged in automatically", () => {
  cy.url().should("include", "overview.htm");
});

When(
  'the user clicks the "Register" button without filling any fields',
  () => {
    RegisterPage.visit();
    RegisterPage.clickRegister();
  }
); 

Then("validation error messages are displayed for each required field", () => {
  RegisterPage.getErrorMessages().should("have.length.at.least", 1);
});

Then("the count of error messages is {int}", (count: number) => {
  RegisterPage.getErrorMessages().should("have.length", count);
});

Given("a user has already registered with a generated username", () => {
  currentUser = createUser();

  RegisterPage.visit();
  RegisterPage.fillRegistrationForm(currentUser);
  RegisterPage.clickRegister();

  cy.get("#rightPanel").should("contain.text", "Welcome");
});

When("a second registration is attempted with that username", () => {
  RegisterPage.visit();

  const secondUser = createUser(currentUser.username);
  RegisterPage.fillRegistrationForm(secondUser);
  RegisterPage.clickRegister();
});
Then("an error message is displayed on the username field", () => {
  RegisterPage.verifyUsernameError();
});

When(
  "the user submits the registration form with {string} left blank",
  (field: string) => {
    const fieldData = data.requiredFields.find((item) => item.name === field);

    if (!fieldData) {
      throw new Error(`No fixture configuration found for field: ${field}`);
    }

    currentUser = createUser();
    RegisterPage.visit();
    RegisterPage.fillRegistrationForm(currentUser, fieldData.key);
    RegisterPage.clickRegister();
  }
);

Then(
  "a validation error is shown for the {string} field",
  (field: string) => {
    const fieldData = data.requiredFields.find((item) => item.name === field);

    if (!fieldData) {
      throw new Error(`No fixture configuration found for field: ${field}`);
    }

    RegisterPage.verifyFieldError(fieldData.errorSelector);
  }
);
