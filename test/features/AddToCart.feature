@smoke
Feature: Add to Cart Functionality
  As a user
  I want to login to the application
  and select items that I want to add to my cart

  Background:
    Given I am able to login successfully

  @positive
  Scenario: Select a product then Add to Cart and Remove
    When I am on the Inventory page
    And I click on the product "Sauce Labs Backpack"
    Then I can see the product description
    And I can click on the Add to Cart button
    Then the shopping cart badge should show "1"
    And I can see the Remove button
    When I click on Remove button
    Then the shopping cart badge should not be visible
    And the Remove button is not visible

  @positive
  Scenario: Select a product and open cart, then Add to Cart and Remove
    When I am on the Inventory page
    And I click on the product "Sauce Labs Backpack"
    Then I can see the product description
    And I can click on the Add to Cart button
    Then the shopping cart badge should show "1"
    When I click on the Shopping Cart Icon
    Then I should see items present in the cart
    And I can see the Remove button
    When I click on Remove button
    Then the shopping cart badge should not be visible
    And the Remove button is not visible

  @positive
  Scenario: Add an item to the cart, and Remove
    When I am on the Inventory page
    And I can click on the Add to Cart button
    Then the shopping cart badge should show "1"
    And I can see the Remove button
    When I click on Remove button
    Then the shopping cart badge should not be visible
    And the Remove button is not visible

    @positive
  Scenario: Add an item to the cart, open cart and Remove
    When I am on the Inventory page
    And I can click on the Add to Cart button
    Then the shopping cart badge should show "1"
    When I click on the Shopping Cart Icon
    Then I should see items present in the cart
    And I can see the Remove button
    When I click on Remove button
    Then the shopping cart badge should not be visible
    And the Remove button is not visible

  @positive
  Scenario: Randomly select an item in the list and Add to Cart, open cart and Remove
    When I am on the Inventory page
    When I randomly select an item in the list
    Then I can see the product description
    And I can click on the Add to Cart button
    Then the shopping cart badge should show "1"
    When I click on the Shopping Cart Icon
    Then I should see items present in the cart
    And I can see the Remove button
    When I click on Remove button
    Then the shopping cart badge should not be visible
    And the Remove button is not visible

  @positive
  Scenario: Randomly select multiple items in the list and Add to Cart, open cart and Remove
    When I am on the Inventory page
    # You can change '3' to any number you want to test
    When I randomly select 5 items in the list
    Then the shopping cart badge should show "5"
    When I click on the Shopping Cart Icon
    Then I should see items present in the cart
    When I remove all items from the cart
    Then the shopping cart badge should not be visible
    And the Remove button is not visible

  @positive
  Scenario: Add All items in the cart, and Remove
    When I am on the Inventory page
    And I click all available Add to cart buttons
    Then the shopping cart badge should display "6"
    When I remove all items from the cart
    Then the shopping cart badge should not be visible
    And the Remove button is not visible

    @positive
  Scenario: Add All items, open cart and Remove
    When I am on the Inventory page
    And I click all available Add to cart buttons
    Then the shopping cart badge should display "6"
    When I click on the Shopping Cart Icon
    Then I should see items present in the cart
    When I remove all items from the cart
    Then the shopping cart badge should not be visible
    And the Remove button is not visible

    @positive
Scenario: Add all items and remove a random amount
    When I am on the Inventory page
    And I click all available Add to cart buttons
    Then the shopping cart badge should display "6"
    When I remove a random number of items from the cart
    Then the shopping cart badge should reflect the remaining items


