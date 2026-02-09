import { expect, Locator, Page } from '@playwright/test'

/**
 * Page Object Model for the Login page
 * URL: https://www.saucedemo.com/
 */
export class InventoryPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly inventoryContainer: Locator
  readonly productDescription: Locator
  readonly addToCartButton: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('[data-test="username"]')
    this.passwordInput = page.locator('[data-test="password"]')
    this.loginButton = page.locator('[data-test="login-button"]')
    this.inventoryContainer = page.locator('[data-test="inventory-container"]')
    this.productDescription = page.locator('[data-test="inventory-item-desc"]')
    this.addToCartButton = page.locator('[data-test="add-to-cart"]')
  }

  // 1. Navigate to the site
  async goto() {
    await this.page.goto('/')
  }

  /**
   * Enter username into the username field
   * @param username - The username to enter
   */
  async enterUsername() {
    // await this.usernameInput.fill(username)
    await this.usernameInput.fill('standard_user')
    await this.page.waitForTimeout(3000)
  }

  /**
   * Enter password into the password field
   * @param password - The password to enter
   */
  async enterPassword() {
    // await this.passwordInput.fill(password)
    await this.passwordInput.fill('secret_sauce')
    await this.page.waitForTimeout(3000)
  }

  /**
   * Click the login button
   */
  async clickLogin() {
    await this.loginButton.click()
    await this.page.waitForTimeout(3000)
  }

  // Validate if on the correct page after login
  async validateOnPage() {
    // 2. Validate a unique element exists on this page
    await expect(this.inventoryContainer).toBeVisible()
  }

  // Select an item from the Inventory list
  /**
   * Clicks on a product title based on the text provided
   * @param productName e.g., "Sauce Labs Backpack"
   */
  async clickInventoryItem(productName: string) {
    // We use Playwright's 'hasText' to find the specific item link
    const itemLocator = this.page.locator('.inventory_item_name', { hasText: productName })

    // Ensure it's visible before clicking
    await expect(itemLocator).toBeVisible()
    await itemLocator.click()
  }

  // Verify product description
  async verifyDescriptionIsVisible() {
    // Ensures the element is not only present but visible to the user
    await expect(this.productDescription).toBeVisible()
  }

  async getDescriptionText(): Promise<string | null> {
    return this.productDescription.textContent()
  }

  // Click on Add to Cart button
  async addProductToCart() {
    // Ensure the button is visible and enabled before clicking
    await expect(this.addToCartButton).toBeVisible()
    await this.addToCartButton.click()
  }
}
