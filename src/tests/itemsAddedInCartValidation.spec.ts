import { expect, test } from "../utils/fixtures";
import { USERNAME, PASSWORD } from "../config/config";

test.describe('Test para validar que los productos agregados al carrito sean los esperados', () => {
    test('Agregar productos al carrito y verificar', async ({ 
        loginPage,
        swagLabsPage,
        cartPage
    }) => {
    
        await test.step('Step 1: login to the page', async () => {
            //iniciar sesion
            await loginPage.navigate();
            await loginPage.login(USERNAME, PASSWORD);
        })

        await test.step('Step 2: Agregar productos al carrito', async () => {
            await swagLabsPage.addProductToCart('Sauce Labs Backpack');
            await swagLabsPage.addProductToCart('Sauce Labs Bike Light');
        })

        await test.step('Step 3: Ir al carrito', async () => {
            await swagLabsPage.cartButton.click();
        })

        await test.step('Step 4: Verificar que los productos estan en el carrito', async () => {
            await cartPage.isProductInCart('Sauce Labs Backpack');
            await cartPage.isProductInCart('Sauce Labs Bike Light');
        })

        await test.step('Step 5: Verificar la cantidad de productos en el carrito', async () => {
            await cartPage.validateCartItemCount(2);
        })
    })
})
