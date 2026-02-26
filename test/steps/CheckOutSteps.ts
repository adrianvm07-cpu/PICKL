import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CheckOutPage } from '../../pages/CheckOutPage.js'
import { ICustomWorld } from '../support/world.js'

Given('User is already logged in', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const checkOutPage = new CheckOutPage(this.page)
  await checkOutPage.goto()
  await checkOutPage.enterUsername()
  await checkOutPage.enterPassword()
  await checkOutPage.clickLogin()
})
Then('User is on the Inventory page', { timeout: 3000 }, async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  // Initialize the Page Object
  const checkOutPage = new CheckOutPage(this.page)

  // Perform the validation
  // 1. Validate the URL
  await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
  await checkOutPage.validateOnPage()
  //console.log('Current URL is:', this.page.url())
})

When('User selects product {string}', async function (this: ICustomWorld, productName: string) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const checkOutPage = new CheckOutPage(this.page)
  await checkOutPage.clickInventoryItem(productName)
})

Then('User can see the product description', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const checkOutPage = new CheckOutPage(this.page)

  // 1. Validate visibility
  await checkOutPage.verifyDescriptionIsVisible()

  // 2. Optional: Log the text to your console for debugging
  //nst text = await checkOutPage.getDescriptionText()
  //console.log(` Validated description:  ${text}`)
})

Then('User clicks on the Add to Cart button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const checkOutPage = new CheckOutPage(this.page)
  await checkOutPage.addProductToCart()
})
Then('I can see the Add to cart button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const checkOutPage = new CheckOutPage(this.page)
  await checkOutPage.validateAddToCartBttnIsVisible()
  // only need to be visible
})

Then(
  'the shopping cart badge updates to {string}',
  async function (this: ICustomWorld, count: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    const checkOutPage = new CheckOutPage(this.page)
    await checkOutPage.verifyCartCount(count)
  },
)
When('User clicks on the Shopping Cart Icon', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const checkOutPage = new CheckOutPage(this.page)
  await checkOutPage.goToCart()
})
Then('User should see items present in the cart', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const checkOutPage = new CheckOutPage(this.page)
  const count = await checkOutPage.getCartItemCount()

  // Validates that at least one item exists in the container
  expect(count).toBeGreaterThan(0)
})
Then(
  'User can click on the Add to Cart button and get the price',
  async function (this: ICustomWorld) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    const checkOutPage = new CheckOutPage(this.page)

    // Fetch the price returned by the page object
    const price = await checkOutPage.addItemAndPrice()

    // Initialize or update the total in your World context
    this.totalPrice = (this.totalPrice ?? 0) + price

    // console.log(`Added item price: $${price}. Current total: $${this.totalPrice}`)
  },
)

Then('User clicks on the Checkout button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const checkOutPage = new CheckOutPage(this.page)
  await checkOutPage.clickCheckOutbttn()
})
Then(
  'User can see the Checkout: Your Information page',
  { timeout: 5000 },
  async function (this: ICustomWorld) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    // Initialize the Page Object
    const checkOutPage = new CheckOutPage(this.page)

    // Perform the validation
    await checkOutPage.validateOnCheckoutPage()
    //console.log('Current URL is:', this.page.url())
  },
)
Then('User can add the Shipping details', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const checkOutPage = new CheckOutPage(this.page)
  await checkOutPage.enterFirstName()
  await checkOutPage.enterLastName()
  await checkOutPage.enterZipCode()
})
Then('User clicks on the Continue button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const checkOutPage = new CheckOutPage(this.page)
  await checkOutPage.clickContinue()
})
Then('User clicks on the Finish button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const checkOutPage = new CheckOutPage(this.page)
  await checkOutPage.clickFinish()
})
Then('the subtotal should match the sum of added items', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const checkOutPage = new CheckOutPage(this.page)

  // This uses the logic we fixed to extract the price from "Item total: $29.99"
  const actualSubtotal = await checkOutPage.getCheckoutSubtotal()

  // Compare the UI value against the sum we stored in ICustomWorld
  if (actualSubtotal !== this.totalPrice) {
    throw new Error(
      `Price Mismatch! Calculated: $${this.totalPrice}, but UI shows: $${actualSubtotal}`,
    )
  }

  // console.log(`Success! Subtotal $${actualSubtotal} matches calculated total.`)
})
Then(
  'I can see the Confirmation Page with the message {string}',
  async function (this: ICustomWorld, expectedMessage: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    const checkOutPage = new CheckOutPage(this.page)

    // This handles the waiting, the whitespace, and the assertion in one go
    await checkOutPage.validateConfirmationMessage(expectedMessage)
  },
)
