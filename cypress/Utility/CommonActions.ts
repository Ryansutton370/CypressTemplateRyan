import { LocatorService } from "cypress/Utility/LocatorService";
import { ActionsInterface, ActionKind, CssActions, XpathActions } from "cypress/Utility/ActionsInterface";


export class CommonActions {
  // Resolve locator and immediately dispatch the requested actionKind.
  // `text` is optional because not all actions require a text payload
  // (e.g. `click` or `shouldBeVisible`).
  public static getLocator(Loc: string, actionKind: ActionKind, text?: string): void {
    cy.log("Getting locator for: " + Loc);
    // LocatorService.resolveSelector yields an object { selector, type }
    LocatorService.resolveSelector(Loc).then((resolved) => {
      cy.log("Resolved selector: " + resolved.selector + " (" + resolved.type + ")");
      // Pass an empty string for `text` to downstream action if undefined.
      this.action(resolved.selector, text ?? "", resolved.type, actionKind);
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

  // Dispatch an action for the given selector and explicit selectorType.
  public static action(Locator: string, text: string, selectorType: string, actionKind: ActionKind): void {
    /**
     * Dispatch to a concrete Actions implementation based on an explicit
     * `selectorType` and `actionKind`.
     *
     * - `selectorType` is a typed `SelectorKind` (CSS or XPATH).
     * - `actionKind` selects which handler from the `handlers` map to call.
     *
     * This avoids global state and makes the flow explicit and testable.
     */

    // Factory: pick the concrete Actions implementation based on selector type.
    const getActionInstance = (): ActionsInterface => {
      if (selectorType === "CSS") return new CssActions();
      if (selectorType === "XPATH") return new XpathActions();
      throw new Error("Unknown locator type: " + selectorType);
    };

    // Map of action kind -> handler. Handlers are intentionally tiny and
    // focus on logging + delegating to the `Actions` implementation.
    const handlers: Record<ActionKind, (act: ActionsInterface) => void> = {
      [ActionKind.FieldContains]: (act: ActionsInterface) => {
        cy.log("Check is: " + selectorType);
        act.fieldContains(Locator, text);
      },
      [ActionKind.EnterText]: (act: ActionsInterface) => {
        cy.log("Enter text using: " + selectorType);
        act.enterText(Locator, text);
      },
      [ActionKind.Click]: (act: ActionsInterface) => {
        cy.log("Click action using: " + selectorType);
        act.click(Locator);
      },
      [ActionKind.ShouldBeVisible]: (act: ActionsInterface) => {
        cy.log("Visibility check using: " + selectorType);
        act.shouldBeVisible(Locator);
      },
      [ActionKind.ShouldNotExist]: (act: ActionsInterface) => {
        cy.log("Not exist check using: " + selectorType);
        act.shouldNotExist(Locator);
      },
    };

    // Lookup the handler by the explicit actionKind and invoke it.
    const handler = handlers[actionKind];
    if (!handler) {
      throw new Error("Unable to find Action for: " + actionKind);
    }

    const actInstance = getActionInstance();
    handler(actInstance);
  }

 
  public static validateFieldText(Locator: string, text: string): void {
    this.getLocator(Locator, ActionKind.FieldContains, text);
  }

  public static enterText(Locator: string, text: string): void {
    this.getLocator(Locator, ActionKind.EnterText, text);
  }

  public static click(Locator: string): void {
    this.getLocator(Locator, ActionKind.Click);
  }

  public static shouldBeVisible(Locator: string): void {
    this.getLocator(Locator, ActionKind.ShouldBeVisible);
  }

  public static shouldNotExist(Locator: string): void {
    this.getLocator(Locator, ActionKind.ShouldNotExist);
  }

}
