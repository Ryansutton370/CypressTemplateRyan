import { WikipediaPage } from "cypress/PageObjects/Wikipedia";
import { MeanBeanMachineArticle } from "cypress/PageObjects/MeanBeanMachineArticle";

declare global {
  var type;
  var action;
}

var field;
var locator;
var locatorSet;
var manuallySetPageObject: boolean = false;

export class Common {
  //Get locator either as CSS or XPATH and pass it to the Action method
  public static getLocator(Loc: string, text: string): void {
    cy.url().then((url) => {
      let page = new Map();
      page.set("", WikipediaPage);
      page.set("Dr._Robotnik's_Mean_Bean_Machine", MeanBeanMachineArticle);

      //By default, find the page object based on the first element after the base url
      var urlset = url.split(/[/?#]/);
      //The page object can instead be manually set by the test step if necessary
      if (manuallySetPageObject == true) {
        if (locatorSet == true) {
          cy.log("Current page object file: " + locator);
        } else {
          locatorSet = true;
          locator = page.get(locator);
        }
      } else {
        cy.log("This is page: " + page.size);
        locator = page.get(urlset[3]);
      }

      this.action(locator.Locator(Loc), text);
    });
  }

  //Call to manually set page object file instead of default behavior (i.e. when url does not directly map to page object)
  public static setOverrideLocator(page: string): void {
    locator = page;
    locatorSet = false;
    manuallySetPageObject = true;
    cy.log("Setting page object to " + page);
  }

  //Call after setOverrideLocator to return to default behavior
  public static stopOverrideLocator(): void {
    manuallySetPageObject = false;
    locatorSet = false;
    cy.log("Page objects resume default behavior based on current url");
  }

  //Performss an action on a Locator based on a Global Action value
  public static action(Locator: string, text: string): void {
    switch (action) {
      case "fieldContains": {
        cy.log("Check is: " + globalThis.type);
        this.validateFieldByGET(Locator, text);
        if (globalThis.type == "CSS") {
        } else if (globalThis.type == "XPATH") {
          this.validateFieldByXPATH(Locator, text);
        }
        break;
      }
    }
  }

  //globalAction for validating field text
  public static validateField(Locator: string, text: string): void {
    globalThis.action = "fieldContains";
    this.getLocator(Locator, text);
  }

  //implementation of global action for fieldContains for CSS Selectors
  public static validateFieldByGET(Locator: string, text: string): void {
    cy.log("Locator is: " + Locator);
    cy.get(locator, { timeout: 10000 })
      .scrollIntoView()
      .should("have.text", text);
  }

  //implementation of global action for fieldContains for XPATH Selectors
  public static validateFieldByXPATH(Locator: string, text: string): void {
    cy.log("Locator is: " + Locator);
    cy.xpath(locator, { timeout: 10000 })
      .scrollIntoView()
      .should("have.text", text);
  }
}
