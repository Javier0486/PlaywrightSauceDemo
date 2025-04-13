import { Page } from "playwright";

/**
 * Utility class for common page operations
 * Contains reusable static methods
 */
export class PageUtils { // Utility Pattern
    static async getCurrentUrl(page: Page): Promise<string> { // Reusable utility
        return page.url();
    }

    static async validateUrl(page: Page, expectedUrl: string): Promise<void> {
        const currentUrl = await page.url();
        if (currentUrl !== expectedUrl) {
            throw new Error(`URL mismatch: Expected ${expectedUrl}, but got ${currentUrl}`);
        }
    }
}

/*
* This provides utility fiunctions that:
* - Offer common page operations
* - Can be used across different pages/tests
* - Promote code reuse
*
*/