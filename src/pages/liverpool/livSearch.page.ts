import { Page, Locator } from "playwright";
import { expect } from "@playwright/test";

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

        const radioInput = optionToselect.locator('input[type="radio"]');
        const isChecked = await radioInput.isChecked();

        if (!isChecked) {
            await expect(optionToselect).toBeEnabled({ timeout: 5000});
            await optionToselect.click({ force: true });
            await this.page.waitForTimeout(500);
            console.log(`Radio button for ${option} is clicked successfully`);

            await this._waitForProductListToUpdate(previousIds);
        } else {
            console.log(`Radio button for ${option} is already selected. Skipping click and wait`);
        }

    }

    public async takeNumberOfProducts(option: string): Promise<number> {
        const filterLocator = await this.searchFilterLocator(option);
        await filterLocator.waitFor({ state: 'visible' });

        const initialText = await filterLocator.innerText();
        const initialMatch = initialText.match(/\((\d+)\)/);
        const initialCount = initialMatch ? parseInt(initialMatch[1], 10) : null;

        const timeout = 6000;
        const interval = 250;
        const startTime = Date.now();

        let currentCount: number | null = null;

        while(Date.now() - startTime < timeout) {
            const currentText = await filterLocator.innerText();
            const match = currentText.match(/\((\d+)\)/);

            if(match && match[1]){
                currentCount = parseInt(match[1], 10);
                if(!isNaN(currentCount)) {
                    if(initialCount === null || currentCount !== initialCount){
                        console.log(`the number between parentheses is ${currentCount}`);
                        return currentCount;
                    }
                }
            }
            await this.page.waitForTimeout(interval);
        }

        throw new Error(`product count in the filter '${option}' didn't change from the initial value (${initialCount}) within ${timeout}`);

    }

    public async validateResultsCount(countExpected: number) {
        
        const countInSearch = await this.productCardLocator.count();
        console.log(`the count of products in page is ${countInSearch}`)

        const maxAllowed = countExpected + 6;

        await expect(countInSearch).toBeGreaterThanOrEqual(countExpected);
        await expect(countInSearch).toBeLessThanOrEqual(maxAllowed);
    }

    private async _waitForProductListToUpdate(previousIds: string[]): Promise<void> {
        await expect.poll(
            async () => {
                const elements = await this.productCardLocator.elementHandles();
                const ids: string[] = [];

                for (const el of elements){
                    const id = await el.getAttribute('data-prodid');
                    if (id) ids.push(id);
                }
                console.log('Previous IDs: ', previousIds);
                console.log('Current IDs: ', ids);

                return ids.sort();
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
        const caseInsensitive = new RegExp(`^${brandName}$`, 'i');
        await this.page.waitForLoadState('networkidle');
                
        const totalBrands = await this.brandInSearchLocator.all();
        console.log(`total brand Elements found: ${totalBrands}`);

        let atLeastOneValid = false;
        let visibleCount = 0;

        for(const brand of totalBrands){
            if(await brand.isVisible()) {
                visibleCount++;
                const text = await brand.textContent();
                if(text?.match(caseInsensitive)){
                    atLeastOneValid = true;
                    await expect.soft(brand).toHaveText(caseInsensitive);
                }
            }
        }
        console.log(`Visible brand elements: ${visibleCount}`);

        if(!atLeastOneValid) {
            throw new Error(`No visible brand matched '${brandName}' (case-insensitive)`);
        }
    }

}