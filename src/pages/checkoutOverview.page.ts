import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export class CheckoutOverviewPage {
    private page: Page;

    //locators
    readonly articles: (productName: string) => Locator;

    constructor(page: Page) {
        this.page = page;

        //inicializamos locators
        this.articles = (productName: string) => this.page.locator(`//div[normalize-space(text())='${productName}']`);
    }

    //metodo para validar productoes en Checkout: Overview page
    public async validateProductsDisplayed(product: string[]) {
        for (let i=0; i<product.length; i++) {
            expect(await this.articles(product[i])).toBeVisible();
        }
    }
}