import { ENV_CONFIG } from "../../config/config";
import { expect, test } from "../../utils/fixtures";
import { PageUtils } from "../../utils/PageUtils";

test.describe('Test to validate the navigation through Categorias menu', () => {
    test('validate DIOR permies are displayed in the Search page', async ({
        page,
        livHomepage,
        livSearchpage,
    }) => {
        const categoriasOption = 'Categorías'
        const menuOption = 'Belleza';
        const submenuOption = 'Perfumes Hombre';
        const perfumesHombreUrl = 'https://www.liverpool.com.mx/tienda/perfumes-hombre/catst44258581';
        const brandName = 'DIOR';
        const sectionName = 'Tamaño';

        await test.step('Step 1: click in Categorias menu', async () => {
            await page.goto(ENV_CONFIG.LIVERPOOL_URL);
            await livHomepage.clickOptionsInPage(categoriasOption);
            await livHomepage.validateCategoryMenuLogo();
        })

        await test.step('Step 2: mouse over Belleza option', async () => {
            await livHomepage.mouseOverCategory(menuOption);
            await livHomepage.validateOptionMenuDisplayed(submenuOption);
        })

        await test.step('Step 3: click in Perfumes Hombre option', async () => {
            await livHomepage.clickCategory(submenuOption);

            await page.waitForTimeout(2500);
            try {
                await PageUtils.validateUrl(page, perfumesHombreUrl);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        })

        await test.step('Step 4: filter by DIOR brand and validate DIOR products are displayed', async () => {
            await livSearchpage.searchBrand(brandName);
            await livSearchpage.selectCheckbox(brandName, sectionName);
            await livSearchpage.validateProductBrandSearch(brandName);
        })
    
    })
})