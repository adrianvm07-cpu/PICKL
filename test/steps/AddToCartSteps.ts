import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { InventoryPage } from '../../pages/AddToCartPage.js'
import { ICustomWorld } from '../support/world.js'

Given('I am able to login successfully', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const inventoryPage = new InventoryPage(this.page)
  await inventoryPage.goto()
  await inventoryPage.enterUsername()
  await inventoryPage.enterPassword()
  await inventoryPage.clickLogin()
})

/*
Then(
  'I check if the {string} heading is displayed',
  async function (this: ICustomWorld, pageHeading: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    //current format

    // 2. Initialize the Page Object
    const loginPage = new LoginPage(this.page)

    // 3. Get the value from your helper function
    const heading = await loginPage.getPageHeading()

    // 4. Perform the validation
    // Note: Using 'Products' (plural) to match SauceDemo's actual UI
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
    //console.log('Error message is:', errorMessage)
    //expect(errmsg).toBe('Test')
  },
)
*/
Then('I am on the Inventory page', { timeout: 5000 }, async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  /*
  await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
  */

  // Initialize the Page Object
  const inventoryPage = new InventoryPage(this.page)

  // Perform the validation
  // 1. Validate the URL
  await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
  await inventoryPage.validateOnPage()
  //console.log('Current URL is:', this.page.url())
})

When('I click on the product {string}', async function (this: ICustomWorld, productName: string) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const inventoryPage = new InventoryPage(this.page)
  await inventoryPage.clickInventoryItem(productName)
})

Then('I can see the product description', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const inventoryPage = new InventoryPage(this.page)

  // 1. Validate visibility
  await inventoryPage.verifyDescriptionIsVisible()

  // 2. Optional: Log the text to your console for debugging
  const text = await inventoryPage.getDescriptionText()
  console.log(` Validated description:  ${text}`)
})

Then('I can click on the Add to Cart button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const inventoryPage = new InventoryPage(this.page)
  await inventoryPage.addProductToCart()
})
