import { Page, Locator } from "playwright";
import { BASE_URL } from "../config/config";

export default class LoginPage {
    //locators declarados como readonly
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(private readonly page: Page){
        this.usernameInput = this.page.locator('#user-name');
        this.passwordInput = this.page.locator('#password');
        this.loginButton = this.page.locator('#login-button');
    }

    async navigate(url: string = BASE_URL) {
        await this.page.goto(url);
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    //metodo publico para obtener la URL actual
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
}