import exp from "constants";
import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export default class AEAccountCreatedPage {
    private page: Page;

    readonly accountCreatedLocator: Locator;
    readonly congratsMessageLocator: Locator;
    readonly extraMessageLocator: Locator;
    readonly continueButtonLocator: Locator;

    constructor (page: Page) {
        this.page = page;

        this.accountCreatedLocator = this.page.locator('//b[normalize-space(text())="Account Created!"]');
        this.congratsMessageLocator = this.page.locator('//p[normalize-space(text())="Congratulations! Your new account has been successfully created!"]');
        this.extraMessageLocator = this.page.locator('//p[normalize-space(text())="You can now take advantage of member privileges to enhance your online shopping experience with us."]');
        this.continueButtonLocator = this.page.locator('//a[@data-qa="continue-button"]');
    }

    public async validateAccountCreatedMessages (){
        expect(await this.accountCreatedLocator).toBeVisible();
        expect(await this.congratsMessageLocator).toBeVisible();
        expect(await this.extraMessageLocator).toBeVisible();
    }

    public async clickContinue() {
        await this.continueButtonLocator.click();
    }
}