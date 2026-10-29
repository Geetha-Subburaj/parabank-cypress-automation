# Feature: Accounts Overview
# User Story: US-03 — Accounts Overview (UI)
# Page Object: Pages/UI/accounts-overview.page.ts
# Step File: e2e/step definitions/UI Stepdefs/accounts-overview.steps.ts

@ui
Feature: Accounts Overview
  As a logged-in customer
  I want to view a summary of all my bank accounts
  So that I can monitor balances at a glance

  Background:
    Given the user is logged in to ParaBank
  
  # AC-03.1 — Heading visible
  Scenario: Accounts Overview page displays the heading
    Then the heading "Accounts Overview" is visible

  # AC-03.2 — At least one account listed
  Scenario: At least one account is listed
    Then at least one account link is visible in the accounts table

  # AC-03.3 — Navigate to Account Details
  Scenario: Clicking an account link opens the Account Details page
    When the user clicks on the first account link
    Then the "Account Details" heading is visible on the destination page

  # AC-03.4 — Total balance row
  # PRACTICE TASK (Level 1 - #3): Add test to verify total balance cell is visible
  Scenario: Total balance cell is shown at the bottom of the accounts table
    Then the total balance cell in the accounts table footer is visible

  # Implemented practice scenarios
  Scenario: Account Details page shows the correct account ID
    When the user clicks on the first account link
    Then Account Details page shows the correct account ID

  Scenario: Account Details page shows current balance
    When the user clicks on the first account link
   Then Account Details page shows current balance
