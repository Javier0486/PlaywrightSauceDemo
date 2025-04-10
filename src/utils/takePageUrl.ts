import { Page } from "playwright";

export class PageUtils {
    static async getCurrentUrl(page: Page): Promise<string> {
        return page.url();
    }
}