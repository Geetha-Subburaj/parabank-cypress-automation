# Feature: Open New Account
# User Story: US-04 — Open New Account (UI)
# Page Object: Pages/UI/open-account.page.ts
#Step File: e2e/step definitions/UI Stepdefs/open-account.steps.ts

@ui
Feature: Open New Account
  As a logged-in customer
  I want to open a new bank account (Checking or Savings)
  So that I can manage funds across multiple accounts

  Background:
    Given the user is logged in to ParaBank
    And the user navigates to the Open New Account page

  # AC-04.1 — Page loads correctly
  Scenario: Open New Account page is accessible
    Then the heading "Open New Account" is visible
    And the account type dropdown is present
    And the "Open New Account" button is present

  # AC-04.2 — Open a Checking account
  Scenario: Successfully open a new Checking account
    When the user selects account type "CHECKING"
    And the user clicks the "Open New Account" button
    Then the confirmation message contains "Account Opened"

  # AC-04.3 — Open a Savings account
  Scenario: Successfully open a new Savings account
    When the user selects account type "SAVINGS"
    And the user clicks the "Open New Account" button
    Then the confirmation message contains "Account Opened"

  # AC-04.4 — Navigate to new account's details
  Scenario: Navigating to the newly opened account's details page
    When the user selects account type "CHECKING"
    And the user clicks the "Open New Account" button
    And the confirmation message contains "Account Opened"
    When the user navigates to the activity page for the new account ID
    Then the heading "Account Details" is visible
    And the displayed account ID matches the newly created account
