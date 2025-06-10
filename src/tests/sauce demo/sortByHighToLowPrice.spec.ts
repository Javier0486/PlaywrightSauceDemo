import { test } from "../../fixtures/fixtures";
import { LoginManager } from "../../managers/LoginManager";
import { sortByEnum } from "../../utils/saucedemoutils/sortByEnums";

test.describe(`test to validate product are sorted by high to low price`, () => {
    test('Sort products by high to low price', async ({
        swagLabsPage,
        page
    }) => {
        const sortBy = sortByEnum.HighToLow;
        
        await test.step('Step 1: login to the page', async () => {
            const loginManager = new LoginManager(page);
            await loginManager.loginToSauceDemo();
        })

        await test.step('Step 2: Sort products by high to low price', async () => {
            await swagLabsPage.sortBy(sortBy);
        })

        await test.step('Step 3: Validate the products are sorted by high to low price', async () => {
            await swagLabsPage.validateSortedFunctionality(sortBy);
        })
    })
})