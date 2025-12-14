import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { CRUDActions } from "cypress/Utility/CRUDActions";
import { CommonActions } from "cypress/Utility/CommonActions";

/**
 * Step Definitions for Basic CRUD and API-to-GUI Integration Tests
 * 
 * This file contains Cucumber/Gherkin step definitions that implement:
 * 1. Complete CRUD (Create, Read, Update, Delete) workflows for REST API testing
 * 2. API data fetching and mapping to GUI form fields
 * 3. Data validation and assertion patterns
 * 
 * These steps leverage the CRUDActions utility class for API operations and
 * CommonActions for GUI interactions. The patterns established here support:
 * - Basic API CRUD operations via Mockoon playground endpoints
 * - Data-driven testing with API-supplied test data
 * - Integration testing where API data populates GUI forms
 * 
 * ## Implementation Notes
 * - API base URL is configured in .env (API_BASEURL)
 * - Step definitions use stateful operations (storing/retrieving created resource IDs)
 * - Nested object properties are handled via CRUDActions.extractStringValue()
 * - All steps log operations for debugging via cy.log()
 * 
 * ## Usage Examples
 * - BasicCRUD.feature: Pure API CRUD testing
 * - GUIElementsWithAPI.feature: API data integration with GUI testing
 */

/**
 * Create a new contact with specified details
 * 
 * This step sends a POST request to the /contacts endpoint to create a new contact.
 * The response body (containing the auto-generated ID) is stored for subsequent operations.
 * 
 * @param name - The contact's name
 * @param email - The contact's email address
 * @param phone - The contact's phone number
 */
When(
  "create a new contact with name {string}, email {string}, and phone {string}",
  (name: string, email: string, phone: string) => {
    const contactPayload = {
      name: name,
      email: email,
      phone: phone,
    };
    CRUDActions.createResource("/contacts", contactPayload);
  }
);

/**
 * Verify that the contact was created with a valid ID
 * 
 * Asserts that the last API response contains an 'id' property that is not null/undefined.
 * This is called after contact creation to confirm the resource was properly created.
 */
Then("the contact should be created with a valid ID", () => {
  CRUDActions.validateResourceHasId();
});

/**
 * Retrieve the most recently created contact
 * 
 * Sends a GET request to fetch the contact that was just created.
 * Uses the stored resource ID from the creation step.
 */
Then("retrieve the created contact", () => {
  CRUDActions.retrieveResource("/contacts");
});

/**
 * Verify that the contact details match what was created
 * 
 * Compares the retrieved contact data with the originally created data.
 * Validates name, email, and phone fields match between creation and retrieval.
 */
Then("the contact details should match the created data", () => {
  const createdData = CRUDActions.getCreatedData();
  const lastResponse = CRUDActions.getLastResponse();

  expect(lastResponse.name).to.equal(createdData.name);
  expect(lastResponse.email).to.equal(createdData.email);
  expect(lastResponse.phone).to.equal(createdData.phone);

  cy.log("Contact details match created data");
});

/**
 * Update the contact's email address
 * 
 * Sends a PUT request to fully update the contact with a new email.
 * Preserves other contact fields by spreading the existing contact data.
 * 
 * @param newEmail - The new email address to set
 */
When("update the contact email to {string}", (newEmail: string) => {
  const currentData = CRUDActions.getCreatedData();
  const updatedPayload = {
    ...currentData,
    email: newEmail,
  };
  CRUDActions.updateResource("/contacts", updatedPayload);
});

/**
 * Verify that the contact was updated successfully
 * 
 * Asserts that the update operation returned a successful HTTP status (200, 201, or 204).
 */
Then("the contact should be updated successfully", () => {
  const statusCode = CRUDActions.getLastStatusCode();
  expect([200, 201, 204]).to.include(statusCode);
  cy.log("Contact updated successfully");
});

/**
 * Retrieve the contact after update
 * 
 * Sends a GET request to fetch the contact and verify the updates were persisted.
 */
Then("retrieve the updated contact", () => {
  CRUDActions.retrieveResource("/contacts");
});

/**
 * Verify that the contact's email matches the updated value
 * 
 * Asserts that the email field in the retrieved contact equals the expected new email.
 * 
 * @param expectedEmail - The email address expected after the update
 */
Then("the contact email should be {string}", (expectedEmail: string) => {
  const lastResponse = CRUDActions.getLastResponse();
  expect(lastResponse.email).to.equal(expectedEmail);
  cy.log(`Contact email verified: ${expectedEmail}`);
});

/**
 * Delete the contact
 * 
 * Sends a DELETE request to remove the contact from the API using the stored resource ID.
 */
When("delete the contact", () => {
  CRUDActions.deleteResource("/contacts");
});

/**
 * Verify that the contact was deleted successfully
 * 
 * Asserts that the delete operation returned a successful HTTP status (200 or 204).
 */
Then("the contact should be deleted successfully", () => {
  const statusCode = CRUDActions.getLastStatusCode();
  expect([200, 204]).to.include(statusCode);
  cy.log("Contact deleted successfully");
});

/**
 * Verify that attempting to retrieve the deleted contact returns not found
 * 
 * Sends a GET request expecting a 404 Not Found response, confirming the resource was deleted.
 */
Then("attempting to retrieve the deleted contact should return not found", () => {
  CRUDActions.verifyResourceDeleted("/contacts");
});

/**
 * Fetch customer data from API and store it for use in GUI tests
 * 
 * Sends a GET request to the specified API endpoint to retrieve a list of resources.
 * Extracts the first item from the array and stores it via CRUDActions for later use.
 * This is primarily used to populate GUI forms with API-supplied test data.
 * 
 * @param endpoint - The API endpoint to fetch from (e.g., '/customers')
 */
When("fetch customer data from API endpoint {string}", (endpoint: string) => {
  cy.request({
    method: "GET",
    url: `${CRUDActions.getApiBaseUrl()}${endpoint}`,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array").with.length.greaterThan(0);
    
    const customer = response.body[0];
    CRUDActions.setFetchedData(customer);
    cy.log(`Fetched first customer: ${customer.name}`);
  });
});

/**
 * Fetch a customer by index from the API endpoint
 * 
 * Sends a GET request to retrieve a list of resources and extracts a specific item by index.
 * Validates that the response array contains the requested index before access.
 * Stores the extracted customer data for use in subsequent GUI form population steps.
 * 
 * @param indexStr - The zero-based index of the customer to fetch (as a string)
 * @param endpoint - The API endpoint to fetch from (e.g., '/customers')
 */
When("fetch customer by index {string} from API endpoint {string}", (indexStr: string, endpoint: string) => {
  const index = parseInt(indexStr, 10);
  cy.request({
    method: "GET",
    url: `${CRUDActions.getApiBaseUrl()}${endpoint}`,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array").with.length.greaterThan(index);
    
    const customer = response.body[index];
    CRUDActions.setFetchedData(customer);
    cy.log(`Fetched customer at index ${index}: ${customer.name}`);
  });
});

/**
 * Fill out the GUI form with fetched API data
 * 
 * Maps API customer data fields to GUI form input fields.
 * Handles nested objects (e.g., location.city) via CRUDActions.extractStringValue().
 * Validates that API data was previously fetched before attempting to populate the form.
 * 
 * Form field mapping:
 * - apiData.name → NameInput
 * - apiData.email → EmailInput
 * - apiData.phone → PhoneInput
 * - apiData.address → AddressInput
 */
Then("fill out homepage form with the fetched API data", () => {
  const apiData = CRUDActions.getFetchedData();
  
  if (!apiData) {
    throw new Error("No API data available. Fetch customer data first.");
  }

  // Map API customer data to form fields, handling nested objects
  CommonActions.enterText("NameInput", CRUDActions.extractStringValue(apiData.name, "Test User"));
  CommonActions.enterText("EmailInput", CRUDActions.extractStringValue(apiData.email, "test@example.com"));
  CommonActions.enterText("PhoneInput", CRUDActions.extractStringValue(apiData.phone, "0000000000"));
  CommonActions.enterText("AddressInput", CRUDActions.extractStringValue(apiData.address, "123 Test Street"));
  
  cy.log("GUI form filled with API data");
});

/**
 * Fill out the GUI form with created contact data (from API CRUD operations)
 * 
 * Maps contact data created via the API to GUI form input fields.
 * Falls back to using email as the name if the name field is not available.
 * Handles nested objects via CRUDActions.extractStringValue().
 * Validates that contact data was previously created before attempting to populate the form.
 * 
 * Form field mapping:
 * - contactData.name (or email as fallback) → NameInput
 * - contactData.email → EmailInput
 * - contactData.phone → PhoneInput
 * - contactData.address → AddressInput
 * 
 * ## Use Case
 * This step bridges API testing and GUI testing by creating a resource via API,
 * then using that data to populate and test the web application's form.
 */
Then("fill out homepage form with the created contact data using email as name", () => {
  const contactData = CRUDActions.getCreatedData();
  
  if (!contactData) {
    throw new Error("No contact data available. Create a contact first.");
  }

  // Map contact data to form fields
  CommonActions.enterText("NameInput", CRUDActions.extractStringValue(contactData.name || contactData.email, "Test User"));
  CommonActions.enterText("EmailInput", CRUDActions.extractStringValue(contactData.email, "test@example.com"));
  CommonActions.enterText("PhoneInput", CRUDActions.extractStringValue(contactData.phone, "0000000000"));
  CommonActions.enterText("AddressInput", CRUDActions.extractStringValue(contactData.address, "Test Address"));
  
  cy.log("GUI form filled with created contact data");
});
