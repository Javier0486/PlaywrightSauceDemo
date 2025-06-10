import { ENV_CONFIG } from "../../config/config";
import { expect, test } from "../../fixtures/fixtures";

test.describe('Test to validate the filters in the search page', () => {
    test('validate size and price filters', async ({
        page,
        livHomepage,
        livSearchpage,
        livBuypage,
    }) => {
        const searchProduct = 'smart tv';
        const filterOne = '55 pulgadas';
        const filterTwo = 'Mas de $10000.0';
        const filterThree = 'SONY';
        const filterTitleOne = 'Tamaño';
        const filterTitleTwo = 'Precios';
        const sectionOne = 'Tamaño';
        const sectionTwo = 'Precios';
        const sectionThree = 'Marcas';

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
            await page.waitForTimeout(4000);
            await livSearchpage.validateFilterSelected(filterOne);
        })

        await test.step('Step 4: select greater than $10000.0 and validate the results count is correct', async () => {
            //const resultsCount = await livSearchpage.takeNumberOfProducts(filterTwo);

            await livSearchpage.selectRadioButton(filterTwo, sectionTwo);
            await page.waitForTimeout(4000);
            await livSearchpage.validateFilterSelected(filterTwo);

            //await page.waitForTimeout(5000);

            //await livSearchpage.validateResultsCount(resultsCount);
        })

        await test.step('Step 5: select Sony in the "Marcas" filter', async () => {
            const sectionToScroll = await livSearchpage.searchFilterLocator(sectionThree);
            await sectionToScroll.scrollIntoViewIfNeeded();
            await livSearchpage.searchBrand(filterThree);

            const resultsCount = await livSearchpage.takeNumberOfProducts(filterThree);

            await livSearchpage.selectCheckbox(filterThree, sectionThree);
            await page.waitForTimeout(5000);
            await livSearchpage.validateFilterSelected(filterThree);

            await page.waitForTimeout(5000);

            await livSearchpage.validateResultsCount(resultsCount)
        })

        await test.step('Step 6: select any smart tv and validate the green banner appears', async () => {
            await livSearchpage.productCardLocator.first().click();

            //await livBuypage.addToCartLocator.click();

            //await livBuypage.guarantyButtonsLocator.click();

            //await expect(await livBuypage.greenAddBannerLocator).toBeTruthy();
            await livBuypage.addProductNoGuarantyAndValidateGreenAlert();
        })

    })
})