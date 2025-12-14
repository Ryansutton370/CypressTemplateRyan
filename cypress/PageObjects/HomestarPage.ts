import { BasePage } from "cypress/PageObjects/BasePage";

export class HomestarPage extends BasePage {
  protected static getCSSLocators(): Record<string, string> {
    return {
      
    };
  }

  protected static getXPathLocators(): Record<string, string> {
    return {
      Main: "//a[contains(text(),'Main')]",
      Sbemail: "//a[contains(text(),'Sbemails')]",
    };
  }
}