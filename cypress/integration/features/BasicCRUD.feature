Feature: Basic CRUD Operations

# Test complete CRUD workflow on the /contacts endpoint of Mockoon's playground API
Scenario: Complete CRUD Operations on Contacts Resource
    When create a new contact with name "Test User", email "testuser@example.com", and phone "+1-555-0123"
    Then the contact should be created with a valid ID
    And retrieve the created contact
    Then the contact details should match the created data
    When update the contact email to "newemail@example.com"
    Then the contact should be updated successfully
    And retrieve the updated contact
    Then the contact email should be "newemail@example.com"
    When delete the contact
    Then the contact should be deleted successfully
    And attempting to retrieve the deleted contact should return not found

# Test CRUD operations with data-driven approach
Scenario Outline: CRUD Operations with Multiple Contacts
    When create a new contact with name "<ContactName>", email "<ContactEmail>", and phone "<PhoneNumber>"
    Then the contact should be created with a valid ID
    And retrieve the created contact
    Then the contact details should match the created data
    When delete the contact
    Then the contact should be deleted successfully

    Examples:
      | ContactName      | ContactEmail              | PhoneNumber   |
      | Alice Johnson    | alice.johnson@example.com | +1-555-0001   |
      | Bob Smith        | bob.smith@example.com     | +1-555-0002   |
      | Carol Williams   | carol.williams@example.com| +1-555-0003   |
