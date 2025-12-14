import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { CommonActions } from "cypress/Utility/CommonActions";

/**
 * Step definitions unique to Automation Test Home Page testing.
 * These steps and their helper methods are primarily concerned with the unique date picker controls.
 * Because they are use-case specific, they are not abstracted into CommonActions.
 */

/**
 * Helper class for date input handling
 */
class DateInputHelper {
  /**
   * Format a date object to YYYY-MM-DD string
   */
  static formatDateToInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  /**
   * Convert YYYYMMDD string to YYYY-MM-DD format
   */
  static convertYYYYMMDDtoInput(dateString: string): string {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}-${month}-${day}`;
  }

  /**
   * Set a date value in an HTML date input field
   */
  static setDateInField(locator: string, formattedDate: string): void {
    CommonActions.click(locator);
    cy.focused().invoke("val", formattedDate).trigger("change").trigger("blur");
  }

  /**
   * Get a date relative to today (offset in days)
   */
  static getRelativeDate(dayOffset: number): string {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    return this.formatDateToInput(date);
  }
}

// Calendar picker steps
Given(
  "select {string} date from {string} homepage calendar",
  (date: string, datePicker: string) => {
    CommonActions.click(datePicker);
    cy.get(`a[data-date='${date}']`).click();
  }
);

Then("select today from {string} homepage calendar", (datePicker: string) => {
  const today = new Date().getDate().toString();
  CommonActions.click(datePicker);
  cy.get(`a[data-date='${today}']`).click();
});

// HTML date input steps
Then(
  "enter YYYYMMDD date {string} in the {string} field",
  (dateString: string, locator: string) => {
    const formattedDate = DateInputHelper.convertYYYYMMDDtoInput(dateString);
    DateInputHelper.setDateInField(locator, formattedDate);
  }
);

Then("enter today YYYYMMDD date in the {string} field", (locator: string) => {
  const formattedDate = DateInputHelper.getRelativeDate(0);
  DateInputHelper.setDateInField(locator, formattedDate);
});

Then(
  "enter yesterday YYYYMMDD date in the {string} field",
  (locator: string) => {
    const formattedDate = DateInputHelper.getRelativeDate(-1);
    DateInputHelper.setDateInField(locator, formattedDate);
  }
);

Then(
  "enter tomorrow YYYYMMDD date in the {string} field",
  (locator: string) => {
    const formattedDate = DateInputHelper.getRelativeDate(1);
    DateInputHelper.setDateInField(locator, formattedDate);
  }
);

//Abstracted form filling step
When("fill out homepage form with hard-coded test data", () => {
  CommonActions.enterText("NameInput", "Ryan Test");
  CommonActions.enterText("EmailInput", "RyanEmail@test.com");
  CommonActions.enterText("PhoneInput", "1231231234");
  CommonActions.enterText("AddressInput", "123 Test Address");
  CommonActions.click("MaleRadioButton");
  checkDaysCheckboxes("Monday, Tuesday, Friday");
  CommonActions.selectOption("CountryDropdown", "japan");
  CommonActions.selectOption("ColorList", "green");
  CommonActions.selectOption("AnimalList", "dog");
});

Then("submit yesterday start date and tomorrow end date", () => {
  const yesterday = DateInputHelper.getRelativeDate(-1);
  const tomorrow = DateInputHelper.getRelativeDate(1);
  DateInputHelper.setDateInField("DatePicker3StartDate", yesterday);
  DateInputHelper.setDateInField("DatePicker3EndDate", tomorrow);
  CommonActions.click("DatePicker3SubmitButton");
});

When("fill out homepage form with {string} data", (fixtureName: string) => {
  cy.fixture(fixtureName).then((customer) => {
    CommonActions.enterText("NameInput", customer.name);
    CommonActions.enterText("EmailInput", customer.email);
    CommonActions.enterText("PhoneInput", customer.phone);
    CommonActions.enterText("AddressInput", customer.address);
    CommonActions.click(customer.gender);
    checkDaysCheckboxes(customer.days);
    CommonActions.selectOption("CountryDropdown", customer.country);
    CommonActions.selectOption("ColorList", customer.color);
    CommonActions.selectOption("AnimalList", customer.animal);
  });
});

Then("check {string} days checkboxes", (daysString: string) => {
  checkDaysCheckboxes(daysString);
});

function checkDaysCheckboxes(daysString: string): void {
  const days = daysString.split(",").map((day) => day.trim().toLowerCase());
  days.forEach((day) => {
    cy.get(`#${day}`).check({ force: true });
  });
}
