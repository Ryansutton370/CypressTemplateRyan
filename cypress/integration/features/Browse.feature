Feature: Visit Wikipedia

Scenario: User visits the Wikipedia homepage
    Given navigate to homepage
    Then the "Slogan" field contains "The Free Encyclopedia"
    When enter "Dr. Robotnik's Mean Bean Machine" in the "SearchInput" field
    Then click on "SearchButton"
    Then the URL contains "Mean_Bean_Machine"
    Then the "ArticleHeading" field contains "Dr. Robotnik's Mean Bean Machine"
    Then "ArticleImage" should be visible

    #Demonstrate page overriding - we do not go to homestarrunner site (unfortunately)
    #Therefore we can prove that we do not see Sbemails
    Given override page object to "homestarunner"
    Then "Sbemail" should not exist
    
    #Demonstrate return to default page object selection behavior
    Then stop overriding page object
    Then the "ArticleHeading" field contains "Dr. Robotnik's Mean Bean Machine"
