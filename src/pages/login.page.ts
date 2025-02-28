import { Page } from "playwright";
import { LoginSelectors } from "../utils/enums";
import { BASE_URL } from "../config/config";

export class LoginPage {
    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async navigate() {
        await this.page.goto(BASE_URL);
    }

    async login(username: string, password: string) {
        await this.page.fill(LoginSelectors.USERNAME_INPUT, username);
        await this.page.fill(LoginSelectors.PASSWORD_INPUT, password);
        await this.page.click(LoginSelectors.LOGIN_BUTTON);
    }

    //metodo publico para obtener la URL actual
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
}