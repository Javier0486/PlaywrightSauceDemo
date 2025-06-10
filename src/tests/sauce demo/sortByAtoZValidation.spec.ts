import { test } from "../../fixtures/fixtures";
import { sortByEnum } from "../../utils/saucedemoutils/sortByEnums";
import { LoginManager } from "../../managers/LoginManager";

test.describe('test to validate products are sorted by A to Z', () => {
    test('Sort products by A to Z', async ({
        page,
        swagLabsPage
    }) => {
        const sortBy = sortByEnum.AtoZ;

        await test.step('Step 1: login to the page', async () => {
            const loginManager = new LoginManager(page);
            await loginManager.loginToSauceDemo();
        })

        await test.step('Step 2: Sort products by A to Z', async () => {
            await swagLabsPage.sortBy(sortBy);
        })

        await test.step('Step 3: sort products by A to Z', async () => {
            await swagLabsPage.validateSortedFunctionality(sortBy);
        })
    })
})