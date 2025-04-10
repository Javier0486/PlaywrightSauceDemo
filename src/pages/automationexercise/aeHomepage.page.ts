import exp from "constants";
import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export default class AEHomepage {
    private page: Page;

    //Locators
    readonly menusLocator: (menuName: string) => Locator;

    constructor(page: Page){
        this.page = page;

        // initialize locators
        this.menusLocator = (menuName: string) => this.page.locator(`//a[normalize-space(text())='${menuName}']`);
    }

    public async clickMenuElements(menuSelected: string){
        this.menusLocator(menuSelected).click();
    }

    public async validateMenuOptions(menuOptions: string[]) {
        for(let i=0; i<menuOptions.length; i++) {
            expect(await this.menusLocator(menuOptions[i])).toBeVisible();
        }
    }

    
}