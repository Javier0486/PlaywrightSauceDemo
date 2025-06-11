import { test, expect } from '../../fixtures/fixtures';
import { LoginManager } from '../../managers/LoginManager';

test('Login test', async ({ page }) => {
    const loginManager = new LoginManager(page);
    await loginManager.loginToSauceDemo();
    const currentUrl = await page.url();
    await expect(currentUrl).toMatch(/inventory.html/);
})