import exp from "constants";
import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export default class AEEnterAccountInfoPage {
    private page: Page;

    // Locators
    readonly mrRadioLocator: Locator;
    readonly mrsRadioLocator: Locator;
    readonly passInputLocator: Locator;
    readonly dayofBirthLocator: Locator;
    readonly monthofBirthLocator: Locator;
    readonly yearofBirthLocator: Locator;
    readonly firstNameInputLocator: Locator;
    readonly lastNameInputLocator: Locator;
    readonly companyInputLocator: Locator;
    readonly addressInputLocator: Locator;
    readonly address2InputLocator: Locator;
    readonly countryDropdownLocator: Locator;
    readonly stateInputLocator: Locator;
    readonly cityInputLocator: Locator;
    readonly zipcodeInputLocator: Locator;
    readonly mobileInputLocator: Locator;
    readonly createAccountButtonLocator: Locator;

    constructor(page: Page) {
        this.page = page;

        this.mrRadioLocator = this.page.locator('//label[@for="id_gender1"]');
        this.mrsRadioLocator = this.page.locator('//label[@for="id_gender2"]');
        this.passInputLocator = this.page.locator('#password');
        this.dayofBirthLocator = this.page.locator('#days');
        this.monthofBirthLocator = this.page.locator('#months');
        this.yearofBirthLocator = this.page.locator('#years');
        this.firstNameInputLocator = this.page.locator('#first_name');
        this.lastNameInputLocator = this.page.locator('#last_name');
        this.companyInputLocator = this.page.locator('#company');
        this.addressInputLocator = this.page.locator('#address1');
        this.address2InputLocator = this.page.locator('#address2');
        this.countryDropdownLocator = this.page.locator('#country');
        this.stateInputLocator = this.page.locator('#state');
        this.cityInputLocator = this.page.locator('#city');
        this.zipcodeInputLocator = this.page.locator('#zipcode');
        this.mobileInputLocator = this.page.locator('#mobile_number');
        this.createAccountButtonLocator = this.page.locator("//button[normalize-space(text())='Create Account']");
    }

    public async enterData (
        password: string,
        dayOfBirth: string,
        monthOfBirth: string,
        yearOfBirth: string,
        firstName: string,
        lastName: string,
        company: string,
        address: string,
        country: string,
        state: string,
        city: string,
        zipcode: string,
        mobileNumber: string,
        address2?: string,
    ) {
        await this.mrRadioLocator.click();
        await this.passInputLocator.fill(password);
        await this.dayofBirthLocator.click();
        console.log(`this is the current day of birth: ${dayOfBirth}`);
        await this.dayofBirthLocator.selectOption({ label: dayOfBirth });
        await this.monthofBirthLocator.selectOption({ value: monthOfBirth });
        await this.yearofBirthLocator.selectOption({ value: yearOfBirth });
        await this.firstNameInputLocator.fill(firstName);
        await this.lastNameInputLocator.fill(lastName);
        await this.companyInputLocator.fill(company);
        await this.addressInputLocator.fill(address);
        await this.countryDropdownLocator.selectOption({ value: country });
        await this.stateInputLocator.fill(state);
        await this.cityInputLocator.fill(city);
        await this.zipcodeInputLocator.fill(zipcode);
        await this.mobileInputLocator.fill(mobileNumber);
        await this.address2InputLocator.fill(address2 ?? '');
    }

    public async clickCreateAccount () {
        await this.createAccountButtonLocator.click();
    }
}