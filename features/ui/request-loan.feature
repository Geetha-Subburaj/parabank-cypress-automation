# Feature: Request Loan
# User Story: US-09 — Request Loan (UI)
# Page Object: pages/request-loan.page.ts
# Step File: e2e/step definitions/UI Stepdefs/request-loan.steps.ts

@ui
Feature: Request Loan
  As a logged-in customer
  I want to apply for a loan
  So that I can receive financing from the bank

  Background:
    Given the user is logged in to ParaBank
    And the user navigates to the Request Loan page

  # AC-09.1 — Page loads correctly
  Scenario: Request Loan page displays the required form elements
    Then the heading "Apply for a Loan" is visible
    And the Loan Amount input is visible
    And the Down Payment input is visible
    And the "Apply Now" button is visible

  # AC-09.2 — Loan request processed
  Scenario: Submit a loan request with valid amount and down payment
    When the user enters loan amount "500"
    And the user enters down payment "100"
    And the user clicks "Apply Now"
    Then the heading "Loan Request Processed" is visible

  # AC-09.3 — Loan status visible
  Scenario: Loan approval status is displayed after submission
    When the user enters loan amount "100"
    And the user enters down payment "10"
    And the user clicks "Apply Now"
    Then the loan status element is visible indicating "Approved" or "Denied"

  Scenario: Large loan with minimal down payment returns a loan decision
    When the user enters loan amount "999999"
    And the user enters down payment "1"
    And the user clicks "Apply Now"
    Then the loan status element is visible indicating "Approved" or "Denied"

  Scenario: Approved loan creates a new account when approved
    When the user submits a loan request that is approved
    Then a new account ID is shown in the loan result when approved
