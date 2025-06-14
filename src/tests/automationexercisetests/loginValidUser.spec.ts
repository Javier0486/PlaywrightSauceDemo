import { aeTopMenuOptions } from "../../utils/automationexerciseutils/aeMenuOptionsEnum";
import { expect, test } from "../../fixtures/fixtures";
import { AEUrls } from "../../utils/automationexerciseutils/aeUrlsEnum";
import { AEElementFieldsSignupLogin } from "../../utils/automationexerciseutils/inputSigupLoginEnum";
import { LoginManager } from "../../managers/LoginManager";
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