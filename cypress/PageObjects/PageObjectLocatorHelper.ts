/**
 * Helper method determines whether a locator key exists in CSS or XPATH locator maps in Page Object files
 */

type LocatorMap = Record<string, string>

export function resolveLocator(
  loc: string,
  css: LocatorMap,
  xpath: LocatorMap,
  pageName: string
): string {
  if (css[loc]) {
    globalThis.type = "CSS"
    return css[loc]
  }

  if (xpath[loc]) {
    globalThis.type = "XPATH"
    return xpath[loc]
  }

  throw new Error(`Locator not found in ${pageName}: ${loc}`)
}
