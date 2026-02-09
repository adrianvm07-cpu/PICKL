@smoke
Feature: Login Functionality
  As a user
  I want to login to the application
  So that I can access secure pages

  Background:
    Given I am on the login page

  @positive
  Scenario: Successful login with valid credentials
    When I enter username "standard_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I check if the "Products" heading is displayed

  @negative
  Scenario: Failed login with invalid username and password
    When I enter username "invaliduser"
    And I enter password "SuperSecretPassword!"
    And I click the login button
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"
    Then I should remain on the login page

  @negative
  Scenario: Failed login with username only
  When I enter username "standard_user"
  And I click the login button
  Then I should see an error message "Epic sadface: Password is required"
  Then I should remain on the login page

   @negative
  Scenario: Failed login with username only
  When I enter password "secret_sauce"
  And I click the login button
  Then I should see an error message "Epic sadface: Username is required"
  Then I should remain on the login page

  @negative
  Scenario: Failed login with invalid username and password
    When I enter username "locked_out_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I should see an error message "Epic sadface: Sorry, this user has been locked out."
    Then I should remain on the login page
