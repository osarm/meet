Feature: Specify Number of Events
  As a user, I want to specify the number of events I see in the list so that I can control how much information is displayed.

  Scenario: User does not type in the number-of-events field
    Given I am a user on the main page
    When I have not typed a number in the number-of-events field
    Then I should see a list of 32 events by default

  Scenario: User types a number in the number-of-events field
    Given I am a user on the main page
    When I type "5" in the number-of-events field
    Then I should see a list of 5 events
