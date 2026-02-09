@smoke
Feature: Add to Cart Functionality
  As a user
  I want to login to the application
  and select items that I want to add to my cart

  Background:
    Given I am able to login successfully

  @positive
  Scenario: Select a product
    When I am on the Inventory page
    And I click on the product "Sauce Labs Backpack"
    Then I can see the product description
    And I can click on the Add to Cart button


