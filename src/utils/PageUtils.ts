import { Page } from "playwright";

export class PageUtils {
    static async getCurrentUrl(page: Page): Promise<string> {
        return page.url();
    }

    static async validateUrl(page: Page, expectedUrl: string): Promise<void> {
        const currentUrl = await page.url();
        if (currentUrl !== expectedUrl) {
            throw new Error(`URL mismatch: Expected ${expectedUrl}, but got ${currentUrl}`);
        }
    }
}