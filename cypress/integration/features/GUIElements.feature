Feature: GUI Elements Interaction

#A typical "user flow" in which a user fills out a form
Scenario: Basic GUI Interactions
    Given navigate to homepage
    When enter "Ryan Test" in the "NameInput" field
    And enter "RyanTestEmail@test.com" in the "EmailInput" field
    Then enter "1231231234" in the "PhoneInput" field
    And enter "123 Test Address" in the "AddressInput" field
    Then click on "MaleRadioButton"
    Then check "Monday, Tuesday, Friday" days checkboxes
    Then select "Japan" option from "CountryDropdown"
    And select "Green" option from "ColorList"
    Then select "Dog" option from "AnimalList"
    Then select "1" date from "DatePicker1Input" homepage calendar
    And select today from "DatePicker2Input" homepage calendar
    Then enter yesterday YYYYMMDD date in the "DatePicker3StartDate" field
    And enter tomorrow YYYYMMDD date in the "DatePicker3EndDate" field
    Then click on "DatePicker3SubmitButton"
    Then "DatePicker3Result" field contains "You selected a range of 2 days."
    
#The same user flow as above, but using abstracted step definitions
#This would be used for frequently repeated, stable interractions
Scenario: Abstracted GUI Interactions
    Given navigate to homepage
    When fill out homepage form with hard-coded test data
    And submit yesterday start date and tomorrow end date
    Then "DatePicker3Result" field contains "You selected a range of 2 days."

#The same user flow as above, but with data-driven step definitions
Scenario Outline: Data-Driven Abstracted GUI Interactions
    Given navigate to homepage
    When fill out homepage form with "<TestCustomerData>" data
    And submit yesterday start date and tomorrow end date
    Then "DatePicker3Result" field contains "You selected a range of 2 days."

    Examples:
      | TestCustomerData |
      | EdgarData        |
      | KelseyData       |
      | RyanData         |
      



