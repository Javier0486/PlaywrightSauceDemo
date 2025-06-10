import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export default class LivBuyPage {
    private page: Page;

    readonly priceLocator: (productName: string) => Locator;
    readonly productNameLocator: (productName: string) => Locator;
    readonly greenAddBannerLocator: Locator;
    readonly addToCartLocator: Locator;
    readonly guarantyButtonsLocator: Locator;
    

    constructor(page: Page) {
        this.page = page;

        this.priceLocator = (productName: string) => this.page.locator(`//p[normalize-space(text())='${productName}']/ancestor::div[@class="product-header-container liverpool wide-layout"]/following-sibling::div[@class="m-product__price-dw-promotion"]//div//p`);
        this.productNameLocator = (productName: string) => this.page.locator(`//p[normalize-space(text())='${productName}']`);
        this.greenAddBannerLocator = this.page.locator('//div[@class=" m-mdc__snackbarLabel mdc-snackbar__label" and contains(., "Agregaste")]')
        this.addToCartLocator = this.page.locator('#opc_pdp_addCartButton').first();
        this.guarantyButtonsLocator = this.page.locator('.complementaryService-modal__buttons__conatiner__items');

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

    public async addProductNoGuarantyAndValidateGreenAlert() {
        await this.addToCartLocator.click();
        await this.guarantyButtonsLocator.first().click();

        expect(await this.greenAddBannerLocator).toBeAttached();
    }

    public async addProductWithGuarantyAndValidateGreenAlert() {
        await this.addToCartLocator.click();
        await this.guarantyButtonsLocator.last().click();

        expect(await this.greenAddBannerLocator).toBeAttached();
        
    }
}