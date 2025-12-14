Feature: Visit Wikipedia

Scenario: User visits the Wikipedia homepage
    Given navigate to homepage
    Then the "Slogan" field contains "The Free Encyclopedia"