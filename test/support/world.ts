import { IWorldOptions, World } from '@cucumber/cucumber'
import { BrowserContext, Page } from '@playwright/test'

/**
 * Custom World interface that extends Cucumber's base World.
 * Provides typed access to Playwright browser instances and context.
 */
export interface ICustomWorld extends World {
  /** Playwright Page instance for browser automation */
  page?: Page
  /** Playwright BrowserContext for managing browser state and cookies */
  context?: BrowserContext
  // Add this line to resolve the error:
  expectedCount?: number

  // If you used 'removedCount' in your previous snippet, add that too:
  removedCount?: number
}

/**
 * Custom World class for Cucumber scenarios.
 * Each scenario gets a fresh instance of this class, ensuring test isolation.
 * The World holds shared state (page, context) that's accessible across all step definitions.
 */
export class CustomWorld extends World implements ICustomWorld {
  /** Playwright Page instance for browser automation */
  page?: Page
  /** Playwright BrowserContext for managing browser state and cookies */
  context?: BrowserContext

  /**
   * Creates a new CustomWorld instance for a Cucumber scenario.
   * @param options - World options provided by Cucumber, including parameters from cucumber.js
   */
  constructor(options: IWorldOptions) {
    super(options)
  }
}
