import { ENV_CONFIG } from "../../config/config";
import { expect, test } from "../../utils/fixtures";

test.describe('Test to validate the filters in the search page', () => {
    test('validate size and price filters', async ({
        page,
        livHomepage,
        livSearchpage,
    }) => {
        const searchProduct = 'smart tv';
        const filterOne = '55 pulgadas';
        const filterTwo = 'Mas de $10000.0';
        const filterTitleOne = 'Tamaño';
        const filterTitleTwo = 'Precios';
        const sectionOne = 'Tamaño';
        const sectionTwo = 'Precios'

        await test.step('Step 1: go to liverpool page and search for smart tv from the search input field', async () => {
            await page.goto(ENV_CONFIG.LIVERPOOL_URL);
            await livHomepage.searchProduct(searchProduct);
        })

        await test.step('Step 2: validate the Price and Size filter sections are displayed', async () => {
            expect(await livSearchpage.searchFilterLocator(filterTitleOne)).toBeTruthy();
            expect(await livSearchpage.searchFilterLocator(filterTitleTwo)).toBeTruthy();
        })

        await test.step('Step 3: select 55 inches in the Size filter', async () => {
            await livSearchpage.selectCheckbox(filterOne, sectionOne);
        })

        await test.step('Step 4: select greater than $10000.0 and validate the results count is correct', async () => {
            const resultsCount = await livSearchpage.takeNumberOfProducts(filterTwo);
            console.log(`the total should be: ${resultsCount}`)
            
            await livSearchpage.selectRadioButton(filterTwo, sectionTwo);

            await livSearchpage.validateResultsCount(resultsCount);
        })
    })
})