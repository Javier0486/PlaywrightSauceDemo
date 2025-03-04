import { Page, Locator } from "playwright";

export default class CheckoutYourInfoPage {
    private page: Page;

    // Locators
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private postalCodeInput: Locator;
    private cancelButton: Locator;
    private continueButton: Locator;
    
    constructor(page: Page) {
        this.page = page;

        //inicializamos locators
        this.firstNameInput = this.page.locator("#first-name");
        this.lastNameInput = this.page.locator('#last-name');
        this.postalCodeInput = this.page.locator('#postal-code');
        this.cancelButton = this.page.locator('#cancel')
        this.continueButton = this.page.locator('#continue');
    }

    public async clickCancel() {
        await this.cancelButton.click();
    }

    public async clickContinue() {
        await this.continueButton.click();
    }

    public async fillAllInputs(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

}