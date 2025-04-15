import { expect, test } from "../../utils/fixtures";
import { LoginManager } from "../../utils/LoginManager";
import { productsInHomepage } from "../../utils/saucedemoutils/productsEnum";

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


// Code connections and flow
/*
* 1. Test Files (.spec.ts files):
* - Use fixtures to get initialized pages
* - Utilize LoginManage for authentication
* - Interact with page objects through fixtures
* 
* 2. LoginManager:
* - Acts as central login controller
* - Combines configs, locators, and page objects
* - Provides simple login methods to tests
* 
* 3. Page Objects (.page.ts files):
* - Contain actual page interaction logic
* - Used by LoginManager and potentially other managers
* - Abstract away direct Playwright calls
* 
* 4. Config Files:
* - Provide centralized configuration
* - Used by both managers and tests
* - Enable easy environment switching 
*
*/

// Why This Structure Works Well
/*
* 1. Separation of concerns:
* - Configs are separate from locators
* - Page logic is separate from test logic
* - Utility functionsare reusable
* 
* 2. Maintainability:
* - Changes to locators only need updates in one place
* - Login logic can be updated without touching tests
* - New pages can be added without affecting existing tests
* 
* 3. Scalability:
* - Easy to add new test scenarios
* - Simple to support multiple applications (like SauceDemo and AutomationExercise)
* - Straightforward to extend with new pages and features
* 
* 4. Readability:
* - Tests are clean and focused on behavior
* - Complex operations are hidden behind simple interfaces
* - Page-specific details are encapsulated
*
*/