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
Then('I am on the Inventory page', { timeout: 5000 }, async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

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
  //nst text = await inventoryPage.getDescriptionText()
  //console.log(` Validated description:  ${text}`)
})

Then('I can click on the Add to Cart button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const inventoryPage = new InventoryPage(this.page)
  await inventoryPage.addProductToCart()
})
Then('I can see the Add to cart button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const inventoryPage = new InventoryPage(this.page)
  await inventoryPage.validateAddToCartBttnIsVisible()
  // only need to be visible
})
Then('I can see the shopping cart icon', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const inventoryPage = new InventoryPage(this.page)
  await inventoryPage.shoppingCart()
  // only need to be visible
})

Then(
  'the shopping cart badge should show {string}',
  async function (this: ICustomWorld, count: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    const inventoryPage = new InventoryPage(this.page)
    await inventoryPage.verifyCartCount(count)
  },
)

When('I randomly select an item in the list', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const inventoryPage = new InventoryPage(this.page)
  await inventoryPage.clickRandomProduct()
})

Then('I can see the Remove button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const inventoryPage = new InventoryPage(this.page)
  await inventoryPage.validateRemoveBttnIsVisible()
})
When('I click on Remove button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const inventoryPage = new InventoryPage(this.page)
  await inventoryPage.clickRemoveBttn()
})
When('the shopping cart badge should not be visible', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const inventoryPage = new InventoryPage(this.page)
  await expect(inventoryPage.shoppingCartBadge).toBeHidden()

  // Alternative approach: check if count is 0
  // await expect(productPage.cartBadge).toHaveCount(0);
})
Then('the Remove button is not visible', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const inventoryPage = new InventoryPage(this.page)
  await expect(inventoryPage.removeBttn).toBeHidden()

  // Alternative approach: check if count is 0
  // await expect(productPage.cartBadge).toHaveCount(0);
})
When('I click all available Add to cart buttons', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const inventoryPage = new InventoryPage(this.page)
  await inventoryPage.clickAllAddToCartButtons()
})
Then(
  'the shopping cart badge should display {string}',
  async function (this: ICustomWorld, expectedCount: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const inventoryPage = new InventoryPage(this.page)
    const actualCount = await inventoryPage.getCartCount()

    expect(actualCount).toBe(expectedCount)
  },
)
When('I remove all items from the cart', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const inventoryPage = new InventoryPage(this.page)
  await inventoryPage.clickAllRemoveButtons()
})
When('I click on the Shopping Cart Icon', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const inventoryPage = new InventoryPage(this.page)
  await inventoryPage.goToCart()
})
Then('I should see items present in the cart', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const inventoryPage = new InventoryPage(this.page)
  const count = await inventoryPage.getCartItemCount()

  // Validates that at least one item exists in the container
  expect(count).toBeGreaterThan(0)
})
When(
  'I randomly select {int} items in the list',
  async function (this: ICustomWorld, count: number) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    const inventoryPage = new InventoryPage(this.page)
    await inventoryPage.clickMultipleRandomProducts(count)
  },
)
When('I remove a random number of items from the cart', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const inventoryPage = new InventoryPage(this.page)

  /// Perform the action and capture the math
  const result: { removed: number; remaining: number } = await inventoryPage.removeRandomItems()

  // Store the expected remaining count for the assertion step
  this.expectedCount = result.remaining
  console.log(`Removed ${result.removed} items. Expecting ${this.expectedCount} left.`)
})
Then(
  'the shopping cart badge should reflect the remaining items',
  async function (this: ICustomWorld) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const inventoryPage = new InventoryPage(this.page)
    const actualCount = await inventoryPage.getCartBadgeCount()

    if (actualCount !== this.expectedCount) {
      throw new Error(`Badge mismatch! Expected: ${this.expectedCount}, but found: ${actualCount}`)
    }
  },
)
