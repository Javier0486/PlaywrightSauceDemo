import exp from "constants";
import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export default class SwagLabsPage {
    private page: Page;

    //Locators
    readonly productTitle: Locator;
    readonly addToCartButton: (productName: string) => Locator;
    readonly cartButton: Locator;
    readonly articlePrice: (priceProductName: string) => Locator;
    readonly cartNumberOfItems: Locator;
    readonly burgerMenu: Locator;
    readonly resetAppState: Locator;
    readonly pricesLocator: Locator;
    readonly sortByDropdownLocator: Locator;

    constructor(page: Page) {
        this.page = page;

        //inizializar locators
        this.productTitle = this.page.locator('.inventory_item_name');
        this.addToCartButton = (productName: string) =>
            this.page.locator(`//div[normalize-space(text())='${productName}']/ancestor::div[@class='inventory_item_description']//button[text()='Add to cart']`);
        this.cartButton = this.page.locator('#shopping_cart_container');
        this.articlePrice = (priceProductName: string) => this.page.locator(`//div[normalize-space(text())='${priceProductName}']/ancestor::div[@class='inventory_item_description']//div[@class='inventory_item_price']`)
        this.cartNumberOfItems = this.page.locator('.shopping_cart_link');
        this.burgerMenu = this.page.locator('#react-burger-menu-btn');
        this.resetAppState = this.page.locator('#reset_sidebar_link');
        this.pricesLocator = this.page.locator(`//div[@class='inventory_item_price']`);
        this.sortByDropdownLocator = this.page.locator('.product_sort_container');
    }

    //metodo para agregar productos al carrito
    public async addProductToCart(productName: string[]) {
        for (let i=0; i<productName.length; i++) {
            await this.addToCartButton(productName[i]).click();
        }
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    public async getPriceValue(productSelected: string[]) {
        let priceInHomepage: string[] = [];
        for (let i=0; i<productSelected.length; i++){
            const price = (await this.articlePrice(productSelected[i]).innerText()).trim();
            priceInHomepage.push(price);
        }
        return priceInHomepage;
    }    

    public async validateResetAppState(products: string[]) {
        await this.cartNumberOfItems.isVisible();
        await this.burgerMenu.click();
        await this.page.waitForTimeout(1000);
        await this.resetAppState.click();
        await this.page.waitForTimeout(1000);
        await expect(await this.cartNumberOfItems.isVisible()).toBeTruthy();
    }

    private async takePrices() {
        let prices: string[] = [];
        const pricesList = await this.pricesLocator.allInnerTexts();
        for (let i=0; i<pricesList.length; i++) {
            prices.push(pricesList[i].trim());
        }
        return prices;
    }

    public async validateSortedFunctionality(sortBy: string){
        if(sortBy == 'hilo') {
            let prices = await this.takePrices();
            let pricesSorted = prices.sort((a, b) => parseFloat(b) - parseFloat(a));
            console.log(`prices is: ${prices} and pricesSorted is: ${pricesSorted}`);
            expect(prices).toEqual(pricesSorted);
        } else if (sortBy == 'lohi') {
            let prices = await this.takePrices();
            let pricesSorted = prices.sort((a, b) => parseFloat(a) - parseFloat(b));
            console.log(`prices is: ${prices} and pricesSorted is: ${pricesSorted}`);
            expect(prices).toEqual(pricesSorted);
        } else if (sortBy == 'za') {

        } else if (sortBy == 'az'){

        } else {
            throw new Error('Ivalid Sort by option');
        }
    }

    public async sortBy(sortBy: string){
        await this.sortByDropdownLocator.click();
        await this.sortByDropdownLocator.selectOption({value: sortBy});
    }

}