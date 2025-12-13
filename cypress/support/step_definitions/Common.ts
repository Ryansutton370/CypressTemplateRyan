import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Common } from "cypress/Utility/Common";

Given("navigate to homepage", () => {
  cy.visit(Cypress.env("baseUrl"));
});

Then("the {string} field contains {string}", (field: string, text: string) => {
  Common.validateField(field, text);
});

