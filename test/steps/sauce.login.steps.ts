import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { LoginPage } from '../../pages/sauce.LoginPage.js'
import { ICustomWorld } from '../support/world.js'

Given('I am on the login page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const loginPage = new LoginPage(this.page)
  await loginPage.goto()
})

When('I enter username {string}', async function (this: ICustomWorld, username: string) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const loginPage = new LoginPage(this.page)
  await loginPage.enterUsername(username)
})

When('I enter password {string}', async function (this: ICustomWorld, password: string) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const loginPage = new LoginPage(this.page)
  await loginPage.enterPassword(password)
})

When('I click the login button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const loginPage = new LoginPage(this.page)
  await loginPage.clickLogin()
})

Then(
  'I check if the {string} heading is displayed',
  async function (this: ICustomWorld, pageHeading: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    //Existing format

    // 2. Initialize the Page Object
    const loginPage = new LoginPage(this.page)

    // 3. Get the value from your helper function
    const heading = await loginPage.getPageHeading()

    // 4. Perform the validation
    expect(heading).toBe(pageHeading)
  },
)

Then(
  'I should see an error message {string}',
  async function (this: ICustomWorld, errorMessage: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    //Existing format
    const loginPage = new LoginPage(this.page)
    const errmsg = await loginPage.getErrorMessage()
    expect(errmsg).toBe(errorMessage)

    //** Additional validation for retrieved field
    //console.log('Error message is:', errorMessage)
    //expect(errmsg).toBe('Test')
  },
)

Then('I should remain on the login page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  await expect(this.page).toHaveURL('https://www.saucedemo.com/')

  //** Additional validation for target URL
  //console.log('Current URL is:', this.page.url())
})
