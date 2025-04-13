import { expect, test } from "../utils/fixtures";
import { LoginManager } from "../utils/LoginManager";
import { productsInHomepage } from "../utils/productsEnum";

test.describe('Test para validar que los productos agregados al carrito sean los esperados', () => {
    test('Agregar productos al carrito y verificar', async ({ 
        page,
        swagLabsPage,
        cartPage
    }) => {
        const productsSelected: string[] = [productsInHomepage.backPAck, productsInHomepage.bikeLight];

        await test.step('Step 1: login to SauceDemo page', async () => {
            const loginManager = new LoginManager(page);
            await loginManager.loginToSauceDemo();
            const currentUrl = await page.url();
            expect(currentUrl).toMatch(/inventory.html/);
        })

        await test.step('Step 2: Agregar productos al carrito', async () => {
            await swagLabsPage.addProductToCart(productsSelected);
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
