# Feature: Customers REST API
# User Story: US-12 — Customers REST API
# Api utils: Pages/API/api-client.ts
# Step File: e2e/step definitions/API Stepdefs/api-common.steps.ts

@api

Feature: Customers REST API
  As an API consumer
  I want to retrieve and update customer profile data via API
  So that customer information can be managed programmatically

  Background:
    Given a valid customer is logged in via the API
    And the customerId is stored for subsequent requests

  # AC-12.1 — Get customer details
  Scenario: Retrieve customer details by customer ID
    When a GET request is sent to "customers/{customerId}"
    And the "Accept: application/json" header is set
    Then the response status is 200
    And the response body contains "id" matching the customerId
    And the response body contains "firstName"
    And the response body contains "lastName"

  # AC-12.2 — Customer has address info
  Scenario: Customer details include full address information
    When a GET request is sent to "customers/{customerId}"
    And the "Accept: application/json" header is set
    Then the response body contains a nested "address" object
    And the address contains "street"
    And the address contains "city"
    And the address contains "state"
    And the address contains "zipCode"

  # AC-12.3 — Update customer info
  Scenario: Update customer profile information via API
    When a POST request is sent to "customers/update/{customerId}" with updated profile fields:
      | field       | value        |
      | firstName   | APIUpdated   |
      | lastName    | TestUser     |
      | street      | 456 API St   |
      | city        | APIDelta     |
      | state       | NY           |
      | zipCode     | 10001        |
      | phoneNumber | 555-0001     |
    And the "Accept: application/json" header is set
    Then the response status is 200
