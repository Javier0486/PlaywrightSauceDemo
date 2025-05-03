import { Page, Locator } from "playwright";

export default class LivSearchPage {
    private page: Page;

    readonly playOptionsLocator: (optionName: string) => Locator;
    readonly productLocator: (productName: string) => Locator;
    readonly priceLocator: (productName: string) => Locator;

    constructor(page: Page){
        this.page = page;

        this.playOptionsLocator = (optionName: string) => this.page.locator(`//a[normalize-space(text())='${optionName}']`);
        this.productLocator = (productName: string) => this.page.locator(`//h3[normalize-space(text())='${productName}']`);
        this.priceLocator = (productName: string) => this.page.locator(`//h3[normalize-space(text())='${productName}']/ancestor::article[@class="ipod-d-block"]/following-sibling::div//p[contains(., "$")]`);
    }

    public async clickOnProduct(product: string){
        await this.productLocator(product).click();
    }
 
    public async getProductPrice(product: string): Promise<string> {
        const priceElement = await this.priceLocator(product).last();

        const priceText = await priceElement.innerText();

        return priceText
            .replace(/\s+/g, '') // remove all whitespace
            .replace('$', '$')  // ensure sign
            .replace(/(\d+)(\d{2})$/, '$1.$2'); // add decimal point
    }

}