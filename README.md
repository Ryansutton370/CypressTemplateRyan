# Cypress Test Automation Template

A comprehensive Cypress test automation framework using the Page Object Model (POM) pattern with Cucumber/Gherkin BDD syntax for both UI and API testing.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CodeQL](https://github.com/Ryansutton370/CypressTemplateRyan/workflows/CodeQL%20Analysis/badge.svg)](https://github.com/Ryansutton370/CypressTemplateRyan/actions?query=workflow%3A%22CodeQL+Analysis%22)

## Table of Contents

- [Overview](#overview)
- [Contributing](#contributing)
- [Project Structure](#project-structure)
- [Architecture & Patterns](#architecture--patterns)
- [Getting Started](#getting-started)
- [How to Add New Tests](#how-to-add-new-tests)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Security](#security)
- [Code of Conduct](#code-of-conduct)
- [License](#license)

## Overview

This template provides a structured approach to test automation with:
- **Page Object Model (POM)** for maintainable UI element management
- **Cucumber/Gherkin** for readable, BDD-style test scenarios
- **Reusable step definitions** for common test actions
- **API testing capabilities** with CRUD operations
- **Data-driven testing** support via fixtures
- **TypeScript** for type safety and better IDE support

## Contributing

**This repository is public and forkable!** We welcome contributions from the community. The `main` branch is protected and requires pull requests with code review and passing CI checks.

### Quick Contribution Workflow

1. **Fork** this repository to your GitHub account
2. **Clone** your fork locally: `git clone https://github.com/YOUR-USERNAME/CypressTemplateRyan.git`
3. **Create a branch** for your changes: `git checkout -b feature/your-feature-name`
4. **Make your changes** and commit with signoff: `git commit -s -m "feat: your change"`
5. **Push** to your fork: `git push origin feature/your-feature-name`
6. **Open a Pull Request** from your fork to this repository's `main` branch

### Branch Protection

The `main` branch is protected and requires:
- Pull requests for all changes (no direct pushes)
- At least 1 approving review from code owners
- All CI status checks to pass (including CodeQL analysis)
- **Administrators must follow the same rules** - no exceptions

### More Information

- 📖 **Detailed contributing guide**: [CONTRIBUTING.md](CONTRIBUTING.md)
- 🔒 **Security policy**: [SECURITY.md](SECURITY.md)
- 📜 **Code of Conduct**: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

## Project Structure

```
CypressTemplateRyan/
├── cypress/
│   ├── PageObjects/           # Page Object classes
│   │   ├── BasePage.ts        # Base class for all page objects
│   │   ├── AutomationTestHomePage.ts
│   │   └── WikipediaPage.ts
│   ├── Utility/               # Utility classes and actions
│   │   ├── ActionsInterface.ts    # Action interfaces and implementations
│   │   ├── CommonActions.ts       # Common UI actions
│   │   ├── CRUDActions.ts         # API CRUD operations
│   │   └── LocatorService.ts      # Locator resolution service
│   ├── support/
│   │   └── step_definitions/  # Cucumber step definitions
│   │       ├── Common.ts      # Common/reusable steps
│   │       ├── AutomationTestHomePageSteps.ts
│   │       └── BasicCRUDSteps.ts
│   ├── integration/
│   │   └── features/          # Cucumber feature files
│   │       ├── GUIElements.feature
│   │       ├── BasicCRUD.feature
│   │       └── LinkToWiki.feature
│   ├── fixtures/              # Test data files (JSON)
│   │   ├── RyanData.json
│   │   ├── EdgarData.json
│   │   └── KelseyData.json
│   └── plugins/               # Cypress plugins
├── cypress.config.ts          # Cypress configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── .env                       # Environment variables
```

### Directory Purposes

- **`PageObjects/`**: Contains Page Object classes that encapsulate element locators and page-specific logic
- **`Utility/`**: Shared utility classes for actions, validations, and service functions
- **`support/step_definitions/`**: Cucumber step definitions that bridge Gherkin syntax to implementation code
- **`integration/features/`**: Gherkin feature files describing test scenarios in plain language
- **`fixtures/`**: JSON files containing test data for data-driven testing

## Architecture & Patterns

### Page Object Model (POM)

The framework uses the Page Object Model pattern to separate test logic from page-specific implementation details. Each page is represented by a class that extends `BasePage`.

#### BasePage Pattern

All Page Objects extend the `BasePage` class, which provides a unified way to define and access element locators:

```typescript
export class BasePage {
  public static Locators(loc: string): LocatorResult {
    // Resolves locator key to { selector, type: 'CSS' | 'XPATH' }
  }
  
  protected static getCSSLocators(): Record<string, string> {
    // Override to define CSS selectors
  }
  
  protected static getXPathLocators(): Record<string, string> {
    // Override to define XPath selectors
  }
}
```

### Locator Service

The `LocatorService` automatically resolves which Page Object to use based on the current URL:

- URL-based automatic page detection
- Manual page override capability for complex navigation flows
- Centralized mapping of URL patterns to Page Objects

### Action Layers

The framework implements a layered action architecture:

1. **ActionsInterface**: Defines common action contracts (`click`, `enterText`, `shouldBeVisible`, etc.)
2. **BaseActions/CssActions/XpathActions**: Concrete implementations for CSS and XPath locators
3. **CommonActions**: High-level convenience methods used in step definitions
4. **CRUDActions**: Specialized actions for API testing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Environment Configuration

Configure your test environments in the `.env` file:

```bash
BASEURL=https://testautomationpractice.blogspot.com/
API_BASEURL=https://playground.mockoon.com
```

## How to Add New Tests

### 1. Adding a New Page Object

**Step 1**: Create a new Page Object class in `cypress/PageObjects/`

```typescript
import { BasePage } from "./BasePage";

export class MyNewPage extends BasePage {
  protected static getCSSLocators(): Record<string, string> {
    return {
      loginButton: '#btn-login',
      emailField: 'input[type="email"]',
      passwordField: 'input[type="password"]',
    };
  }

  protected static getXPathLocators(): Record<string, string> {
    return {
      submitButton: "//button[contains(text(), 'Submit')]",
      errorMessage: "//div[@class='error-message']",
    };
  }
}
```

**Step 2**: Register the Page Object in `LocatorService`

Edit `cypress/Utility/LocatorService.ts`:

```typescript
private static pageMap = new Map<string, any>([
  ["", AutomationTestHomePage],
  ["w", WikipediaPage],
  ["login", MyNewPage],  // Add your new page object
]);
```

The key should match a URL segment (e.g., `yoursite.com/login` → `"login"`)

### 2. Adding Reusable Step Definitions

Reusable steps go in `cypress/support/step_definitions/Common.ts`. For page-specific steps, create a new file.

**Example: Adding a new common step**

```typescript
// In Common.ts
Then("hover over {string}", (element: string) => {
  CommonActions.getLocator(element, ActionKind.Hover);
});
```

**Example: Adding a page-specific step**

```typescript
// In MyNewPageSteps.ts
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { CommonActions } from "cypress/Utility/CommonActions";

When("login with username {string} and password {string}", 
  (username: string, password: string) => {
    CommonActions.enterText("emailField", username);
    CommonActions.enterText("passwordField", password);
    CommonActions.click("loginButton");
  }
);
```

### 3. Creating a New Feature File

Create a `.feature` file in `cypress/integration/features/`:

```gherkin
Feature: User Login

Scenario: Successful login with valid credentials
  Given navigate to homepage
  When login with username "test@example.com" and password "password123"
  Then "welcomeMessage" should be visible
  And the URL contains "/dashboard"

Scenario Outline: Login with multiple users
  Given navigate to homepage
  When login with username "<Email>" and password "<Password>"
  Then "welcomeMessage" should be visible

  Examples:
    | Email              | Password    |
    | user1@example.com  | pass1       |
    | user2@example.com  | pass2       |
```

### 4. Adding a New Action Type (Advanced)

If you need a new type of action not covered by existing ones:

**Step 1**: Add to `ActionKind` enum in `ActionsInterface.ts`:

```typescript
export enum ActionKind {
  // ... existing actions
  Hover = 'hover',
}
```

**Step 2**: Implement in `ActionsInterface`:

```typescript
export interface ActionsInterface {
  // ... existing methods
  hover(locator: string): void;
}
```

**Step 3**: Implement in `BaseActions`:

```typescript
hover(locator: string): void {
  cy.log(`Hovering${this.label ? ' (' + this.label + ')' : ''}: ${locator}`);
  this.selectFn(locator)
    .scrollIntoView()
    .trigger('mouseover');
}
```

**Step 4**: Add handler in `CommonActions.action()`:

```typescript
const handlers: Record<ActionKind, (act: ActionsInterface) => void> = {
  // ... existing handlers
  [ActionKind.Hover]: (act: ActionsInterface) => {
    cy.log("Hover action using: " + selectorType);
    act.hover(Locator);
  },
};
```

**Step 5**: Add convenience method in `CommonActions`:

```typescript
public static hover(Locator: string): void {
  this.getLocator(Locator, ActionKind.Hover);
}
```

## Configuration

### Cypress Configuration (`cypress.config.ts`)

```typescript
export default defineConfig({
  chromeWebSecurity: false,
  pageLoadTimeout: 10000,
  defaultCommandTimeout: 10000,
  e2e: {
    specPattern: "cypress/integration/**/features/*.feature",
    experimentalRunAllSpecs: true,
  },
});
```

### Test Data Fixtures

Create JSON files in `cypress/fixtures/` for data-driven testing:

```json
{
  "name": "Ryan Test",
  "email": "RyanEmail@test.com",
  "phone": "1231231234",
  "address": "123 Test Address",
  "gender": "MaleRadioButton",
  "days": "Monday, Tuesday, Friday",
  "country": "japan",
  "color": "green",
  "animal": "dog"
}
```

Use in step definitions:

```typescript
When("fill out homepage form with {string} data", (fixtureName: string) => {
  cy.fixture(fixtureName).then((customer) => {
    CommonActions.enterText("NameInput", customer.name);
    CommonActions.enterText("EmailInput", customer.email);
    // ... etc
  });
});
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests Headlessly

```bash
npx cypress run
```

### Open Cypress Test Runner (Interactive)

```bash
npx cypress open
```

### Run Specific Feature File

```bash
npx cypress run --spec "cypress/integration/features/GUIElements.feature"
```

## Common Patterns

### Using Override for Complex Navigation

When the URL doesn't directly map to your page object:

```gherkin
Given navigate to homepage
And override page object to "WikipediaPage"
When click on "WikipediaSearchButton"
Then stop overriding page object
```

### API + GUI Integration

Fetch data from an API and use it to populate GUI forms:

```gherkin
When fetch customer data from API endpoint "/customers"
Then fill out homepage form with the fetched API data
```

### Data-Driven Testing

Use Scenario Outline with Examples for multiple test cases:

```gherkin
Scenario Outline: Test with multiple data sets
  Given navigate to homepage
  When fill out homepage form with "<TestData>" data
  Then form should be valid

  Examples:
    | TestData    |
    | RyanData    |
    | EdgarData   |
    | KelseyData  |
```

## Best Practices

1. **Keep locators in Page Objects**: Never use raw selectors in step definitions
2. **Use descriptive locator keys**: `loginButton` is better than `btn1`
3. **Prefer CSS selectors**: Use XPath only when necessary (complex DOM traversal)
4. **Keep step definitions atomic**: Each step should do one logical action
5. **Abstract repetitive flows**: Create helper functions or abstracted steps for common workflows
6. **Use fixtures for test data**: Keep test data separate from test logic
7. **Log important actions**: Use `cy.log()` for debugging and test reports

## Support

For issues or questions about this template:
- 📖 Check the [Contributing Guide](CONTRIBUTING.md)
- 🐛 [Open an issue](https://github.com/Ryansutton370/CypressTemplateRyan/issues/new/choose) using our templates
- 📚 Refer to the Cypress documentation:
  - [Cypress Documentation](https://docs.cypress.io/)
  - [Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)

## Security

Security is important to us. If you discover a security vulnerability, please report it privately through:
- GitHub Security Advisories (preferred): [Report a vulnerability](https://github.com/Ryansutton370/CypressTemplateRyan/security)
- Contact the repository owner: [@Ryansutton370](https://github.com/Ryansutton370)

For more information, see our [Security Policy](SECURITY.md).

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [@Ryansutton370](https://github.com/Ryansutton370).

## License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

Copyright (c) 2025 Ryansutton370
