# Feature: Find Transactions
# User Story: US-07 — Find Transactions (UI)
# Page Object: Pages/UI/find-transactions.page.ts
# Step File: e2e/step definitions/UI Stepdefs/find-transactions.steps.ts

@ui
Feature: Find Transactions
  As a logged-in customer
  I want to search for transactions on my account
  So that I can review and verify past activity

  Background:
    Given the user is logged in to ParaBank
    And the user navigates to the Find Transactions page

  # AC-07.1 — Page loads correctly
  Scenario: Find Transactions page displays the search form
    Then the heading "Find Transactions" is visible

  # AC-07.2 — Search by amount
  Scenario: Search transactions by a specific amount
    When the user enters "100" in the amount search field
    And the user clicks "Find Transactions"
    Then either a results table is shown or the text "No transactions found" is visible

  # AC-07.3 — Search by exact date
  Scenario: Search transactions by today's date
    When the user enters today's date in the date search field
    And the user clicks "Find Transactions"
    Then either a results table is shown or the text "No transactions found" is visible

  # AC-07.4 — Search by transaction ID
  Scenario: Search transactions by a valid transaction ID
    When the user enters a valid transaction ID in the ID search field
    And the user clicks "Find Transactions"
    Then either the matching transaction details are shown or an error message is visible

  # AC-07.5 — Search by date range
  # PRACTICE TASK (Level 2 - #4): Add date-range test spanning the last 7 days
  Scenario: Search transactions by a date range spanning the last 7 days
    When the user enters the date from "7 days ago" in the from-date field
    And the user enters today's date in the to-date field
    And the user clicks "Find Transactions"
    Then either a results table is shown or the text "No transactions found" is visible

  Scenario: No results message is displayed for an amount with no transactions
    When the user enters "0.01" in the amount search field
    And the user clicks "Find Transactions"
    Then the transaction results table should be displayed
    And no transaction records should be displayed
