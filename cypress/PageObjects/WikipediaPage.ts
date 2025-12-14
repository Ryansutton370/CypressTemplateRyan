import { BasePage } from "cypress/PageObjects/BasePage";

export class WikipediaPage extends BasePage {
  protected static getCSSLocators(): Record<string, string> {
    return {
      ArticleLinks: "ul > li > div > div > div > a",
    };
  }

  protected static getXPathLocators(): Record<string, string> {
    return {
      ArticleHeading: "//h1",
      ArticleTopImage: "(//table//img)[1]"
    };
  }
}
