import { test } from "../utils/fixtures";
import { USERNAME, PASSWORD } from "../config/config";
import { sortByEnum } from "../utils/sortByEnums";

test.describe(`test to validate product are sorted by low to high price`, () => {
    test('Sort products by low to high price', async ({ 
        loginPage, 
        swagLabsPage 
    }) => {
        const sortBy = sortByEnum.LowToHigh;

        await test.step('Step 1: login to the page', async () => {
            await loginPage.navigate();
            await loginPage.login(USERNAME, PASSWORD);
        })

        await test.step('Step 2: Sort products by high to low price', async () => {
            await swagLabsPage.sortBy(sortBy);
        })

        await test.step('Step 3: Validate the products are sorted by low to high price', async () => {
            await swagLabsPage.validateSortedFunctionality(sortBy);
        })
    })
})