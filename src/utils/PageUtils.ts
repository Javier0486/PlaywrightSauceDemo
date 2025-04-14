import { Page } from "playwright";

/**
 * Utility class providing common page operations as static methods.
 * Implements Utility Pattern to promote code reuse across tests.
 * 
 * Key features:
 * - Offers common page operations as reusable utilities
 * - Contains stateless, static methods
 * - Can be used across different pages/tests
 * - Reduces code duplication
 */
export class PageUtils { 
    /**
     * Gets the current page URL
     * @param page Playwright Page object
     * @returns Promise resolving to current URL string
     */
    static async getCurrentUrl(page: Page): Promise<string> { 
        return page.url();
    }

    /**
     * Validates that the current page URL matches the expected URL
     * @param page Playwright Page object
     * @param expectedUrl The URL to validate against
     * @throws Error if URLs don't match
     */
    static async validateUrl(page: Page, expectedUrl: string): Promise<void> {
        const currentUrl = await page.url();
        if (currentUrl !== expectedUrl) {
            throw new Error(`URL mismatch: Expected ${expectedUrl}, but got ${currentUrl}`);
        }
    }
}      