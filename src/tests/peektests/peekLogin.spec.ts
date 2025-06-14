import { LoginManager } from "../../managers/LoginManager";
import { PageUtils } from "../../utils/PageUtils";
import { expect, test } from "playwright/test";

test.describe('Test Peek page', () => {
    test('Login to peek page', async ({
        page,
    }) => {
        const peekHomeUrl = 'https://www.peek.com/';

        await test.step('Step 1: login to site', async () => {
            const loginManage = new LoginManager(page);
            await loginManage.loginPeek();
        });

        await test.step('Step 2: validate homepage is displayed after login', async () => {
            try {
                await PageUtils.validateUrl(page, peekHomeUrl);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        })
    })
})