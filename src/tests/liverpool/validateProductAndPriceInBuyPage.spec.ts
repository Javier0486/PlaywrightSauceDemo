import { ENV_CONFIG } from "../../config/config";
import { test } from "../../utils/fixtures";

test.describe('Test to validate the product name and product price in the Buy page', () => {
    test('validate the product selected displayed the product name and price in the Buy page', async ({
        page,
        livHomepage,
        livSearchpage,
        livBuypage,
    }) => {
        const searchProduct = 'playstation';
        const product = 'PLAYSTATION 5';
        const productType = 'Consolas';

        await test.step('Step 1 and Step 2: Search for playstation using the Search field, then click in Consolas product type', async () => {
            await page.goto(ENV_CONFIG.LIVERPOOL_URL);
            await livHomepage.searchProduct(searchProduct, productType);
        })

        await test.step('Step 3: click on Playstation 5 product and validate the name and price in the Buy page', async () => {
            const productPrice = await livSearchpage.getProductPrice(product);

            await livSearchpage.clickOnProduct(product);
            await livBuypage.validateProductTitle(product);
            await livBuypage.validatePrice(product, productPrice);
        })
    })
})