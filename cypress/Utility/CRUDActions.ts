/**
 * CRUD Actions for API Testing
 * 
 * This class provides reusable CRUD operations for testing REST APIs.
 * It handles common HTTP operations (Create, Read, Update, Delete) and
 * response validation against stored test data.
 */

export class CRUDActions {
  private static apiBaseUrl: string = Cypress.env("API_BASEURL") || "https://playground.mockoon.com";
  private static currentResourceId: string | null = null;
  private static createdData: any = null;
  private static lastResponse: any = null;
  private static lastStatusCode: number = 0;
  private static fetchedData: any = null;

  /**
   * Create a new resource via POST request
   * @param endpoint - The API endpoint (e.g., '/contacts')
   * @param payload - The data to POST
   */
  static createResource(endpoint: string, payload: any): void {
    cy.request({
      method: "POST",
      url: `${this.apiBaseUrl}${endpoint}`,
      body: payload,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      cy.log(`POST ${endpoint} - Status: ${response.status}`);
      this.lastStatusCode = response.status;
      this.lastResponse = response.body;
      this.createdData = response.body;

      // Extract and store the ID for later use
      if (response.body && response.body.id) {
        this.currentResourceId = response.body.id;
        cy.log(`Resource created with ID: ${this.currentResourceId}`);
      }

      // Assert successful creation
      expect(response.status).to.be.oneOf([200, 201]);
    });
  }

  /**
   * Retrieve a resource via GET request
   * @param endpoint - The API endpoint (e.g., '/contacts')
   * @param resourceId - Optional ID of specific resource. If not provided, uses currentResourceId
   */
  static retrieveResource(endpoint: string, resourceId?: string): void {
    const id = resourceId || this.currentResourceId;
    const url = id ? `${this.apiBaseUrl}${endpoint}/${id}` : `${this.apiBaseUrl}${endpoint}`;

    cy.request({
      method: "GET",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      cy.log(`GET ${url} - Status: ${response.status}`);
      this.lastStatusCode = response.status;
      this.lastResponse = response.body;
      expect(response.status).to.equal(200);
    });
  }

  /**
   * Update a resource via PUT request (full replacement)
   * @param endpoint - The API endpoint (e.g., '/contacts')
   * @param payload - The updated data
   * @param resourceId - Optional ID of resource. If not provided, uses currentResourceId
   */
  static updateResource(endpoint: string, payload: any, resourceId?: string): void {
    const id = resourceId || this.currentResourceId;
    if (!id) {
      throw new Error("No resource ID available. Create a resource first or provide an ID.");
    }

    cy.request({
      method: "PUT",
      url: `${this.apiBaseUrl}${endpoint}/${id}`,
      body: payload,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      cy.log(`PUT ${endpoint}/${id} - Status: ${response.status}`);
      this.lastStatusCode = response.status;
      this.lastResponse = response.body;
      this.createdData = response.body;
      expect(response.status).to.be.oneOf([200, 204]);
    });
  }

  /**
   * Delete a resource via DELETE request
   * @param endpoint - The API endpoint (e.g., '/contacts')
   * @param resourceId - Optional ID of resource. If not provided, uses currentResourceId
   */
  static deleteResource(endpoint: string, resourceId?: string): void {
    const id = resourceId || this.currentResourceId;
    if (!id) {
      throw new Error("No resource ID available. Create a resource first or provide an ID.");
    }

    cy.request({
      method: "DELETE",
      url: `${this.apiBaseUrl}${endpoint}/${id}`,
    }).then((response) => {
      cy.log(`DELETE ${endpoint}/${id} - Status: ${response.status}`);
      this.lastStatusCode = response.status;
      expect(response.status).to.be.oneOf([200, 204]);
    });
  }

  /**
   * Attempt to retrieve a deleted resource and expect 404
   * @param endpoint - The API endpoint (e.g., '/contacts')
   * @param resourceId - Optional ID of resource. If not provided, uses currentResourceId
   */
  static verifyResourceDeleted(endpoint: string, resourceId?: string): void {
    const id = resourceId || this.currentResourceId;
    if (!id) {
      throw new Error("No resource ID available.");
    }

    cy.request({
      method: "GET",
      url: `${this.apiBaseUrl}${endpoint}/${id}`,
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(`GET ${endpoint}/${id} (verify deleted) - Status: ${response.status}`);
      this.lastStatusCode = response.status;
      expect(response.status).to.equal(404);
    });
  }

  /**
   * Get the last response body
   */
  static getLastResponse(): any {
    return this.lastResponse;
  }

  /**
   * Get the created/updated data stored from the last response
   */
  static getCreatedData(): any {
    return this.createdData;
  }

  /**
   * Get the last HTTP status code
   */
  static getLastStatusCode(): number {
    return this.lastStatusCode;
  }

  /**
   * Set the fetched data from an API response
   */
  static setFetchedData(data: any): void {
    this.fetchedData = data;
    cy.log("Fetched data stored");
  }

  /**
   * Get the fetched data from a previous API call
   */
  static getFetchedData(): any {
    return this.fetchedData;
  }

  /**
   * Get the API base URL
   */
  static getApiBaseUrl(): string {
    return this.apiBaseUrl;
  }

  /**
   * Validate that the resource ID exists in the response
   */
  static validateResourceHasId(): void {
    expect(this.lastResponse).to.have.property("id");
    expect(this.lastResponse.id).to.not.be.null;
    expect(this.lastResponse.id).to.not.be.undefined;
    cy.log(`Resource has valid ID: ${this.lastResponse.id}`);
  }

  /**
   * Extract string value from potentially nested objects
   * Handles strings, numbers, nested objects with useful properties
   * @param value - The value to extract (can be string, number, object, null, undefined)
   * @param defaultValue - The value to return if extraction fails
   * @returns A string representation of the value
   */
  static extractStringValue(value: any, defaultValue: string): string {
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);
    if (value === null || value === undefined) return defaultValue;
    // If it's an object (like location), try to extract a useful property
    if (typeof value === "object") {
      if (value.city) return value.city;
      if (value.street) return value.street;
      if (value.address) return value.address;
      return defaultValue;
    }
    return defaultValue;
  }
}
