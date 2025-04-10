import exp from "constants";
import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export default class AESignupLoginPage {
    private page: Page;

    // Locators
    readonly inputDataLocator: (loginSignInput: string) => Locator;
    readonly logSignButtonLocator: (logSignButtons: string) => Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.inputDataLocator = (loginSignInput: string) => this.page.locator(`//input[@data-qa='${loginSignInput}']`);
        this.logSignButtonLocator = (logSignButtons: string) => this.page.locator(`//button[@data-qa='${logSignButtons}']`);
    }

    public async newUserSignup(name: string, email: string, nameInput: string, emailInput: string) {
        await this.inputDataLocator(nameInput).fill(name);
        await this.inputDataLocator(emailInput).fill(email);
    }
    
    public async clickLoginSignup(button: string) {
        await this.logSignButtonLocator(button).click();
    }

    
}