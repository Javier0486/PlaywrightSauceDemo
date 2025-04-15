import { test } from "../../utils/fixtures";
import { productsInHomepage } from "../../utils/saucedemoutils/productsEnum";
import { LoginManager } from "../../utils/LoginManager";

test.describe(`Test para validar los precios en carrito y productos en checkout`, () => {
    test('Agregar productos al carrito y verificar precios; verificar productos en checkout', async ({
        swagLabsPage,
        cartPage,
        checkoutYourInfoPage,
        checkoutOverviewPage,
        page
    }) => {
        let priceInHomepage: string[] = [];
        const selectedProduct: string[] = [productsInHomepage.backPAck, productsInHomepage.fleeceJacket, productsInHomepage.bikeLight];

        await test.step('Step 1: login to the page', async () => {
            //iniciar sesion
            const loginManager = new LoginManager(page);
            await loginManager.loginToSauceDemo();
        })

        await test.step('Step 2: Agregar productos al carrito', async () => {
            await swagLabsPage.addProductToCart(selectedProduct);
        })

        await test.step(`Step 3: validar que los precios mostrados en el carrito sean igual a los precios de los productos mostrados en Swag Labs homepage`, async () => {
            //se obtienen los precios de los productos seleccionado desde HP
            priceInHomepage = await swagLabsPage.getPriceValue(selectedProduct)
            
            await swagLabsPage.cartButton.click();

            await cartPage.validatePricesInCart(selectedProduct, priceInHomepage);
        })

        await test.step(`Step 4: añadir informacion y dar click en Continue`, async () => {
            await cartPage.proceedToCheckout();

            await checkoutYourInfoPage.fillAllInputs('Javier', 'Soriano', '83884');
            await checkoutYourInfoPage.clickContinue();
        })

        await test.step(`Step 5: Verificar que los productos este en "checkout: Overview" page`, async () => {
            await page.screenshot({ path: 'Captura-de-pantalla.png' });
            await checkoutOverviewPage.validateProductsDisplayed(selectedProduct);
        })
    })
})