export class MeanBeanMachineArticle {
  public static Locators(loc: string): string {
    var found;
    const CSS = {
      ArticleImage: "tr > td > span > a > .mw-file-element",
    }

    const XPATH = {
      ArticleHeading: "//h1",
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
