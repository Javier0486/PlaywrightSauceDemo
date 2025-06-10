import { aeTopMenuOptions } from "../../utils/automationexerciseutils/aeMenuOptionsEnum";
import { test, expect } from "../../fixtures/fixtures";
import { LoginManager } from "../../managers/LoginManager";
import { AEColumnTableCart } from "../../utils/automationexerciseutils/cartColumnEnum";

test.describe('Test to validate the products added in the cart', () => {
    test('Validate the products selected are displayed in the cart page', async ({
        page,
        aeHomePage,
        aeCartPage,
    }) => {
        const productsSelected: string[] = [
            'Blue Top',
            'Winter Top',
            'Sleeves Printed Top - White',
            'Blue Top',
            'Half Sleeves Top Schiffli Detailing - Pink',
            'Sleeves Printed Top - White',
        ]
        let prices: string[] = []
        const loginManager = new LoginManager(page);


        await test.step('Step 1: Login to automation exercise site', async () => {
            await loginManager.loginToAutomationExercise();
        })

        await test.step('Step 2; Add products to the cart', async () => {
            await aeHomePage.addProducts(productsSelected);
            prices = await aeHomePage.getPrices(productsSelected);
        })

        await test.step('Step 3: go to Cart page and validate all products selected are displayed in the page, among the prices and number of products', async () => {
            await aeHomePage.clickMenuElements(aeTopMenuOptions.cart);

            const productsInTable = await aeCartPage.validateTableValues(productsSelected, AEColumnTableCart.description);
            const pricesInTable = await aeCartPage.validateTableValues(prices, AEColumnTableCart.price);
            const productsQuantity = await aeCartPage.validateProductsQuantity(productsSelected, AEColumnTableCart.quantity)

            await expect.soft(productsInTable).toBe(true);
            await expect.soft(pricesInTable).toBe(true);
            await expect.soft(productsQuantity).toBe(true);
        })

        await test.step('Step 4: remove products from cart, and logout from Automation Exercise site', async () => {
            await aeCartPage.removeProductInCart(AEColumnTableCart.removeItem);
            await loginManager.logoutFromAutomationExercise();
        })
    })  
})