import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export default class LivHomepage {
    private page: Page;

    readonly searchLocator: Locator;
    readonly categoriasLocator: (optionName: string) => Locator; 
    readonly menuOptionsLocator: (optionName: string) => Locator;
    readonly iconBulletLocator: Locator;
    readonly categoryProductLocator: (categoryName: string) => Locator;
    readonly categoryMenuLogoLocator: Locator;

    constructor(page: Page){
        this.page = page;

        this.searchLocator = this.page.locator('#mainSearchbar').first();
        this.categoriasLocator = (optionName: string) => this.page.locator(`//span[normalize-space(text())='${optionName}']`);
        this.menuOptionsLocator = (optionName: string) => this.page.locator(`//a[normalize-space(text())='${optionName}']`);
        this.iconBulletLocator = this.page.locator('.iconBullet');
        this.categoryProductLocator = (categoryName: string) => this.page.locator(`//a[normalize-space(text())='${categoryName}']`);
        this.categoryMenuLogoLocator = this.page.locator('.i-header-logo')
    }

    public async searchProduct(product: string, categoryProd?: string) {
        await this.page.waitForLoadState('load')
        await this.searchLocator.waitFor({ state: 'visible' });

        await this.searchLocator.fill('');
        await this.searchLocator.fill(product);

        await this._submitSearchWithRetry();
        //await this.page.waitForTimeout(15000);

        await this._waitForSearchResults();

        if(categoryProd && await this.iconBulletLocator.isVisible()) {
            await this._clickOnProductCategory(categoryProd);
            await this.page.waitForSelector('.m-product__listingPlp')
        }

    }

    private async _submitSearchWithRetry() {
        //try different methods to submit search
        try {
            // Method 1: Direct press on search field
            await this.searchLocator.click();
            await this.searchLocator.press('Enter');

            // small wait
            await this.page.waitForTimeout(500);
        } catch {
            // Method 2: Direct keyboard press
            await this.page.keyboard.press('Enter');

            // Method 3: multiple presses
            for(let i=0; i<3; i++){
                await this.page.keyboard.press('Enter', { delay: 1000 });
                await this.page.waitForTimeout(500);
            }
        }
    }

    private async _waitForSearchResults() {
        // Try multiple ways to confirm search completed
        try {
            await Promise.race([
                this.page.waitForURL(/tienda/),
                this.page.waitForSelector('.m-product__listingPlp', { state: 'visible', timeout: 15000 }),
            ])
        } catch (error) {
            throw new Error(`Search results didn't appear: ${error}`);
        }
    }

    private async _clickOnProductCategory(product: string){
        await this.categoryProductLocator(product).click();
    }

    public async clickOptionsInPage(optionInPage: string) {
        await this.categoriasLocator(optionInPage).click();
    }

    public async mouseOverCategory(option: string) {
        await this.categoryProductLocator(option).hover();
    }

    public async clickCategory(option: string) {
        await this.categoryProductLocator(option).click();
    }

    public async validateCategoryMenuLogo() {
        await expect(this.categoryMenuLogoLocator).toBeTruthy();
    }

    public async validateOptionMenuDisplayed(submenuOption: string) {
        await expect(this.categoryProductLocator(submenuOption)).toBeTruthy()
    }

}