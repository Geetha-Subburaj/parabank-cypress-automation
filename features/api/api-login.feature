# Feature: Login API
# User Story: US-10 — Login API
# Api utils: Pages/API/api-client.ts
# Step File: e2e/step definitions/API Stepdefs/api-common.steps.ts

@api

Feature: Login REST API
  As an API consumer
  I want to authenticate via the ParaBank REST API
  So that I can obtain a customer ID for subsequent API operations

  # AC-10.1 — Successful API login
  Scenario: Login with valid credentials returns customer data
    Given the API base URL is configured
    When a GET request is sent to "login/{username}/{password}" with valid credentials
    And the "Accept: application/json" header is set
    Then the response status is 200
    And the response body contains a customer "id"
    And the response body contains "firstName"
    And the response body contains "lastName"

  # AC-10.2 — Invalid credentials return 400
  Scenario: Login with invalid credentials returns HTTP 400
    When a GET request is sent to "login/nonexistentuser/wrongpassword"
    And the "Accept: application/json" header is set
    Then the response status is 400
