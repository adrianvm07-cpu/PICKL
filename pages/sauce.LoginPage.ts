import { Locator, Page } from '@playwright/test'

/**
 * Page Object Model for the Login page
 * URL: https://www.saucedemo.com/
 */
export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly errorLocator: Locator
  readonly pageHeading: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('[data-test="username"]')
    this.passwordInput = page.locator('[data-test="password"]')
    this.loginButton = page.locator('[data-test="login-button"]')
    this.errorLocator = page.locator('[data-test="error"]')
    this.pageHeading = page.locator('.title')
  }

  // 1. Navigate to the site
  async goto() {
    await this.page.goto('https://www.saucedemo.com/')
  }

  /**
   * Enter username into the username field
   * @param username - The username to enter
   */
  async enterUsername(username: string) {
    await this.usernameInput.fill(username)
    await this.page.waitForTimeout(3000)
  }

  /**
   * Enter password into the password field
   * @param password - The password to enter
   */
  async enterPassword(password: string) {
    await this.passwordInput.fill(password)
    await this.page.waitForTimeout(3000)
  }

  /**
   * Click the login button
   */
  async clickLogin() {
    await this.loginButton.click()
    await this.page.waitForTimeout(3000)
  }

  /**
   * Get the current page heading text
   * @returns The page heading text
   */

  // Valid Login - validate if "Products" header exists
  async getPageHeading(): Promise<string> {
    // 1. Locate the element
    // 2. Extract the text content
    // 3. Return it (or an empty string if null)
    const headingText = await this.page.locator('.title').textContent()
    return headingText ?? ''
  }

  // Invalid Login - validate error message is displayed

  //AI Generated
  /*get errorContainer() {
    return this.page.locator('[data-test="error"]')
  }*/

  //Existing format
  async getErrorMessage(): Promise<string> {
    const errorMessage = await this.page.locator('[data-test="error"]').textContent()
    return errorMessage ?? ''
  }
}
