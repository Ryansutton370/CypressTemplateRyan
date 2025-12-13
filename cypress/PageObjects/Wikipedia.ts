import { resolveLocator } from "./PageObjectLocatorHelper"

export class WikipediaPage {
  public static Locators(loc: string): string {
    const CSS = {
      SearchButton: "#search-form > fieldset > button",
    }

    const XPATH = {
      SearchInput: "//input[@id='searchInput']",
    }

    return resolveLocator(loc, CSS, XPATH, "WikipediaPage")
  }
}
