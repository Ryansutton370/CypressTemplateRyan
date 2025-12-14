Feature: GUI Elements Interaction with API-Supplied Data

    # Fetch customer data from API and use it to fill out the GUI form
    Scenario: Fill GUI Form with Customer Data from API
        When fetch customer data from API endpoint "/customers"
        And navigate to homepage
        Then fill out homepage form with the fetched API data
        And submit yesterday start date and tomorrow end date
        Then "DatePicker3Result" field contains "You selected a range of 2 days."

    # Fetch multiple customers from API and run data-driven GUI tests
    # The @ignore tag can be used to skip scenarios when testing
    # Here it is set to be ignored to save time during demonstrations, as this test is essentially a repeat of the previous one
    @ignore
    Scenario Outline: Data-Driven GUI Interactions with Multiple API Customers
        When fetch customer by index "<CustomerIndex>" from API endpoint "/customers"
        And navigate to homepage
        Then fill out homepage form with the fetched API data
        And submit yesterday start date and tomorrow end date
        Then "DatePicker3Result" field contains "You selected a range of 2 days."

        Examples:
            | CustomerIndex |
            | 0             |
            | 1             |

    # Verify API data can be used to create records and then populate form
    Scenario: Create API Contact and Populate Form with Retrieved Data
        When create a new contact with name "Integration Test User", email "integrationtest@example.com", and phone "+1-555-9999"
        And retrieve the created contact
        And navigate to homepage
        Then fill out homepage form with the created contact data using email as name
        And submit yesterday start date and tomorrow end date
        Then "DatePicker3Result" field contains "You selected a range of 2 days."
        When delete the contact
        Then the contact should be deleted successfully
