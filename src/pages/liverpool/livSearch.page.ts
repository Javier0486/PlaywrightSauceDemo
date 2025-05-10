import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export default class LivSearchPage {
    private page: Page;

    readonly playOptionsLocator: (optionName: string) => Locator;
    readonly productLocator: (productName: string) => Locator;
    readonly priceLocator: (productName: string) => Locator;
    readonly searchFilterLocator: (optionName: string) => Locator;
    readonly productCardLocator: Locator;
    readonly brandSearchInputLocator: Locator;
    readonly brandInSearchLocator: Locator;

    constructor(page: Page){
        this.page = page;

        this.playOptionsLocator = (optionName: string) => this.page.locator(`//a[normalize-space(text())='${optionName}']`);
        this.productLocator = (productName: string) => this.page.locator(`//h3[normalize-space(text())='${productName}']`);
        this.priceLocator = (productName: string) => this.page.locator(`//h3[normalize-space(text())='${productName}']/ancestor::article[@class="ipod-d-block"]/following-sibling::div//p[contains(., "$")]`);
        this.searchFilterLocator = (optionName: string) => this.page.locator(`//label[contains(., '${optionName}')]`);
        this.productCardLocator = this.page.locator('.m-product__card');
        this.brandSearchInputLocator = this.page.locator('#searchBrand');
        this.brandInSearchLocator = this.page.locator('.a-card-brand');
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

    public async selectCheckbox(option: string, section: string) {
        const sectionToScroll = await this.searchFilterLocator(section);
        console.log(`section to scroll ${sectionToScroll}`);

        await sectionToScroll.waitFor({ state: 'visible' });
        await sectionToScroll.scrollIntoViewIfNeeded();

        const optionToSelect = this.searchFilterLocator(option).locator('xpath=ancestor::div[@class="m-checkbox__button mdc-form-field"]/div');
        console.log(`checkbox selected ${optionToSelect}`);

        await optionToSelect.waitFor({ state: 'visible' });
        await optionToSelect.scrollIntoViewIfNeeded();

        await this.page.waitForTimeout(500);

        await this._waitForAllProductsVisible();
        const previousIds = await this._getVisibleProductIds();
        
        await expect(optionToSelect).toBeEnabled();
        await optionToSelect.click({ force: true });
        console.log(`Checkbox for ${option}" clicked successfully`);

        await this._waitForProductListToUpdate(previousIds);
    }

    public async selectRadioButton(option: string, section: string) {
        const sectionToScroll = await this.searchFilterLocator(section);
        console.log(`section to scroll ${sectionToScroll}`);

        await sectionToScroll.waitFor({ state: "visible" });
        await sectionToScroll.scrollIntoViewIfNeeded();

        const optionToselect = this.searchFilterLocator(option).locator('xpath=ancestor::div[@class="m-radioButton mdc-form-field"]/div');
        console.log(`radiobutton selected ${optionToselect}`);

        await optionToselect.waitFor({ state: 'visible' });
        await optionToselect.scrollIntoViewIfNeeded();

        await this._waitForAllProductsVisible();
        const previousIds = await this._getVisibleProductIds();

        await expect(optionToselect).toBeEnabled({ timeout: 5000 });
        await optionToselect.click({ force: true });
        console.log(`Radio button for ${option} is clicked successfully`);

        await this._waitForProductListToUpdate(previousIds);
    }

    public async takeNumberOfProducts(option: string): Promise<number> {
        const filterLocator = await this.searchFilterLocator(option);

        await filterLocator.waitFor({ state: 'visible' });

        const fullOptionFilter= await filterLocator.innerText();

        const match = fullOptionFilter.match(/\((\d+)\)/);

        if(match) {
            return +match[1];
        } else {
            throw new Error(`No product count found in the filter text: ${fullOptionFilter}`);
        }
    }

    public async validateResultsCount(countExpected: number) {
        
        const countInSearch = await this.productCardLocator.count();

        await expect(countInSearch).toBe(countExpected);
    }

    private async _waitForProductListToUpdate(previousIds: string[]): Promise<void> {
        await expect.poll(
            async () => {
                const elements = await this.productCardLocator.elementHandles();
                const ids = [];

                for (const el of elements){
                    const id = await el.getAttribute('data-prodid');
                    if (id) ids.push(id);
                }
                return ids;
            },
            {
                timeout: 15000,
                message: 'Timed out waiting for product list ti update',
            }
        ).not.toEqual(previousIds);
    }

    private async _getVisibleProductIds(): Promise<string[]> {
        const count = await this.productCardLocator.count();
        await expect(this.productCardLocator).toHaveCount(count, { timeout: 10000 });

        const ids: string[] = [];
        for(let i=0; i<count; i++) {
            const id = await this.productCardLocator.nth(i).getAttribute('data-prodid');
            if(id) ids.push(id);
        }
        return ids;
    }

    private async _waitForAllProductsVisible(): Promise<void> {
        //await this.page.waitForLoadState('networkidle');
        const count = await this.productCardLocator.count();
        for(let i=0; i<count; i++) {
            await expect(this.productCardLocator.nth(i)).toBeVisible({ timeout: 10000 });
            await expect(this.productCardLocator.nth(i)).toHaveAttribute('data-prodid', /.+/, { timeout: 10000 });
        }
    }

    public async searchBrand(brandName: string) {
        const brandElement = this.brandSearchInputLocator;
        await brandElement.fill(brandName);
    }

    public async validateProductBrandSearch(brandName: string) {
        const count = await this.productCardLocator.count();
        const caseInsensitive = new RegExp(`^${brandName}$`, 'i');

        for(let i=1; i<count; i++){
            await expect.soft(this.brandInSearchLocator.nth(i)).toHaveText(caseInsensitive);
        }
    }

}