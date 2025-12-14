import { BasePage } from "./BasePage";

export class AutomationTestHomePage extends BasePage {
    protected static getCSSLocators(): Record<string, string> {
    return {
      GUIElementsButton: "h3 > a",

      //Basic Form Elements
      NameInput: "#name",
      EmailInput: "#email",
      PhoneInput: "#phone",
      AddressInput: "#textarea",
      MaleRadioButton: "#male",
      FemaleRadioButton: "#female",
      //Days of the week checkboxes will be handled by a custom step
      CountryDropdown: "#country",
      ColorList: "#colors",
      AnimalList: "#animals",
      DatePickerCalendar: ".ui-datepicker-calendar",
      DatePicker1Input: "p > #datepicker",
      DatePicker2Input: "p > #txtDate",
      DatePicker3StartDate: "#start-date",
      DatePicker3EndDate: "#end-date",
      DatePicker3SubmitButton: ".date-picker-box > .submit-btn",
      DatePicker3Result: "#result"
    };
  }

  protected static getXPathLocators(): Record<string, string> {
    return {
      //Side Content
      WikipediaSearchInput: "//input[@id='Wikipedia1_wikipedia-search-input']",
    };
  }
}