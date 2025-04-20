import exp from "constants";
import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export default class AEHomepage {
    private page: Page;

    //Locators
    readonly menusLocator: (menuName: string) => Locator;
    readonly addToCartLocator: (productName: string) => Locator;
    readonly priceLocator: (productName: string) => Locator;
    readonly continueShoppingLocator: Locator;

    constructor(page: Page){
        this.page = page;

        // initialize locators
        this.menusLocator = (menuName: string) => this.page.locator(`//a[normalize-space(text())='${menuName}']`);
        this.addToCartLocator = (productName: string) => this.page.locator(`//p[normalize-space(text())='${productName}']/ancestor::div[@class="productinfo text-center"]//a`);
        this.priceLocator = (productName: string) => this.page.locator(`//p[normalize-space(text())='${productName}']/ancestor::div[@class="productinfo text-center"]//h2[contains(text(), 'Rs.')]`);
        this.continueShoppingLocator = this.page.locator('//button[normalize-space(text())="Continue Shopping"]');
    }

    public async clickMenuElements(menuSelected: string){
        await this.menusLocator(menuSelected).scrollIntoViewIfNeeded();
        await this.menusLocator(menuSelected).click();
    }

    public async validateMenuOptions(menuOptions: string[]) {
        for(let i=0; i<menuOptions.length; i++) {
            expect(await this.menusLocator(menuOptions[i])).toBeVisible();
        }
    }

    public async addProducts(productName: string[]) {
        for (let i=0; i<productName.length; i++) {
            await this.addToCartLocator(productName[i]).nth(0).waitFor({ state: "visible", timeout: 5000 })
            await this.addToCartLocator(productName[i]).nth(0).click();
            await this.continueShoppingLocator.waitFor({ state: 'visible', timeout: 5000 });
            await this.continueShoppingLocator.click();
        }
    }

    public async getPrices(productName: string[]) {
        let prices: string[] = [];
        for(let i=0; i<productName.length; i++) {
            const price = (await this.priceLocator(productName[i]).nth(0).innerText()).trim();
            prices.push(price);
        }
        return prices;
    }

    
}