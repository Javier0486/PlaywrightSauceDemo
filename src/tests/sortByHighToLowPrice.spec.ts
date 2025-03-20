import { test } from "../utils/fixtures";
import { USERNAME, PASSWORD } from "../config/config";
import { sortByEnum } from "../utils/sortByEnums";

test.describe(`test to validate product are sorted by high to low price`, () => {
    test('Sort products by high to low price', async ({
        loginPage,
        swagLabsPage,
        page
    }) => {
        const sortBy = sortByEnum.HighToLow;
        
        await test.step('Step 1: login to the page', async () => {
            await loginPage.navigate();
            await loginPage.login(USERNAME, PASSWORD);
        })

        await test.step('Step 2: Sort products by high to low price', async () => {
            await swagLabsPage.sortBy(sortBy);
        })

        await test.step('Step 3: Validate products are sorted by high to low price', async () => {
            await swagLabsPage.validatePricesSortedHighToLow();
        })
    })
})