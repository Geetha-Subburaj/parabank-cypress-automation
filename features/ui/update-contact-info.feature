# Feature: Update Contact Information
# User Story: US-08 — Update Contact Information (UI)
# Page Object: Pages/UI/update-contact-info.page.ts
# Step File: e2e/step definitions/UI Stepdefs/update-contact-info.steps.ts

@ui
Feature: Update Contact Information
  As a logged-in customer
  I want to update my profile contact information
  So that my account details remain current

  Background:
    Given the user is logged in to ParaBank
    And the user navigates to the Update Profile page

  # AC-08.1 — Profile form pre-filled
  Scenario: Update Profile page shows pre-populated first and last name
    Then the heading "Update Profile" is visible
    And the First Name input field is not empty
    And the Last Name input field is not empty

  # AC-08.2 — Successful profile update
  Scenario: Update all contact information fields successfully
    When the user updates the First Name to "Updated"
    And the user updates the Last Name to "Name"
    And the user updates the Address to "999 Updated Ave"
    And the user updates the City to "UpdateCity"
    And the user updates the State to "TX"
    And the user updates the Zip Code to "75001"
    And the user updates the Phone to "555-9999"
    And the user clicks "Update Profile"
    Then the confirmation message "Profile Updated" is displayed

  Scenario: Update only the phone number
    When the user updates the Phone to "555-1234"
    And the user clicks "Update Profile"
    Then the confirmation message "Profile Updated" is displayed

  Scenario: Updated profile data persists after re-opening the page
    Given the user has updated their First Name to "Persisted"
    When the user navigates away and returns to the Update Profile page
    Then the First Name field contains "Persisted"
