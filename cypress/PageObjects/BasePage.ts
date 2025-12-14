import { LocatorResult } from "cypress/Utility/ActionsInterface";

/**
 * BasePage
 * 
 * A base class that implements the Page Object Model pattern for test automation.
 * This class provides a centralized mechanism for resolving element locators by key,
 * supporting both CSS selectors and XPath expressions.
 * 
 * Usage:
 * Subclasses should override getCSSLocators() and getXPathLocators() to define
 * page-specific element selectors. The Locators() method then retrieves the
 * appropriate selector and its type for a given key.
 * 
 * Example:
 * ```
 * class LoginPage extends BasePage {
 *   protected static getCSSLocators() {
 *     return {
 *       'loginButton': '#btn-login',
 *       'emailField': 'input[type="email"]'
 *     };
 *   }
 * }
 * 
 * // Usage
 * const locator = LoginPage.Locators('loginButton');
 * ```
 */
export class BasePage {
  /**
   * Locators
   * 
   * Static method that resolves an element locator by key name.
   * Searches first in CSS selectors, then in XPath expressions.
   * 
   * @param {string} loc - The locator key to look up (e.g., 'loginButton', 'emailField')
   * @returns {LocatorResult} An object containing the selector string and its type ('CSS' or 'XPATH')
   * @throws {Error} If the locator key is not found in either CSS or XPath selectors
   * 
   * Example:
   * ```
   * const result = MyPage.Locators('submitButton');
   * // Returns: { selector: '#submit-btn', type: 'CSS' }
   * ```
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

  /**
   * getCSSLocators
   * 
   * Protected static method that returns a mapping of locator keys to CSS selectors.
   * Should be overridden in subclasses to define CSS-based element selectors for the page.
   * 
   * @returns {Record<string, string>} A key-value object where keys are locator names
   *          and values are CSS selector strings
   * 
   * Example:
   * ```
   * protected static getCSSLocators() {
   *   return {
   *     'headerTitle': 'h1.page-title',
   *     'submitButton': 'button[type="submit"]'
   *   };
   * }
   * ```
   */
  protected static getCSSLocators(): Record<string, string> {
    return {};
  }

  /**
   * getXPathLocators
   * 
   * Protected static method that returns a mapping of locator keys to XPath expressions.
   * Should be overridden in subclasses to define XPath-based element selectors for the page.
   * Use XPath when CSS selectors are insufficient or for complex element identification.
   * 
   * @returns {Record<string, string>} A key-value object where keys are locator names
   *          and values are XPath expression strings
   * 
   * Example:
   * ```
   * protected static getXPathLocators() {
   *   return {
   *     'dynamicButton': "//button[contains(text(), 'Click Me')]",
   *     'menuItem': "//li[@class='menu-item' and position()=1]"
   *   };
   * }
   * ```
   */
  protected static getXPathLocators(): Record<string, string> {
    return {};
  }
}
