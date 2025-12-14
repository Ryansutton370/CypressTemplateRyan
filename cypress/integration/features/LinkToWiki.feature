Feature: Link from homepage to Wiki page

Scenario: Look up "Cypress" on Wikipedia
    Given navigate to homepage
    When enter "Cypress" in the "WikipediaSearchInput" field
    And click on "WikipediaSearchButton"

    #This link opens a new tab, which is not natively supported in Cypress
    #Go there directly instead
    Then navigate to "WikipediaMoreResultsButton" link target

    #The page object now automatically changes to WikipediaPage
    Then click on "ArticleLinks" that contains "software"
    Then "ArticleHeading" field contains "Cypress (software)"
    Then "ArticleTopImage" should be visible
