import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("navigate to homepage", () => {
  cy.visit(Cypress.env("baseUrl"));
});