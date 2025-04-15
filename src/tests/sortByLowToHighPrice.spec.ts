import { test } from "../utils/fixtures";
import { LoginManager } from "../utils/LoginManager";
import { sortByEnum } from "../utils/sortByEnums";

test.describe(`test to validate product are sorted by low to high price`, () => {
    test('Sort products by low to high price', async ({ 
        page, 
        swagLabsPage 
    }) => {
        const sortBy = sortByEnum.LowToHigh;

        await test.step('Step 1: login to the page', async () => {
            const loginManager = new LoginManager(page);
            await loginManager.loginToSauceDemo();
        })

        await test.step('Step 2: Sort products by high to low price', async () => {
            await swagLabsPage.sortBy(sortBy);
        })

        await test.step('Step 3: Validate the products are sorted by low to high price', async () => {
            await swagLabsPage.validateSortedFunctionality(sortBy);
        })
    })
})