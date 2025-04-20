import exp from "constants";
import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export default class AECartPage {
    private page: Page;

    // Locators
    readonly tableLineLocator: Locator;

    constructor(page:Page) {
        this.page = page;

        // initialize locators
        this.tableLineLocator = this.page.locator('//tbody//tr');
    }

    public async validateTableValues(expectedValues: string[], columnaIndex: number): Promise<boolean> {
        const rowCont = await this.tableLineLocator.count();

        // Remove duplicates from expectedValues
        const uniqueExpectedValues = [...new Set(expectedValues)];

        for (const val of uniqueExpectedValues) {
            let found = false;

            for(let i=0; i<rowCont; i++) {
                const line = this.tableLineLocator.nth(i);
                const cell = line.locator('td').nth(columnaIndex);

                await cell.scrollIntoViewIfNeeded();

                const text = (await cell.textContent())?.trim().replace(/\s+/g, ' ')
                console.log(`Validating value: ${val}, found in cell ${text?.trim()}`);

                if (text?.includes(val)) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                console.log(`Value not found: ${val}`)
                return false;
            }
        }

        return true;
    }

    private numberOfProductsPerItem(products: string[]): Record<string,number> {
        const count: Record<string, number> = {};

        for (const product of products) {
            count[product] = (count[product] || 0) + 1;
        }

        return count;
    }

    public async validateProductsQuantity(products: string[], columnIndex: number): Promise<boolean> {
        const expectedCount = this.numberOfProductsPerItem(products);
        const rowCount = await this.tableLineLocator.count();

        for (const [product, expectedQuantity] of Object.entries(expectedCount)) {
            let found = false;

            for(let i=0; i<rowCount; i++) {
                const line = this.tableLineLocator.nth(i);

                await line.scrollIntoViewIfNeeded();

                const textLine = ( await line.textContent())?.trim().replace(/\s+/g, ' ');
                console.log(`Checking row: ${textLine}, looking for product: ${product}`);

                if (textLine?.includes(product)) {
                    const cellQuantity = line.locator('td').nth(columnIndex);
                    const buttonQuantity = cellQuantity.locator('button');

                    await buttonQuantity.scrollIntoViewIfNeeded();

                    const textQuantity = (await buttonQuantity.textContent())?.trim();
                    console.log(`Product: ${product}, expected quantity: ${expectedQuantity}, found quantity: ${textQuantity}`);

                    if(Number(textQuantity) === expectedQuantity) {
                        found = true;
                        break;
                    }
                }
            }

            if (!found) {
                console.log(`Product not found or quantity mismatch: ${product}`);
                return false;
            }
        }

        return true;
    }

    public async removeProductInCart(columnIndex: number): Promise<void> {
        let rowCount = await this.tableLineLocator.count();

        if(rowCount === 0) {
            console.log('Cart is already empty');
            return;
        }

        while(rowCount > 0) {
            const line = this.tableLineLocator.nth(0);
            const column = line.locator('td').nth(columnIndex);

            await column.scrollIntoViewIfNeeded();
            await column.click();
            console.log(`Removed product in row: ${rowCount}`);

            await this.page.waitForFunction(
                (expectedRowCount) => document.querySelectorAll('tbody tr').length < expectedRowCount
                , rowCount
            );
            
            rowCount = await this.tableLineLocator.count();
        }
    }

}