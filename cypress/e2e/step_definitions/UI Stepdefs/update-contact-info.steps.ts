import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import UpdateContactInfoPage from '../../../Pages/UI/update-contact-info.page';

Given('the user navigates to the Update Profile page', () => UpdateContactInfoPage.visit());
Then('the First Name input field is not empty', () => UpdateContactInfoPage.firstNameInput().invoke('val').should('not.be.empty'));
Then('the Last Name input field is not empty', () => UpdateContactInfoPage.lastNameInput().invoke('val').should('not.be.empty'));
When('the user updates the First Name to {string}', (value: string) => UpdateContactInfoPage.updateField('firstName', value));
When('the user updates the Last Name to {string}', (value: string) => UpdateContactInfoPage.updateField('lastName', value));
When('the user updates the Address to {string}', (value: string) => UpdateContactInfoPage.updateField('address', value));
When('the user updates the City to {string}', (value: string) => UpdateContactInfoPage.updateField('city', value));
When('the user updates the State to {string}', (value: string) => UpdateContactInfoPage.updateField('state', value));
When('the user updates the Zip Code to {string}', (value: string) => UpdateContactInfoPage.updateField('zipCode', value));
When('the user updates the Phone to {string}', (value: string) => UpdateContactInfoPage.updateField('phone', value));

Given('the user has updated their First Name to {string}', (value: string) => {
  UpdateContactInfoPage.updateField('firstName', value); UpdateContactInfoPage.submit();
  UpdateContactInfoPage.confirmation().should('contain.text', 'Profile Updated');
});
When('the user navigates away and returns to the Update Profile page', () => {
  cy.visit('/overview.htm'); UpdateContactInfoPage.visit();
});
Then('the First Name field contains {string}', (value: string) => UpdateContactInfoPage.firstNameInput().should('have.value', value));
