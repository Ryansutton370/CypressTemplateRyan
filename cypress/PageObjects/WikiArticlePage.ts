import { BasePage } from "cypress/PageObjects/BasePage";

export class WikiArticlePage extends BasePage {
  protected static getCSSLocators(): Record<string, string> {
    return {
      ArticleImage: "tr > td > span > a > .mw-file-element",
    };
  }

  protected static getXPathLocators(): Record<string, string> {
    return {
      ArticleHeading: "//h1",
    };
  }
}
