import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export default class LivBuyPage {
    private page: Page;

    readonly priceLocator: (productName: string) => Locator;
    readonly productNameLocator: (productName: string) => Locator;

    constructor(page: Page) {
        this.page = page;

        this.priceLocator = (productName: string) => this.page.locator(`//p[normalize-space(text())='${productName}']/ancestor::div[@class="product-header-container liverpool wide-layout"]/following-sibling::div[@class="m-product__price-dw-promotion"]//div//p`);
        this.productNameLocator = (productName: string) => this.page.locator(`//p[normalize-space(text())='${productName}']`);
    }

    public async validateProductTitle(product: string) {
        await this.productNameLocator(product).waitFor({ state: 'visible' });
        await expect(await this.productNameLocator(product)).toBeTruthy();
    }

    public async validatePrice(product: string, price: string) {
        const priceInBuyPage = await this.priceLocator(product).last();

        const priceInBuyPageText = await priceInBuyPage.innerText();

        const formatedPrice = priceInBuyPageText
            .replace(/\s+/g, '') // remove all whitespace
            .replace('$', '$') // ensure sign
            .replace(/(\d+)(\d{2})$/, '$1.$2'); // add decimal point
            
        console.log(`${formatedPrice} is equal to ${price}`);

        await expect(formatedPrice).toBe(price);
    }
}