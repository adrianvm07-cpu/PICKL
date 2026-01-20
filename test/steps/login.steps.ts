import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage.js'
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

Then('I should see the secure area page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const loginPage = new LoginPage(this.page)
  const isSecureArea = await loginPage.isOnSecureArea()
  expect(isSecureArea).toBeTruthy()
})

Then(
  'I should see a success message {string}',
  async function (this: ICustomWorld, expectedMessage: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    const loginPage = new LoginPage(this.page)
    const flashMessage = await loginPage.getFlashMessage()
    expect(flashMessage).toContain(expectedMessage)
  },
)

Then(
  'I should see an error message {string}',
  async function (this: ICustomWorld, expectedMessage: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    const loginPage = new LoginPage(this.page)
    const flashMessage = await loginPage.getFlashMessage()
    expect(flashMessage).toContain(expectedMessage)
  },
)

Then('I should remain on the login page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const loginPage = new LoginPage(this.page)
  const isLoginPage = await loginPage.isOnLoginPage()
  expect(isLoginPage).toBeTruthy()
})
