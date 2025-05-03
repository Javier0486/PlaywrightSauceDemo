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
import AECartPage from '../pages/automationexercise/aeCart.page';
import LivHomepage from '../pages/liverpool/livHomepage.page';
import LivBuyPage from '../pages/liverpool/livBuy.page';
import LivSearchPage from '../pages/liverpool/livSearch.page';

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
    aeCartPage: AECartPage,

    //liverpool
    livHomepage: LivHomepage,
    livSearchpage: LivSearchPage,
    livBuypage: LivBuyPage,
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
        const aeHomePage = new AEHomepage(page);
        await use(aeHomePage);
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

    aeCartPage: async ({ page }, use) => {
        const aeCartPage = new AECartPage(page);
        await use(aeCartPage);
    },
    
    // Liverpool
    livHomepage: async ({ page }, use) => {
        const livHomepage = new LivHomepage(page);
        await use(livHomepage);
    },
    livSearchpage: async ({ page }, use) => {
        const livSearchpage = new LivSearchPage(page);
        await use(livSearchpage);
    },
    livBuypage: async ({ page }, use) => {
        const livBuypage = new LivBuyPage(page);
        await use(livBuypage);
    }
});

export { expect } from '@playwright/test';