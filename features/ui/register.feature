# Feature: User Registration
# User Story: US-02 — User Registration (UI)
# Page Object: Pages/UI/register.page.ts
# Step File: e2e/step definitions/UI Stepdefs/register.steps.ts
# Helper:utils/test-data.ts — generateTestUser()

@ui
Feature: User Registration
  As a new customer
  I want to register an account on ParaBank
  So that I can access banking services

  Background:
    Given the user is on the ParaBank registration page

  # AC-02.1 — Successful registration
  Scenario: Register a new user with all valid details
    When the user fills in all required registration fields with valid data
    And the user clicks the "Register" button
    Then a welcome or success message is displayed
    And the user is logged in automatically

  # AC-02.2 — Empty form validation
  Scenario: Validation errors shown when form is submitted empty
    When the user clicks the "Register" button without filling any fields
    Then validation error messages are displayed for each required field
    And the count of error messages is 10

  # AC-02.3 — Duplicate username
  Scenario: Error shown for duplicate username
    Given a user has already registered with username "existinguser"
    When a second registration is attempted with the same username "existinguser"
    Then an error message is displayed on the username field

  # AC-02.4 — All required fields
  Scenario Outline: Each required field shows a validation error when left empty
    When the user submits the registration form with "<field>" left blank
    Then a validation error is shown for the "<field>" field

    Examples:
      | field            |
      | First Name       |
      | Last Name        |
      | Address          |
      | City             |
      | State            |
      | Zip Code         |
      | Phone            |
      | SSN              |
      | Username         |
      | Password         |
