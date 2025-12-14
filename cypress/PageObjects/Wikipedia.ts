
export class WikipediaPage {
  public static Locators(loc: string): string {
    var found;
    const CSS = {
      SearchButton: "#search-form > fieldset > button",
    }

    const XPATH = {
      SearchInput: "//input[@id='searchInput']",
      Slogan: "//h1/strong",
    }

    // Checks which container the value was found it to set the Global type and returns the value after
        if(CSS[loc]) {
            found = CSS[loc]
            globalThis.type = "CSS"
        } else if (XPATH[loc]) {
            found = XPATH[loc]
            globalThis.type = "XPATH"
        } else {
            throw new Error("Unable to find CSS or XPATH Locator: " + loc)
        }
        return found
  }
}
