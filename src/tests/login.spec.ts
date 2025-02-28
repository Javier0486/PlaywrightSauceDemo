import { test, expect } from '../utils/fixtures';
import { USERNAME, PASSWORD } from '../config/config';

test('Login test', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login(USERNAME, PASSWORD);

    //verificar que el login fue exitoso
    const currentUrl = await loginPage.getCurrentUrl();
    await expect(currentUrl).toMatch(/inventory.html/);
})