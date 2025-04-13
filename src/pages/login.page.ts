import { Page, Locator } from "playwright";
import { ENV_CONFIG } from "../config/config";

/**
 * Page Object for login page
 * Encapsulates all login page interactions and selectors
 */
export default class LoginPage {
    //locators
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

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

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    //metodo publico para obtener la URL actual
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
}