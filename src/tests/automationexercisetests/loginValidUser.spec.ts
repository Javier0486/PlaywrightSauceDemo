import { aeTopMenuOptions } from "../../utils/aeMenuOptionsEnum";
import { PageUtils } from "../../utils/takePageUrl";
import { expect, test } from "../../utils/fixtures";
import { AEUrls } from "../../utils/aeUrlsEnum";
import { AEElementFieldsSignupLogin } from "../../utils/inputSigupLoginEnum";
import { AE_LOGINURL, AE_URL, AEPASSWORD, AEUSERNAME } from "../../config/config";

test.describe('Test automation exercise page', () => {
    test('Login to valid user', async ({ 
        page,
        aeHomePage,
        aeSignupLoginPage,
        aeEnterAccountInfoPage,
        aeAccountCreatedPage,
        loginPage,
    }) => {
        const signloginUrl = AEUrls.signupLoginPage;
        const emailInput = 

        await test.step('Step 1: go to login page', async () => {
            await loginPage.navigate(AE_LOGINURL);
            await page.waitForURL(signloginUrl);
            await expect(await PageUtils.getCurrentUrl(page)).toEqual(signloginUrl);
        });

        await test.step('Step 2: enter credentials', async () => {
            await aeSignupLoginPage.newUserSignup(
                AEUSERNAME, 
                AEPASSWORD, 
                AEElementFieldsSignupLogin.emailAddressLog, 
                AEElementFieldsSignupLogin.password);
        });

        await test.step('Step 3: click on login and validate user is logged', async () => {
            const loginButton = AEElementFieldsSignupLogin.loginButton;
            const newOptions: string[] = [
                aeTopMenuOptions.logout,
                aeTopMenuOptions.deleteAccount,
            ]
            await aeSignupLoginPage.clickLoginSignup(loginButton);

            await expect(await PageUtils.getCurrentUrl(page)).toEqual(AE_URL);
            await aeHomePage.validateMenuOptions(newOptions);
        });
    })
})