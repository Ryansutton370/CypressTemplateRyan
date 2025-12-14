import { LocatorResult } from "cypress/Utility/ActionsInterface";

/**
 * Base page object class that provides common locator resolution logic.
 * Subclasses define CSS and XPATH selector objects, and BasePage handles
 * the lookup and type resolution.
 */
export class BasePage {
  /**
   * Resolve a locator key to a selector and its type (CSS or XPATH).
   * Subclasses override getCSSLocators() and getXPathLocators() to provide
   * their specific selectors.
   */
  public static Locators(loc: string): LocatorResult {
    const cssLocators = this.getCSSLocators();
    const xpathLocators = this.getXPathLocators();

    if (cssLocators[loc]) {
      return { selector: cssLocators[loc], type: "CSS" } as LocatorResult;
    } else if (xpathLocators[loc]) {
      return { selector: xpathLocators[loc], type: "XPATH" } as LocatorResult;
    } else {
      throw new Error("Unable to find CSS or XPATH Locator: " + loc);
    }
  }

  /** Override this method to provide CSS selectors. */
  protected static getCSSLocators(): Record<string, string> {
    return {};
  }

  /** Override this method to provide XPath selectors. */
  protected static getXPathLocators(): Record<string, string> {
    return {};
  }
}
