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
  readonly shoppingCartIcon: Locator
  readonly shoppingCartBadge: Locator
  readonly productNames: Locator
  readonly removeBttn: Locator
  readonly allAddToCartBttns: Locator
  readonly allRemoveBttns: Locator
  readonly cartContainer: Locator
  readonly cartItems: Locator
  readonly inventoryItems: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('[data-test="username"]')
    this.passwordInput = page.locator('[data-test="password"]')
    this.loginButton = page.locator('[data-test="login-button"]')
    this.inventoryContainer = page.locator('[data-test="inventory-container"]')
    this.productDescription = page.locator('[data-test="inventory-item-desc"]')
    //this.addToCartButton = page.locator('button:has-text("Add to cart")')
    //this.addToCartButton = page.locator('button[data-test^="add-to-cart"]')
    this.addToCartButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"], [data-test="add-to-cart"]',
    )
    this.shoppingCartIcon = page.locator('[data-test="shopping-cart-link"]')
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]')
    this.productNames = page.locator('.inventory_item_name')
    this.removeBttn = page.locator('button:has-text("Remove")')
    this.allAddToCartBttns = page.locator('button[data-test^="add-to-cart"]')
    this.allRemoveBttns = page.locator('')
    this.cartContainer = page.locator('#cart_contents_container')
    this.cartItems = page.locator('.cart_item')
    this.inventoryItems = page.locator('.inventory_item')
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

  // Click on Add to Cart button inside Item Description
  async addProductToCart() {
    // Ensure the button is visible and enabled before clicking
    await expect(this.addToCartButton).toBeVisible()
    await this.addToCartButton.click()
  }

  // Shopping cart
  async shoppingCart() {
    await expect(this.shoppingCartIcon).toBeVisible()
  }

  // Shopping cart badge - After add to cart
  async verifyCartCount(expectedCount: string) {
    // Assert that the badge is visible and contains the correct text

    await this.page.waitForLoadState('domcontentloaded') // Ensure the page is loaded
    await this.shoppingCartBadge.waitFor({ state: 'visible', timeout: 3000 })

    await expect(this.shoppingCartBadge).toBeVisible()
    // toContainText is less sensitive to extra whitespace
    await expect(this.shoppingCartBadge).toContainText(expectedCount)
  }

  // Select random product from the Inventory List
  async clickRandomProduct() {
    // Wait for at least one element to be visible
    await this.productNames.first().waitFor()

    // Get the total number of products
    const count = await this.productNames.count()
    if (count === 0) {
      throw new Error('No products found on page')
    }
    // Generate a random index between 0 and count - 1
    const randomIndex = Math.floor(Math.random() * count)

    // Select the specific element and click it
    const randomProduct = this.productNames.nth(randomIndex)

    // Optional: Log the name so you know which one was picked during the test
    //const name = await randomProduct.innerText()
    //console.log(`Randomly selected product: ${name}`)

    await randomProduct.click()
  }

  // Validate "Remove" button is visible
  async validateRemoveBttnIsVisible() {
    await expect(this.removeBttn).toBeVisible()
  }

  // Click on "Remove" button
  async clickRemoveBttn() {
    //await this.removeBtnBackpack.click()
    await this.removeBttn.click()
  }

  // Validate "Remove" button is visible
  async validateAddToCartBttnIsVisible() {
    await expect(this.addToCartButton).toBeVisible()
  }

  // Click all Add to cart buttons
  async clickAllAddToCartButtons(): Promise<void> {
    // Use the specific 'Add to cart' text to avoid clicking 'Remove' buttons
    const addToCartButtons = this.page.getByRole('button', { name: /add to cart/i })
    const count = await addToCartButtons.count()
    for (let i = 0; i < count; i++) {
      // Always use .first() because after clicking the 0th button,
      // it changes to "Remove", so the next "Add to cart" button becomes the new .first()
      await addToCartButtons.first().click()
    }
  }

  // Update shopping cart badge - Dynamic
  async getCartCount(): Promise<string | null> {
    if (await this.shoppingCartBadge.isVisible()) {
      return this.shoppingCartBadge.textContent()
    }
    return '0'
  }

  // Click all Remove buttons
  async clickAllRemoveButtons(): Promise<void> {
    // Use a locator that specifically targets 'Remove' text
    const removeButtons = this.page.getByRole('button', { name: /remove/i })

    // Get the count of current Remove buttons
    const count = await removeButtons.count()

    for (let i = 0; i < count; i++) {
      // We use .first() because after clicking, that button disappears/changes,
      // so the next 'Remove' button in the list becomes the new .first()
      await removeButtons.first().click()
    }
  }

  // Click on Shopping Cart
  async goToCart() {
    // Ensure the button is visible and enabled before clicking
    await expect(this.shoppingCartIcon).toBeVisible()
    await this.shoppingCartIcon.click()
  }

  // Items present in the Cart
  async getCartItemCount(): Promise<number> {
    // Ensure the container is visible before counting
    await this.cartContainer.waitFor({ state: 'visible' })
    return this.cartItems.count()
  }
  /*
  // Randomly select {int} items in the list
  async clickMultipleRandomProducts(countToSelect: number) {
    await this.productNames.first().waitFor()
    const totalCount = await this.productNames.count()

    if (totalCount === 0) {
      throw new Error('No products found')
    }

    if (countToSelect > totalCount) {
      console.warn(`Requested ${countToSelect} items but only ${totalCount} exist. Selecting all.`)
      countToSelect = totalCount
    }

    // Use a Set to store unique random indices
    const indices = new Set<number>()
    while (indices.size < countToSelect) {
      const randomIndex = Math.floor(Math.random() * totalCount)
      indices.add(randomIndex)
    }

    // Iterate through the unique indices and click 'Add to Cart'
    for (const index of indices) {
      // Assuming you have a locator for the 'Add to Cart' buttons
      // If clicking the product name takes you away from the page,
      // you'd need to go back or click the specific "Add to Cart" button instead.
      const product = this.allAddToCartBttns.nth(index)
      await product.click()
    }
  }
*/
  async clickMultipleRandomProducts(countToSelect: number) {
    // 1. Wait for the items to exist
    await this.inventoryItems.first().waitFor()
    const totalCount = await this.inventoryItems.count()

    const actualToSelect = Math.min(countToSelect, totalCount)

    // 2. Get unique random indices
    const indices = Array.from({ length: totalCount }, (_, i) => i)
      .sort(() => 0.5 - Math.random())
      .slice(0, actualToSelect)

    // 3. Loop through items
    for (const index of indices) {
      // Scope the locator to the specific container index
      const item = this.inventoryItems.nth(index)
      const button = item.locator('button') // This finds the button inside THIS item only

      await button.waitFor({ state: 'visible' })

      // Check if it's already added (safety check)
      const btnText = await button.innerText()
      if (btnText.includes('Add to cart')) {
        await button.click()
        // Wait for the specific button in this container to toggle
        await expect(button).toHaveText(/Remove/i)
      }
    }
  }
  async removeRandomItems(): Promise<{ removed: number; remaining: number }> {
    const removeButtons = this.page.getByRole('button', { name: /remove/i })
    const totalInCart = await removeButtons.count()

    const maxToRemove = Math.min(totalInCart, 6)
    const numToRemove = Math.floor(Math.random() * maxToRemove) + 1

    for (let i = 0; i < numToRemove; i++) {
      await removeButtons.first().click()
    }

    // Calculate the remaining count here
    const remainingCount = totalInCart - numToRemove

    // Return an OBJECT instead of just a number
    return {
      removed: numToRemove,
      remaining: remainingCount,
    }
  }

  async getCartBadgeCount(): Promise<number> {
    const badge = this.page.locator('.shopping_cart_badge')
    if (await badge.isVisible()) {
      const text = await badge.innerText()
      return parseInt(text, 10)
    }
    return 0 // If badge is hidden, count is 0
  }
}
