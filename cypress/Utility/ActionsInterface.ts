/**
 * Minimal validation/interaction contract used by tests.
 * Implementations provide a way to locate elements and perform
 * common actions/assertions (text check, typing, clicking, etc).
 */
export interface ActionsInterface {
  fieldContains(locator: string, text: string): void;
  enterText(locator: string, text: string): void;
  click(locator: string): void;
  shouldBeVisible(locator: string): void;
  shouldNotExist(locator: string): void;
  selectOption(locator: string, value: string): void;
}

// Strongly-typed selector kinds to avoid magic strings throughout the codebase.
export type SelectorKind = "CSS" | "XPATH";

// Strongly-typed action kinds to avoid magic strings throughout the codebase.
export enum ActionKind {
  FieldContains = 'fieldContains',
  EnterText = 'enterText',
  Click = 'click',
  ShouldBeVisible = 'shouldBeVisible',
  ShouldNotExist = 'shouldNotExist',
  SelectOption = 'selectOption',
}

/**
 * Return shape for page object locator methods. Page objects should return
 * this shape rather than mutating globals.
 */
export interface LocatorResult {
  selector: string;
  type: SelectorKind;
}
/**
 * Generic base implementation that centralizes the common interaction
 * patterns used in the concrete actions. It accepts a `selectFn` which
 * is responsible for locating elements (for example `cy.get` or `cy.xpath`).
 */
export class BaseActions implements ActionsInterface {
  // Function that given a locator returns a Cypress chainable for the element.
  private selectFn: (locator: string) => Cypress.Chainable<JQuery<HTMLElement>>;
  // Optional label used for nicer log messages (e.g. 'css' or 'xpath').
  private label?: string;

  constructor(selectFn: (locator: string) => Cypress.Chainable<JQuery<HTMLElement>>, label?: string) {
    this.selectFn = selectFn;
    this.label = label;
  }

  fieldContains(locator: string, text: string): void {
    cy.log(`${this.label ?? 'Locator'} is: ${locator}`);
    this.selectFn(locator)
      .scrollIntoView()
      .should('have.text', text);
  }

  enterText(locator: string, text: string): void {
    cy.log(`Typing into${this.label ? ' (' + this.label + ')' : ''}: ${locator}`);
    this.selectFn(locator)
      .scrollIntoView()
      .clear()
      .type(text);
  }

  click(locator: string): void {
    cy.log(`Clicking${this.label ? ' (' + this.label + ')' : ''}: ${locator}`);
    this.selectFn(locator)
      .scrollIntoView()
      .click();
  }

  shouldBeVisible(locator: string): void {
    cy.log(`Checking visibility${this.label ? ' (' + this.label + ')' : ''}: ${locator}`);
    this.selectFn(locator)
      .scrollIntoView()
      .should('be.visible');
  }

  shouldNotExist(locator: string): void {
    cy.log(`Checking does not exist${this.label ? ' (' + this.label + ')' : ''}: ${locator}`);
    this.selectFn(locator)
      .should('not.exist');
  }

  selectOption(locator: string, value: string): void {
    cy.log(`Selecting option${this.label ? ' (' + this.label + ')' : ''}: ${locator} -> ${value}`);
    this.selectFn(locator)
      .scrollIntoView()
      .then(($el) => {
        // For native select elements, try to select by value or text
        if ($el.is('select')) {
          // Check if option with this value exists, otherwise find by text
          const $option = $el.find(`option[value="${value}"]`);
          if ($option.length > 0) {
            cy.wrap($el).select(value, { force: true });
          } else {
            // Try to find option by text content
            cy.wrap($el).find('option').contains(value, { matchCase: false }).then(($option) => {
              cy.wrap($el).select($option.val() as string, { force: true });
            });
          }
        } else {
          // For custom dropdowns, click and then find the option
          cy.wrap($el).click({ force: true });
          cy.get('[role="option"]').contains(new RegExp(`^${value}$`, 'i')).click({ force: true });
        }
      });
  }
}

/**
 * Concrete validator for CSS selectors. It simply passes `cy.get` into
 * the base validator so all behavior (logging, scroll, actions, assertions)
 * is shared.
 */
export class CssActions extends BaseActions {
  constructor() {
    super((locator: string) => cy.get(locator), 'css');
  }
}

/**
 * Concrete validator for XPath selectors. Requires `cypress-xpath` plugin
 * to be installed/configured in the project. It passes `cy.xpath` into
 * the base validator so the same DRY behavior is used for XPath locators.
 */
export class XpathActions extends BaseActions {
  constructor() {
    super((locator: string) => cy.xpath(locator), 'xpath');
  }
}
