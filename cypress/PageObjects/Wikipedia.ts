import { BasePage } from "cypress/PageObjects/BasePage";

export class WikipediaPage extends BasePage {
  protected static getCSSLocators(): Record<string, string> {
    return {
      SearchButton: "#search-form > fieldset > button",
    };
  }

  protected static getXPathLocators(): Record<string, string> {
    return {
      SearchInput: "//input[@id='searchInput']",
      Slogan: "//h1/strong",
    };
  }
}
