# Feature: Bill Payment
# User Story: US-06 — Bill Payment (UI)
# Page Object: Pages/UI/bill-pay.page.ts
# Step File: e2e/step definitions/UI Stepdefs/bill-pay.steps.ts
# Helper: utils/test-data.ts — billPayeeData()

@ui
Feature: Bill Payment
  As a logged-in customer
  I want to pay bills to a payee
  So that I can settle payments directly from my bank account

  Background:
    Given the user is logged in to ParaBank
    And the user navigates to the Bill Pay page

  # AC-06.1 — Page elements visible
  Scenario: Bill Pay page displays the required form elements
    Then the heading "Bill Pay" is visible
    And the payee name input is visible
    And the "Send Payment" button is visible

  # AC-06.2 — Successful bill payment
  Scenario: Pay a bill successfully with complete payee details
    When the user fills in the payee name "John Doe"
    And the user fills in the payee address "456 Pay Street", city "Paytown", state "NY", zip "10001"
    And the user fills in the payee phone "555-0200"
    And the user fills in the payee account number "12345"
    And the user confirms the account number "12345"
    And the user enters payment amount "50"
    And the user clicks the "Send Payment" button
    Then the confirmation message "Bill Payment Complete" is displayed

  # AC-06.3 — Empty form validation
  Scenario: Validation errors appear when form is submitted empty
    When the user clicks the "Send Payment" button without filling any fields
    Then at least one validation error is displayed

  Scenario Outline: Validation errors for invalid payee inputs
    When the user submits the bill pay form with "<field>" set to "<value>"
    Then a validation error is shown

    Examples:
      | field          | value   |
      | payee name     | (empty) |
      | account number | abc     |
      | amount         | -10     |
