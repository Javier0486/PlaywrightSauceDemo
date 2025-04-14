import LoginPage from "../pages/login.page";
import { ENV_CONFIG } from "../config/config";
import { Page } from "playwright";
import { LOCATORS } from "../config/locators";

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
}