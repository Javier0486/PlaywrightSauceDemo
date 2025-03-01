import { Page, Locator } from "playwright";

export default class SwagLabsPage {
    private page: Page;

    //Locators
    readonly productTitle: Locator;
    readonly addToCartButton: (productName: string) => Locator;
    readonly cartButton: Locator;

    constructor(page: Page) {
        this.page = page;

        //inizializar locators
        this.productTitle = this.page.locator('.inventory_item_name');
        this.addToCartButton = (productName: string) =>
            this.page.locator(`//div[normalize-space(text())='${productName}']/ancestor::div[@class='inventory_item_description']//button[text()='Add to cart']`);
        this.cartButton = this.page.locator('#shopping_cart_container');
    }

    //metodo para agregar productos al carrito
    public async addProductToCart(productName: string) {
        await this.addToCartButton(productName).click();
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }
}