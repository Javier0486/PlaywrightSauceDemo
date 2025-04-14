import { aeTopMenuOptions } from "../../utils/aeMenuOptionsEnum";
import { expect, test } from "../../utils/fixtures";
import { AEUrls } from "../../utils/aeUrlsEnum";
import { AEElementFieldsSignupLogin } from "../../utils/inputSigupLoginEnum";
import { LoginManager } from "../../utils/LoginManager";
import { PageUtils } from "../../utils/PageUtils";

test.describe('Test automation exercise page', () => {
    test('Login to valid user', async ({ 
        page,
        aeHomePage,
    }) => {
        const signloginUrl = AEUrls.homePage;

        await test.step('Step 1: login to site', async () => {
            const loginManager = new LoginManager(page);
            await loginManager.loginToAutomationExercise();
        });

        await test.step('Step 2: validate user is logged', async () => {
            const loginButton = AEElementFieldsSignupLogin.loginButton;
            const newOptions: string[] = [
                aeTopMenuOptions.logout,
                aeTopMenuOptions.deleteAccount,
            ]

            // Validate the URL using PageUtils
            try {
                await PageUtils.validateUrl(page, signloginUrl);
            } catch (error) {
                expect(error).toBeUndefined(); // Fail the test if URL validation fails
            }

            await aeHomePage.validateMenuOptions(newOptions);
        });
    })
})