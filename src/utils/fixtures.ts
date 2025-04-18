import { test as base } from '@playwright/test';
import LoginPage from '../pages/login.page';
import SwagLabsPage from '../pages/sauce demo/swagLabs.page';
import { CartPage } from '../pages/sauce demo/cart.page';
import CheckoutYourInfoPage from '../pages/sauce demo/checkoutYourInfo.page';
import { CheckoutOverviewPage } from '../pages/sauce demo/checkoutOverview.page';
import AEHomepage from '../pages/automationexercise/aeHomepage.page';
import AESignupLoginPage from '../pages/automationexercise/aeSignupLogin.page';
import AEEnterAccountInfoPage from '../pages/automationexercise/aeEnterAccountInfo.page';
import AEAccountCreatedPage from '../pages/automationexercise/aeAccountCreated.page';

export const test = base.extend<{ 
    loginPage: LoginPage,
    swagLabsPage: SwagLabsPage, //se agrega SwagLabsPage al fixture
    cartPage: CartPage,
    checkoutYourInfoPage: CheckoutYourInfoPage,
    checkoutOverviewPage: CheckoutOverviewPage,
    aeHomePage: AEHomepage,
    aeSignupLoginPage: AESignupLoginPage,
    aeEnterAccountInfoPage: AEEnterAccountInfoPage,
    aeAccountCreatedPage: AEAccountCreatedPage,
 }>({
    //fixtures
    swagLabsPage: async ({ page }, use) => {
        const swagLabsPage = new SwagLabsPage(page);
        await use(swagLabsPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    checkoutYourInfoPage: async ({ page }, use) => {
        const checkoutInfoPage = new CheckoutYourInfoPage(page);
        await use(checkoutInfoPage);
    },

    checkoutOverviewPage: async ({ page }, use) => {
        const checkoutOverview = new CheckoutOverviewPage(page);
        await use(checkoutOverview);
    },

    aeHomePage: async ({ page }, use) => {
        const aeHomepage = new AEHomepage(page);
        await use(aeHomepage);
    },

    aeSignupLoginPage: async ({ page }, use) => {
        const aeSignupLoginpage = new AESignupLoginPage(page);
        await use(aeSignupLoginpage);
    },

    aeEnterAccountInfoPage: async ({ page }, use) => {
        const aeEnterAccountInfoPage = new AEEnterAccountInfoPage(page);
        await use(aeEnterAccountInfoPage);
    },

    aeAccountCreatedPage: async ({ page }, use) => {
        const aeAccountCreatedPage = new AEAccountCreatedPage(page);
        await use(aeAccountCreatedPage);
    },
    
});

export { expect } from '@playwright/test';