# Feature: Accounts REST API
# User Story: US-11 — Accounts REST API
# Api utils: Pages/API/api-client.ts
# Step File: e2e/step definitions/API Stepdefs/api-common.steps.ts

@api
Feature: Accounts REST API
  As an API consumer
  I want to manage customer bank accounts via API
  So that I can create and retrieve account information programmatically

  Background:
    Given a valid customer is logged in via the API
    And the customerId is stored for subsequent requests

  # AC-11.1 — Get customer accounts
  Scenario: Retrieve all accounts for a customer
    When a GET request is sent to "customers/{customerId}/accounts"
    And the "Accept: application/json" header is set
    Then the response status is 200
    And the response body is a non-empty JSON array

  # AC-11.2 — Get account by ID
  Scenario: Retrieve a specific account by its ID
    Given the first account ID is obtained from the customer accounts list
    When a GET request is sent to "accounts/{accountId}"
    And the "Accept: application/json" header is set
    Then the response status is 200
    And the account "id" in the response matches the requested account ID
    And the account "customerId" matches the customer's ID

  # AC-11.3 — Create a Checking account
  Scenario: Create a new Checking account via API
    When a POST request is sent to "createAccount?customerId={customerId}&newAccountType=0&fromAccountId={accountId}"
    And the "Accept: application/json" header is set
    Then the response status is 200
    And the response body contains a new account "id"
    And the account "type" in the response is "CHECKING"

  # AC-11.4 — Create a Savings account
  Scenario: Create a new Savings account via API
    When a POST request is sent to "createAccount?customerId={customerId}&newAccountType=1&fromAccountId={accountId}"
    And the "Accept: application/json" header is set
    Then the response status is 200
    And the response body contains a new account "id"
    And the account "type" in the response is "SAVINGS"
