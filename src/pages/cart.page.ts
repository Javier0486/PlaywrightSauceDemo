import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export class CartPage {
    private page: Page;

    //locators
    readonly cartItem: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;

        //inicializamos locators
        this.cartItem = this.page.locator('.cart_item');
        this.checkoutButton = this.page.locator('#checkout');
    }

    //metodo para verificar si un producto esta en el carrito
    public async isProductInCart(productName: string) {
        const productLocator = this.page.locator(`text=${productName}`);
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
}