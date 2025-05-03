import { Page, Locator } from "playwright";

export default class LivHomepage {
    private page: Page;

    readonly searchLocator: Locator;
    readonly categoriasLocator: Locator; 
    readonly menuOptionsLocator: (optionName: string) => Locator;

    constructor(page: Page){
        this.page = page;

        this.searchLocator = this.page.locator('#mainSearchbar');
        this.categoriasLocator = this.page.locator("//span[normalize-space(text())='Categorías']");
        this.menuOptionsLocator = (optionName: string) => this.page.locator(`//a[normalize-space(text())='${optionName}']`);
    }

    public async searchProduct(product: string) {
        await this.searchLocator.fill(product);
        await this.page.keyboard.press('Enter');
    }

    
}