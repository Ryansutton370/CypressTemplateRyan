import { WikipediaPage } from "cypress/PageObjects/Wikipedia";
import { WikiArticlePage } from "cypress/PageObjects/WikiArticlePage";
import { HomestarPage } from "cypress/PageObjects/HomestarPage";

/**
 * Service responsible for resolving a locator key into a selector string
 * using page objects. Keeps override state local to the service so callers
 * don't need to mutate module globals.
 */
export class LocatorService {
  private static pageMap = new Map<string, any>([
    ["", WikipediaPage],
    ["wiki", WikiArticlePage],
    ["homestarunner", HomestarPage]
  ]);

  private static overridePage?: string;
  private static overrideActive = false;

  /** Set a manual page override (used when URL does not map to a page object). */
  static setOverride(pageName: string): void {
    this.overridePage = pageName;
    this.overrideActive = true;
    cy.log("Setting page object to " + pageName);
  }

  /** Clear any manual override so default URL-based resolution resumes. */
  static clearOverride(): void {
    this.overrideActive = false;
    this.overridePage = undefined;
    cy.log("Page objects resume default behavior based on current url");
  }

  /**
   * Resolve the selector and its type for the given locator key. Returns a
   * `Cypress.Chainable` that yields an object `{ selector, type }`.
   */
  static resolveSelector(locKey: string): Cypress.Chainable<{ selector: string; type: import("./ActionsInterface").SelectorKind }> {
    return cy.url().then((url) => {
      const urlset = url.split(/[/?#]/);
      const pageKey = this.overrideActive ? (this.overridePage ?? "") : (urlset[3] ?? "");
      const pageClass = this.pageMap.get(pageKey);
      if (!pageClass) throw new Error("No page object found for key: " + pageKey);
      const result = pageClass.Locators(locKey);
      // Expect pageClass.Locators to return { selector, type }.
      if (!result || !result.selector || !result.type) {
        throw new Error("Page object Locators must return { selector, type }");
      }
      return result as { selector: string; type: import("./ActionsInterface").SelectorKind };
    });
  }
}
