import { test } from "../utils/fixtures";
import { USERNAME, PASSWORD } from "../config/config";
import { sortByEnum } from "../utils/sortByEnums";

test.describe('test to validate products are sorted by A to Z', () => {
    test('Sort products by A to Z', async ({
        loginPage,
        swagLabsPage
    }) => {
        const sortBy = sortByEnum.AtoZ;

        await test.step('Step 1: login to the page', async () => {
            await loginPage.navigate();
            await loginPage.login(USERNAME, PASSWORD);
        })

        await test.step('Step 2: Sort products by A to Z', async () => {
            await swagLabsPage.sortBy(sortBy);
        })

        await test.step('Step 3: sort products by A to Z', async () => {
            await swagLabsPage.validateSortedFunctionality(sortBy);
        })
    })
})