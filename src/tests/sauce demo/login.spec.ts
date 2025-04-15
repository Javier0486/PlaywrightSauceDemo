import { test, expect } from '../../utils/fixtures';
import { LoginManager } from '../../utils/LoginManager';

test('Login test', async ({ page }) => {
    const loginManager = new LoginManager(page);
    await loginManager.loginToSauceDemo();
    const currentUrl = await page.url();
    await expect(currentUrl).toMatch(/inventory.html/);
})