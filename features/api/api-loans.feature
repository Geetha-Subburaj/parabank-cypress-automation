# Feature: Loans REST API
# User Story: US-14 — Loans REST API
# Api utils: Pages/API/api-client.ts
# Step File: e2e/step definitions/API Stepdefs/api-common.steps.ts

@api

Feature: Loans REST API
  As an API consumer
  I want to request a loan via API
  So that loan processing can be validated programmatically

  Background:
    Given a valid customer is logged in via the API
    And the customerId and a source accountId are stored for subsequent requests

  # AC-14.1 — Loan request returns approved boolean
  Scenario: Request a loan with a reasonable amount and down payment
    When a POST request is sent to "requestLoan?customerId={customerId}&amount=500&downPayment=100&fromAccountId={accountId}"
    And the "Accept: application/json" header is set
    Then the response status is 200
    And the response body contains an "approved" field of type boolean

  # AC-14.2 — Loan response includes provider name
  Scenario: Loan response includes loanProviderName
    When a POST request is sent to "requestLoan?customerId={customerId}&amount=100&downPayment=10&fromAccountId={accountId}"
    And the "Accept: application/json" header is set
    Then the response body contains a "loanProviderName" field

  # AC-14.3 — Large loan with small down payment may be denied
  Scenario: Large loan with minimal down payment results in a boolean approved status
    When a POST request is sent to "requestLoan?customerId={customerId}&amount=999999&downPayment=1&fromAccountId={accountId}"
    And the "Accept: application/json" header is set
    Then the response body contains an "approved" field of type boolean
    And the "approved" field may be false for large loans with insufficient down payment

  Scenario: Approved loan creates a loan account when the request is approved
    When a POST request is sent to "requestLoan?customerId={customerId}&amount=100&downPayment=90&fromAccountId={accountId}"
    And the "Accept: application/json" header is set
    Then if the loan is approved, the response contains a loan account ID
