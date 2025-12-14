import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { CommonActions } from "cypress/Utility/CommonActions";

Given("navigate to homepage", () => {
  cy.visit(Cypress.env("baseUrl"));
});

Then("the {string} field contains {string}", (field: string, text: string) => {
  CommonActions.validateFieldText(field, text);
});

Then("enter {string} in the {string} field", (text: string, field: string) => {
  CommonActions.enterText(field, text);
});

Then("click on {string}", (element: string) => {
  CommonActions.click(element);
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

