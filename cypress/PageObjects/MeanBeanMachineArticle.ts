import { resolveLocator } from "./PageObjectLocatorHelper"

export class MeanBeanMachineArticle {
  public static Locators(loc: string): string {
    const CSS = {
      ArticleImage: "tr > td > span > a > .mw-file-element",
    }

    const XPATH = {
      ArticleHeading: "//h1",
    }

    return resolveLocator(loc, CSS, XPATH, "MeanBeanMachineArticle");
  }
}
