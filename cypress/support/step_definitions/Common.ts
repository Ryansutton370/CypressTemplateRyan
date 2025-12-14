import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { CommonActions } from "cypress/Utility/CommonActions";

/**
 * Common Step Definitions
 * 
 * This file contains common step definitions for Cypress tests using Cucumber.
 * Generally applicable steps such as navigation, text entry, clicking elements,
 * and validations are defined here.
 * 
 * In particular, "atomic" actions replicating user interactions are implemented here.
 * Steps that are more specific to certain pages or features should be defined
 * in their respective step definition files.
 */

Given("navigate to homepage", () => {
  cy.visit(Cypress.env("baseUrl"));
});

Then("{string} field contains {string}", (field: string, text: string) => {
  CommonActions.validateFieldText(field, text);
});

Then("enter {string} in the {string} field", (text: string, field: string) => {
  CommonActions.enterText(field, text);
});

Then("click on {string}", (element: string) => {
  CommonActions.click(element);
});

Then("select {string} option from {string}", (option: string, dropdown: string) => {
  const value = option.toLowerCase();
  CommonActions.selectOption(dropdown, value);
});

Then("the URL contains {string}", (text: string) => {
  cy.url().should("include", text);
});

Then("{string} should be visible", (element: string) => {
  CommonActions.shouldBeVisible(element);
});

Then("wait for {int} seconds", (seconds: number) => {
  cy.wait(seconds * 1000);
});

Then("{string} should not exist", (element: string) => {
  CommonActions.shouldNotExist(element);
});

Given("override page object to {string}", (pageObject: string) => {
  CommonActions.setOverrideLocator(pageObject);
});

Given("stop overriding page object", () => {
  CommonActions.stopOverrideLocator();
});

Then("navigate to {string} link target", (element: string) => {
  CommonActions.navigateToLink(element);
});

Then("click on {string} that contains {string}", (locator: string, text: string) => {
  CommonActions.clickContains(locator, text);
});
