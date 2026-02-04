@smoke
Feature: Add to Cart Functionality
  As a user
  I want to login to the application
  and select items that I want to add to my cart

  Background:
    Given I am on the login page

  @positive
  Scenario: Select a product
    When I am able to login successfully
    And I enter password "secret_sauce"
    And I click the login button
    Then I check if the "Products" heading is displayed

  @negative
  Scenario: Failed login with invalid username
    When I enter username "invaliduser"
    And I enter password "SuperSecretPassword!"
    And I click the login button
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"
    Then I should remain on the login page
