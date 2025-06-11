import { test } from "../../fixtures/fixtures";
import { productsInHomepage } from "../../utils/saucedemoutils/productsEnum";
import { LoginManager } from "../../managers/LoginManager";

test.describe('test to validate Reset App State functionality', () => {
    test('Add products to the cart and validate no products are in the cart after Resetting App State', async ({
        page,
        swagLabsPage,
        cartPage,
    }) => {
        const productsToSelect: string[] = [
            productsInHomepage.backPAck,
            productsInHomepage.bikeLight,
            productsInHomepage.boltTshirt
        ];

        await test.step('Step 1: Login to the page', async () => {
            //login to the page
            const loginManager = new LoginManager(page);
            await loginManager.loginToSauceDemo();
        })

        await test.step('Step 2: Add products to the cart', async () => {
            await swagLabsPage.addProductToCart(productsToSelect);
        })

        await test.step('Step 3: Go to the cart', async () => {
            await swagLabsPage.cartButton.click();
        })

        await test.step('Step 4: Validate the products are in the cart', async () => {
            await cartPage.isProductInCart('Sauce Labs Backpack');
            await cartPage.isProductInCart('Sauce Labs Bike Light');
            await cartPage.isProductInCart('Sauce Labs Bolt T-Shirt');
        })

        await test.step('Step 5: go back to Swag Labs Homepage, reset app state, and validate there is no red circle with number in the cart icon', async () => {
            await cartPage.continueShopping();
            await swagLabsPage.validateResetAppState(productsToSelect);
        })

        await test.step('Step 6: go to cart page and validate no products are in the cart', async () => {
            await swagLabsPage.cartButton.click();
            await cartPage.validateCartItemCount(0);
        })
    })
})