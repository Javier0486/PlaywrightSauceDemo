import { Page, Locator } from "playwright";

/**
 * Page Object Model for login page functionality.
 * Encapsulates all login-related interactions and selectors.
 * 
 * Key Responsibilities:
 * - Managing login page locators
 * - Performing login actions
 * - Handling page navigation
 * - Providing current URL information
 */
export default class LoginPage {
    //locators
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    /**
     * Creates a new LoginPage instance
     * @param page Playwright Page object
     * @param usernameSelector Selector for username input field
     * @param passwordSelector Selector for password input field
     * @param loginButtonSelector Selector for login button
     */
    constructor(
        private readonly page: Page,
        private readonly usernameSelector: string,
        private readonly passwordSelector: string,
        private readonly loginButtonSelector: string
    ){
        this.usernameInput = this.page.locator(this.usernameSelector);
        this.passwordInput = this.page.locator(this.passwordSelector);
        this.loginButton = this.page.locator(this.loginButtonSelector);
    }

    /**
     * Navigates to the specified URL
     * @param url The URL to navigate to
     */
    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    /**
     * Performs login with provided credentials
     * @param username The username to enter
     * @param password The password to enter
     */
    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Gets the current page URL
     * @returns Promise resolving to current URL string
     */
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
}