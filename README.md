# ParaBank Cypress Automation Framework

A maintainable end-to-end automation framework for the ParaBank sample banking application, built with **Cypress**, **TypeScript**, and **BDD Cucumber**. The project separates business-readable Gherkin scenarios from step definitions, page objects, reusable UI actions, and reporting utilities.

## Table of Contents

- [Overview]
- [Application Coverage]
- [Technology Stack]
- [Framework Structure]
- [Prerequisites]
- [Installation and Setup]
- [Environment Configuration]
- [Running Tests]
- [Reporting and Debugging]
- [Framework Design]

## Overview

ParaBank is a sample online banking application used to practise and demonstrate common banking workflows. This framework automates selected UI and API behaviours using Cypress and TypeScript, with Gherkin feature files processed by the `@badeball/cypress-cucumber-preprocessor`.

The framework is designed to support readable scenarios, reusable page-level actions, centralised configuration, and reviewable execution reports.

## Application Coverage

### UI features

- Login
- Registration
- Accounts overview
- Open new account
- Transfer funds
- Bill payment
- Find transactions
- Update contact information
- Request loan

### API features

- Login
- Accounts
- Customers
- Transactions
- Loans

> Feature files describe the intended coverage. Actual pass/fail results depend on the current application state, test data, and environment.

## Technology Stack

- **Cypress** — browser automation and test execution
- **TypeScript** — typed test and framework code
- **Cucumber / Gherkin** — behaviour-driven scenarios using `Given`, `When`, and `Then`
- **`@badeball/cypress-cucumber-preprocessor`** — connects `.feature` files to step definitions
- **`@bahmutov/cypress-esbuild-preprocessor` and `esbuild`** — feature/spec preprocessing
- **`dotenv`** — loads local environment variables
- **`multiple-cucumber-html-reporter`** — generates an HTML Cucumber report
- **Node.js and npm** — dependency and script management

## Framework Structure

The following is a logical overview of the main project folders. Use the actual directory names in the repository if they differ in capitalisation or spacing.

```text
parabank-cypress/
├── cypress/
│   ├── Pages/
│   │   ├── UI/                         # UI Page Object classes
│   │   └── API/                        # API client/helper
│   └── support/
│       ├── commands.ts                 # Custom Cypress commands
│       ├── commands.d.ts               # TypeScript command declarations
│       ├── e2e.ts                      # Global support setup
│       └── utils/                      # Reusable UI actions and helpers
├── cypress/e2e/step_definitions/
│   ├── UI Stepdefs/                    # UI Cucumber step definitions
│   ├── API Stepdefs/                   # API Cucumber step definitions
│   └── hooks.ts                        # Tagged Before/After hooks
├── features/
│   ├── ui/                             # UI Gherkin feature files
│   └── api/                            # API Gherkin feature files
├── scripts/
│   ├── run-tests-with-report.cjs       # Test runner/report orchestration
│   └── generate-cucumber-report.cjs    # HTML report generation
├── reports/
│   ├── cucumber/                       # Cucumber JSON output
│   └── html/                           # Generated HTML report
├── cypress.config.ts                   # Cypress and preprocessor configuration
├── .env                                # Local environment values (do not commit)
├── .env.example                        # Environment-variable template (recommended)
├── package.json                        # Dependencies and npm scripts
└── .gitignore                          # Ignored files and generated artifacts
```

## Prerequisites

Install the following before running the framework:

1. **Node.js** — use a version supported by the installed Cypress version.
2. **npm** — included with Node.js.
3. **Git** — optional, if cloning or version-controlling the repository.
4. Access to the ParaBank application and valid test credentials for the configured account.

Check your installed versions:

```bash
node --version
npm --version
```

## Installation and Setup

1. Open a terminal in the project root.
2. Install project dependencies:

   ```bash
   npm install
   ```

3. Create a local `.env` file in the project root using the variable names below.
4. Confirm the base URLs and test credentials are valid for the environment you intend to test.
5. Check that `cypress.config.ts` loads the environment configuration and that the Cucumber preprocessor is configured.

Open the Cypress interactive runner:

```bash
npx cypress open
```

Run tests in headless mode:

```bash
npx cypress run
```

## Environment Configuration

Configure environment-specific values in `.env`. Do not place real credentials in feature files, source code, README examples, or version control.

Example `.env.example`:

```dotenv
PARABANK_BASE_URL=https://parabank.parasoft.com/parabank
PARABANK_API_BASE_URL=https://parabank.parasoft.com/parabank
PARABANK_USERNAME=replace_with_test_username
PARABANK_PASSWORD=replace_with_test_password
```

Use the exact API base URL expected by your API client. If the framework uses a different API endpoint or path, update the value accordingly.

The configured login command reads `PARABANK_USERNAME` and `PARABANK_PASSWORD` through Cypress's `cy.env()` API. Ensure the values are available to Cypress using the configuration approach implemented in this repository.

Recommended `.gitignore` entries:

```gitignore
.env
node_modules/
cypress/screenshots/
cypress/videos/
reports/cucumber/
reports/html/
```

Adjust the report exclusions if generated reports are intentionally tracked or shared with the team.

## Running Tests

### Run the complete suite

```bash
npm test
```

or:

```bash
npx cypress run
```

### Run one feature file with the project report script

```bash
npm run test:feature -- "features/ui/login.feature"
```

Example for the Open New Account feature:

```bash
npm run test:feature -- "features/ui/open-account.feature"
```

### Run a selected group of feature files

Cypress accepts a comma-separated list of spec paths:

```bash
npx cypress run --spec "features/ui/login.feature,features/ui/open-account.feature"
```

Run all UI features:

```bash
npx cypress run --spec "features/ui/**/*.feature"
```

Run all API features:

```bash
npx cypress run --spec "features/api/**/*.feature"
```

The custom `test:feature` runner may accept only one feature path unless it has been updated to parse multiple paths. Use the direct Cypress `--spec` command for a selected group unless the runner's implementation confirms multi-path support.

### Generate or regenerate the HTML report

```bash
npm run report:html
```

This generates the report from the Cucumber JSON output already present. Run tests first to refresh the results.

> The scripts and paths above reflect the project setup described for this framework. If a local `package.json` or `cypress.config.ts` differs, use the commands and paths defined in the checked-in files.

## Reporting and Debugging

The framework uses Cucumber JSON output as input for HTML report generation.

- **HTML Cucumber report:** `reports/html/index.html`
- **Cucumber JSON output:** `reports/cucumber/cucumber-report.json`
- **Failure screenshots:** `cypress/screenshots/`
- **Run videos:** `cypress/videos/`

The HTML report provides a navigable view of feature/scenario execution, scenario status, and timing/details included in the generated report. Screenshots and videos can help diagnose failures and confirm the point of failure.

Typical workflow:

1. Run the required feature or test suite.
2. Review the terminal summary for pass/fail counts.
3. Open `reports/html/index.html` in a browser.
4. For failed scenarios, inspect the corresponding screenshot and the run video.
5. Re-run the affected feature after correcting the root cause.

Generated report contents represent the most recent execution that wrote the configured output files. Preserve or archive reports separately if historical results are needed.

## Framework Design

### Behaviour-driven development

Feature files use Gherkin to describe expected behaviour in business-readable terms. Step definitions connect each step to framework methods and Cypress commands.

### Page Object Model

UI page objects keep page-specific selectors and actions in one place. This helps avoid duplicating selectors across step definitions and makes maintenance easier when the UI changes.

### Reusable UI actions

Common operations are centralised in reusable utilities, for example typing into fields, selecting dropdown options, and clicking controls.

### Custom commands

The `loginAsConfiguredUser` Cypress custom command encapsulates the configured-user login flow. Its TypeScript declaration is maintained in `commands.d.ts`.

### Hooks

Cucumber `Before` and `After` hooks can perform tagged UI/API setup and execution logging. Keep setup specific to the relevant scenario type; avoid browser navigation in global hooks where it would interfere with API scenarios.

### Cypress configuration

The Cypress configuration controls feature discovery, Cucumber/esbuild integration, environment handling, viewport, timeouts, retries, test isolation, screenshots, and videos. Review `cypress.config.ts` for the exact values configured in this repository.

## Troubleshooting

### A feature file is not discovered

- Check that the file ends with `.feature`.
- Confirm it is located under the configured `specPattern`.
- Confirm the path and letter case match the actual directory names.

### A Cucumber step definition is missing

- Check the wording of the `Given`, `When`, or `Then` step against the registered step definition.
- Confirm the step-definition file is inside a path discovered by the Cucumber preprocessor.
- Avoid duplicate generic step definitions that match the same expression.

### A UI test fails on a selector

- Inspect the live DOM and verify the selector.
- Confirm the element is visible and enabled before interacting with it.
- Prefer stable IDs or attributes over brittle positional selectors.

### An application JavaScript exception occurs

- Inspect the browser console and Network tab.
- Determine whether the application request failed or the UI interaction triggered an application defect.
- Do not broadly suppress uncaught exceptions to make a failing test pass; only handle a known, understood exception when there is a documented reason.

### The HTML report is missing or stale

- Confirm the test run produced the expected Cucumber JSON file.
- Run `npm run report:html` after a test execution.
- Check the output paths and errors printed by the report-generation script.

## Security Notes

- Never commit `.env`, passwords, access tokens, or personal data.
- Use dedicated test accounts and non-production data.
- Confirm that screenshots, videos, and reports do not expose credentials or sensitive data before sharing them.
- Review the generated report and repository ignore rules before committing or distributing the framework.
