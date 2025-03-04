import { test as base } from '@playwright/test';
import LoginPage from '../pages/login.page';
import SwagLabsPage from '../pages/swagLabs.page';
import { CartPage } from '../pages/cart.page';
import CheckoutYourInfoPage from '../pages/checkoutYourInfo.page';
import { CheckoutOverviewPage } from '../pages/checkoutOverview.page';

export const test = base.extend<{ 
    loginPage: LoginPage,
    swagLabsPage: SwagLabsPage, //se agrega SwagLabsPage al fixture
    cartPage: CartPage,
    checkoutYourInfoPage: CheckoutYourInfoPage,
    checkoutOverviewPage: CheckoutOverviewPage,
 }>({
    //fixture para LoginPage
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

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
    }
});

export { expect } from '@playwright/test';