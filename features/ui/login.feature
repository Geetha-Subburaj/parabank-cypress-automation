# Feature: User Login
# User Story: US-01 — User Authentication (UI)
# Page Object: Pages/UI/login.page.ts
# Step File: e2e/step definitions/UI Stepdefs/login.steps.ts

@ui
Feature: User Login
  As a bank customer
  I want to log in to the ParaBank portal
  So that I can securely access my accounts

  Background:
    Given the user is on the ParaBank login page

  # AC-01.1 — Happy path login
  Scenario: Successful login with valid credentials
    When the user enters valid username and password
    And the user clicks the "Log In" button
    Then the user is redirected to the Accounts Overview page
    And the heading "Accounts Overview" is visible

  # AC-01.2 — Invalid credentials
  Scenario: Failed login with invalid credentials
    When the user enters an invalid username "invaliduser"
    And the user enters an invalid password "wrongpassword"
    And the user clicks the "Log In" button
    Then an error message containing "could not be verified" is displayed

  # AC-01.3 — Navigation to registration
  Scenario: Navigate to the registration page
    When the user clicks the "Register" link
    Then the browser URL contains "register.htm"

  # AC-01.4 — Forgot login info link
  Scenario: Forgot login info link is visible
    Then the "Forgot login info?" link is visible on the login page

  Scenario: Forgot login info link navigates correctly
    When the user clicks "Forgot login info?"
    Then the user is navigated to the lookup page
