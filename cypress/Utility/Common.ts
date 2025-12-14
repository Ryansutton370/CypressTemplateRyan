import { LocatorService } from "./LocatorService";
import { ActionsInterface, CssActions, XpathActions } from "./ActionsInterface";

// declare global {
//   var type;
//   var action;
// }

export class Common {
  // Get locator either as CSS or XPATH and pass it to the Action method
  public static getLocator(Loc: string, text: string): void {
    cy.log("Getting locator for: " + Loc);
    // Delegate URL -> page -> selector resolution to LocatorService which
    // returns a `Cypress.Chainable` that yields the selector string.
    LocatorService.resolveSelector(Loc).then((resolved) => {
      cy.log("Resolved selector: " + resolved.selector + " (" + resolved.type + ")");
      this.action(resolved.selector, text, resolved.type);
    });
  }

  // Call to manually set page object file instead of default behavior
  // (i.e. when URL does not directly map to page object)
  public static setOverrideLocator(page: string): void {
    LocatorService.setOverride(page);
  }

  // Call after setOverrideLocator to return to default behavior
  public static stopOverrideLocator(): void {
    LocatorService.clearOverride();
  }

  public static action(Locator: string, text: string, selectorType: string): void {
    /**
     * action() dispatches a global action name (stored in `globalThis.action`)
     * to a concrete method on an `Actions` implementation. To keep the logic
     * DRY we:
     *  - create the correct `Actions` instance once via `getActionInstance`
     *    (so selector-type branching is centralized), and
     *  - use a `handlers` map that contains small functions for each
     *    supported action. Each handler receives the `Actions` instance and
     *    performs the specific call.
     *
     * This makes the flow easy to extend: add a new entry to `handlers`
     * for a new action name, and update `getActionInstance` if a new selector
     * strategy (other than CSS/XPATH) is introduced.
     */

    // Factory: pick the concrete Actions implementation based on selector type.
    const getActionInstance = (): ActionsInterface => {
      if (selectorType === "CSS") return new CssActions();
      if (selectorType === "XPATH") return new XpathActions();
      // If you add a new selector type, handle it here.
      throw new Error("Unknown locator type: " + selectorType);
    };

    // Map of action name -> handler. Handlers are intentionally tiny and
    // focus on logging + delegating to the `Actions` implementation.
    const handlers: Record<string, (act: ActionsInterface) => void> = {
      fieldContains: (act: ActionsInterface) => {
        cy.log("Check is: " + selectorType);
        act.fieldContains(Locator, text);
      },
      enterText: (act: ActionsInterface) => {
        cy.log("Enter text using: " + selectorType);
        act.enterText(Locator, text);
      },
      click: (act: ActionsInterface) => {
        cy.log("Click action using: " + selectorType);
        act.click(Locator);
      },
      shouldBeVisible: (act: ActionsInterface) => {
        cy.log("Visibility check using: " + selectorType);
        act.shouldBeVisible(Locator);
      },
    };

    // Lookup the handler by the global action key and invoke it.
    const key = globalThis.action as string;
    const handler = handlers[key];
    if (!handler) {
      throw new Error("Unable to find Action from global action: " + key);
    }

    const actInstance = getActionInstance();
    handler(actInstance);
  }

 
  public static validateFieldText(Locator: string, text: string): void {
    globalThis.action = "fieldContains";
    this.getLocator(Locator, text);
  }

  public static enterText(Locator: string, text: string): void {
    globalThis.action = "enterText";
    this.getLocator(Locator, text);
  }

  public static click(Locator: string): void {
    globalThis.action = "click";
    this.getLocator(Locator, "");
  }

  public static shouldBeVisible(Locator: string): void {
    globalThis.action = "shouldBeVisible";
    this.getLocator(Locator, "");
  }

}
