import LoginPage from "../pages/login.page";
import { ENV_CONFIG } from "../config/config";
import { Page } from "playwright";
import { LOCATORS } from "../locators/locators";

/**
 * Implements Facade Pattern to provide a simplified interface for login operations
 * across multiple applications. Acts as a facade that:
 * - Provides a unified interface for authentication across systems
 * - Abstracts complex login operations behind simple methods
 * - Centralizes locator management and navigation
 * - Shields tests from implementation changes in login flows
 */
export class LoginManager { // Facade Pattern implementation
    constructor(private readonly page: Page) {}

    /**
     * Executes complete SauceDemo login flow using configured credentials
     * @returns Promise<void>
     */
    async loginToSauceDemo() {
        const { BASE_URL, credentials } = ENV_CONFIG;
        const { saucedemo } = LOCATORS;

        // Initialize LoginPage with SauceDemo-specific locators
        const loginPage = new LoginPage( 
            this.page,
            saucedemo.usernameSelector,
            saucedemo.passwordSelector,
            saucedemo.loginButtonSelector,
        );

        await loginPage.navigate(BASE_URL);
        await loginPage.login(credentials.saucedemo.USERNAME, credentials.saucedemo.PASSWORD);
    }

    /**
     * Executes complete AutomationExercise login flow using configured credentials
     * @returns Promise<void>
     */
    async loginToAutomationExercise() {
        const { AE_URL, credentials } = ENV_CONFIG;
        const { automationExercise } = LOCATORS;

        // Initialize LoginPage with AutomationExercise-specific locators
        const loginPage = new LoginPage(
            this.page,
            automationExercise.usernameSelector,
            automationExercise.passwordSelector,
            automationExercise.loginButtonSelector
        );

        await loginPage.navigate(AE_URL);
        await loginPage.login(credentials.automationExercise.AEUSERNAME, credentials.automationExercise.AEPASSWORD);
    }

    async logoutFromAutomationExercise() {
        const { automationExercise } = LOCATORS;

        await this.page.click(automationExercise.logoutButtonSelector);
    }

    async loginToLiverpool() {
        const { LIVERPOOL_URL, credentials } = ENV_CONFIG;
        const { liverpool } = LOCATORS;

        // Initialize loginPage with Liverpool-specific credentials
        const loginPage = new LoginPage(
            this.page,
            liverpool.usernameSelector,
            liverpool.passwordSelector,
            liverpool.loginButtonSelector
        );
        await loginPage.navigate(LIVERPOOL_URL);
        await this.page.locator(liverpool.usernameMenuSelector).last().click();
        await loginPage.login(
            credentials.liverpool.LUSERNAME,
            credentials.liverpool.LPASSWORD
        );
    }

    async loginPeek() {
        const { PEEK_URL, credentials } = ENV_CONFIG;
        const { peek } = LOCATORS;

        const loginPage = new LoginPage(
            this.page,
            peek.usernameSelector,
            peek.passwordSelector,
            peek.loginButtonsSelector,
        );
        await loginPage.navigate(PEEK_URL);
        await this.page.locator(peek.cookiesAcceptSelector).click();
        await this.page.locator(peek.userButtonSelector).click();
        await this.page.locator(peek.logsignSelector).click();
        await this.page.locator(peek.loginButtonInModalSelector).click();
        await loginPage.login(
            credentials.peek.PEEK_USERNAME,
            credentials.peek.PEEK_PASSWORD
        );
    }

}