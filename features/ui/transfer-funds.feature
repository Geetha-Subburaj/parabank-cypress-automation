# Feature: Transfer Funds
# User Story: US-05 — Transfer Funds (UI)
# Page Object: pages/transfer-funds.page.ts
# Step File: e2e/step definitions/UI Stepdefs/transfer-funds.steps.ts

@ui
Feature: Transfer Funds
  As a logged-in customer
  I want to transfer money between my accounts
  So that I can manage my funds

  Background:
    Given the user is logged in to ParaBank

  # AC-05.1 — Transfer Funds form loads
  Scenario: Transfer Funds page displays the required form elements
    When the user navigates to the Transfer Funds page
    Then the heading "Transfer Funds" is visible
    And the amount input field is visible
    And the "Transfer" button is visible

  # AC-05.2 — Successful fund transfer
  Scenario: Transfer funds between two accounts successfully
    Given the user has at least two bank accounts
    When the user navigates to the Transfer Funds page
    And the user enters "10" in the amount field
    And the user selects the first account as the source
    And the user selects the second account as the destination
    And the user clicks the "Transfer" button
    Then the heading "Transfer Complete" is displayed

  # AC-05.3 — Dropdowns are populated
  Scenario: Account dropdowns are populated from the customer's accounts
    When the user navigates to the Transfer Funds page
    Then the from-account dropdown contains at least one option
    And the to-account dropdown contains at least one option

  Scenario: Transfer reduces source balance and increases destination balance
    Given the user has two accounts with known balances
    When the user transfers "10.00" from account A to account B
    Then the source account balance decreases by 10.00
    And the destination account balance increases by 10.00
