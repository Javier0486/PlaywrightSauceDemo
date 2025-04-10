import { aeTopMenuOptions } from "../../utils/aeMenuOptionsEnum";
import { PageUtils } from "../../utils/takePageUrl";
import { expect, test } from "../../utils/fixtures";
import { AEUrls } from "../../utils/aeUrlsEnum";
import { AEElementFieldsSignupLogin } from "../../utils/inputSigupLoginEnum";
import { AE_URL } from "../../config/config";

test.describe(`Test Automation Exercise page`, () => {
    test('Register a new user', async ({
        page,
        aeHomePage,
        aeSignupLoginPage,
        aeEnterAccountInfoPage,
        aeAccountCreatedPage,
        loginPage,
    }) => {
        const newDate = new Date();
        const formatted = newDate.toISOString().replace(/[-:T.Z]/g, '').slice(0, 14); //YYYYMMDDHHMMSS
        const firstName = 'javier';
        const lastname = 'test';
        const userName = `${firstName} ${lastname} ${formatted}`;
        const email = `javier.test.${formatted}@gmail.com`;
        const menuOption = aeTopMenuOptions.signuplogin;
        const signloginUrl = AEUrls.signupLoginPage;
        const password = 'Password125';
        const dayBirth = String(newDate.getDate()).padStart(2).trim();
        const monthBirth = String(newDate.getMonth() + 1).padStart(2).trim();
        const yearBirth = '1988';
        const company = 'Sales Force';
        const address = 'Test Address 1478';
        const country = 'Canada';
        const state = 'testState';
        const city = 'testCity';
        const zipcode = '85754';
        const mobileNumber = '4412525896';

        await test.step('Step 1: go to Signup/Login page', async () => {
            await loginPage.navigate(AE_URL);
            await aeHomePage.menusLocator(menuOption).waitFor({ state: 'visible' });
            await aeHomePage.clickMenuElements(menuOption);

            await page.waitForURL(signloginUrl);
            await expect(await PageUtils.getCurrentUrl(page)).toEqual(signloginUrl);
        })

        await test.step('Step 2: Add the data to the fields', async () => {
        await aeSignupLoginPage.newUserSignup(userName, email, AEElementFieldsSignupLogin.name, AEElementFieldsSignupLogin.emailAddressSign);
        });

        await test.step('Step 3: Click on Signup button', async () => {
            const signUpButton = AEElementFieldsSignupLogin.signupButton;
            await aeSignupLoginPage.clickLoginSignup(signUpButton);
        });

        await test.step('Step 4: Enter account information', async () => {
            await aeEnterAccountInfoPage.enterData(
                password,
                dayBirth,
                monthBirth,
                yearBirth,
                firstName,
                lastname,
                company,
                address,
                country,
                state,
                city,
                zipcode,
                mobileNumber,
            );
        });

        await test.step('Step 5: Click on Create account, validate register and redirection to user profile were successful', async () => {
            await aeEnterAccountInfoPage.clickCreateAccount();
            await aeAccountCreatedPage.validateAccountCreatedMessages();
        });

        await test.step('Step 6: Click on Continue button and validate Logout and Delete Account options are displayed in the top menu', async () => {
            const options: string[] = [
                aeTopMenuOptions.logout,
                aeTopMenuOptions.deleteAccount
            ]
            await aeAccountCreatedPage.clickContinue();
            await aeHomePage.validateMenuOptions(options);
        });
    })
})