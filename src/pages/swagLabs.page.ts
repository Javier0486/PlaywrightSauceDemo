import { Page, Locator } from "playwright";

export default class SwagLabsPage {
    private page: Page;

    //Locators
    readonly productTitle: Locator;
    readonly addToCartButton: (productName: string) => Locator;
    readonly cartButton: Locator;
    readonly articlePrice: (priceProductName: string) => Locator;

    constructor(page: Page) {
        this.page = page;

        //inizializar locators
        this.productTitle = this.page.locator('.inventory_item_name');
        this.addToCartButton = (productName: string) =>
            this.page.locator(`//div[normalize-space(text())='${productName}']/ancestor::div[@class='inventory_item_description']//button[text()='Add to cart']`);
        this.cartButton = this.page.locator('#shopping_cart_container');
        this.articlePrice = (priceProductName: string) => this.page.locator(`//div[normalize-space(text())='${priceProductName}']/ancestor::div[@class='inventory_item_description']//div[@class='inventory_item_price']`)
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

}