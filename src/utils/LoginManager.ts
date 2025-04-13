import LoginPage from "../pages/login.page";
import { ENV_CONFIG } from "../config/config";
import { Page } from "playwright";
import { LOCATORS } from "../config/locators";

export class LoginManager {
    constructor(private readonly page: Page) {}

    async loginToSauceDemo() {
        const { BASE_URL, credentials } = ENV_CONFIG;
        const { saucedemo } = LOCATORS;

        // Pass locators dinamycally
        const loginPage = new LoginPage(
            this.page,
            saucedemo.usernameSelector,
            saucedemo.passwordSelector,
            saucedemo.loginButtonSelector,
        );

        await loginPage.navigate(BASE_URL);
        await loginPage.login(credentials.saucedemo.USERNAME, credentials.saucedemo.PASSWORD);
    }

    async loginToAutomationExercise() {
        const { AE_URL, credentials } = ENV_CONFIG;
        const { automationExercise } = LOCATORS;

        // Pass locators dynamically
        const loginPage = new LoginPage(
            this.page,
            automationExercise.usernameSelector,
            automationExercise.passwordSelector,
            automationExercise.loginButtonSelector
        );
        
        await loginPage.navigate(AE_URL);
        await loginPage.login(credentials.automationExercise.AEUSERNAME, credentials.automationExercise.AEPASSWORD);
    }
}