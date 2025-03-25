import { test } from "../utils/fixtures";
import { USERNAME, PASSWORD } from "../config/config";
import { sortByEnum } from "../utils/sortByEnums";

test.describe('test to validate products are sorted by A to Z', () =>{
    test('Sort product by A to Z', async ({
        loginPage,
        swagLabsPage
    }) => {
        const sortBy = sortByEnum.ZtoA;

        await test.step('Step1: login to the page', async () => {
            await loginPage.navigate();
            await loginPage.login(USERNAME, PASSWORD);
        })

        await test.step('Step 2: Sort products by high to low price', async () => {
            await swagLabsPage.sortBy(sortBy);
        })

        await test.step('Step 3: validate the products are sorted by A to Z', async () => {
            await swagLabsPage.validateSortedFunctionality(sortBy);
        })
    })
})