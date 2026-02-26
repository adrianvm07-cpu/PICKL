@smoke
Feature: Check Out Functionality
  As a user
  I want to login to the application
  and select items that I want to add to my cart
  and proceed to Check out

  Background:
    Given User is already logged in

    @positive
  Scenario: Select a product then Add to Cart and Checkout
    When User is on the Inventory page
    And User selects product "Sauce Labs Backpack"
    Then User can see the product description
    And User can click on the Add to Cart button and get the price
    Then the shopping cart badge updates to "1"
    When User clicks on the Shopping Cart Icon
    Then User should see items present in the cart
    When User clicks on the Checkout button
    Then User can see the Checkout: Your Information page
    And User can add the Shipping details
    When User clicks on the Continue button
    Then the subtotal should match the sum of added items
    And User clicks on the Finish button
    Then I can see the Confirmation Page with the message "Thank you for your order!"




