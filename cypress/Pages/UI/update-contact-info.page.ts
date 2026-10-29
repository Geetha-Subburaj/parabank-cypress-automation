import UIActions from '../../support/utils/ui-actions';

class UpdateContactInfoPage {
  private readonly fields = {
    firstName: "#customer\\.firstName",
    lastName: "#customer\\.lastName",
    address: "#customer\\.address\\.street",
    city: "#customer\\.address\\.city",
    state: "#customer\\.address\\.state",
    zipCode: "#customer\\.address\\.zipCode",
    phone: "#customer\\.phoneNumber",
    submit: "#rightPanel input[type='button'][value='Update Profile'], #rightPanel input[type='submit'][value='Update Profile']",
  };
  visit(): void {
     UIActions.clickLinkByText('Update Contact Info'); 
    }
  heading() { 
    return cy.get('#rightPanel h1, #rightPanel h2').filter(':visible');
   }
  firstNameInput() { 
    return cy.get(this.fields.firstName); }
  lastNameInput() { return cy.get(this.fields.lastName);

   }
  updateField(field: keyof Omit<typeof this.fields, 'submit'>, value: string): void { 
    UIActions.typeText(this.fields[field], value); 
  }
  submit(): void {
     UIActions.clickBySelector(this.fields.submit); 
    }
  confirmation() { 
    return cy.get('#rightPanel'); 
  }
}
export default new UpdateContactInfoPage();
