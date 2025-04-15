import { test } from "../../utils/fixtures";
import { LoginManager } from "../../utils/LoginManager";
import { sortByEnum } from "../../utils/saucedemoutils/sortByEnums";

test.describe('test to validate products are sorted by Z to A', () =>{
    test('Sort product by Z to A', async ({
        page,
        swagLabsPage
    }) => {
        const sortBy = sortByEnum.ZtoA;

        await test.step('Step1: login to the page', async () => {
            const loginManager = new LoginManager(page);
            loginManager.loginToSauceDemo();
        })

        await test.step('Step 2: Sort products by Z to A', async () => {
            await swagLabsPage.sortBy(sortBy);
        })

        await test.step('Step 3: validate the products are sorted by A to Z', async () => {
            await swagLabsPage.validateSortedFunctionality(sortBy);
        })
    })
})