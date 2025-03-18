import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export class CartPage {
    private page: Page;

    //locators
    readonly cartItem: Locator;
    readonly checkoutButton: Locator;
    readonly itemPrice: (productName: string) => Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;

        //inicializamos locators
        this.cartItem = this.page.locator('.cart_item');
        this.checkoutButton = this.page.locator('#checkout');
        this.itemPrice = (productName) => this.page.locator(`//div[normalize-space(text())='${productName}']/ancestor::div[@class='cart_item_label']//div[@class='inventory_item_price']`);
        this.continueShoppingButton = this.page.locator('#continue-shopping');
    }

    //metodo para verificar si un producto esta en el carrito
    public async isProductInCart(productName: string) {
        const productLocator = this.page.locator(`//div[normalize-space(text())='${productName}']`);
        expect(await productLocator.isVisible());
    }

    //metodo para obtener la cantidad de productos en el carrito
    public async validateCartItemCount(numberOfProducts: number) {
        const itemsInCart = await this.cartItem.count();
        expect(itemsInCart).toBe(numberOfProducts);
    }

    //metodo para proceder al checkout
    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    //method to continue shopping
    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    //metodo para veridicar los precios de los productos en el carrito
    public async validatePricesInCart(productSelected: string[], priceExpected: string[]) {
        await this.page.waitForTimeout(3000);
        for(let i=0; i<priceExpected.length; i++) {            
            let prodSelect = (await this.itemPrice(productSelected[i]).innerText()).trim();
            expect (prodSelect).toBe(priceExpected[i].trim());
        }
    }
}