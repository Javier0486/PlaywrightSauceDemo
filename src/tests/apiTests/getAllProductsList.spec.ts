import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../../utils/apiUtils/apiUtils';
import { AE_GETPRODUCTS_URL } from '../../config/config';
import { productsListSchema } from '../../utils/apiUtils/productsListSchema';
import { ProductsListResponse } from '../../types/apiTypes';

test.describe('API validation: Get All Products List', () => {
    test('Validate Get All Products List API', async () => {
        const apiContext = await request.newContext();
        const apiUtils = new ApiUtils(apiContext);

        const response = await apiUtils.get(`${AE_GETPRODUCTS_URL}/productsList`);

        // Log status code from the response 
        console.log(`Status code: ${response.statusCode}`);

        // Schema Validation - The code uses JSON schema validation (with AJV library) to ensure API responses match expected
        // Validate JSON structure (which should include status code validation)
        apiUtils.validateSchema<ProductsListResponse>(response, productsListSchema);

        // Validate response checks
        expect(response.body).toHaveProperty('products');
        expect(Array.isArray(response.body.products)).toBeTruthy();
        console.log('Response JSON: ', response);
    });
});

/*
* Flow of Execution
* 1. Test starts in getAllProducts.spec.ts
* 2. Creates API context and utility instance
* 3. Makes GET request using  ApiUtils.get()
* 4. Validates status  code directly
* 5. Validates response structure using ApiUtils.validateSchema();
*    - This checks against the schema defined in productsListSchema.ts
*    - Using types defined in apiTypes.ts
* 6. Also does some manual checks on the response properties
* 
* Benefits of this Structure
* 1. Reusability: The utility class can be used for many different API tests
* 2. Maintainability: Changes to API structure only need updates in one place (schema/types)
* 3. Readability: Each file has a clear, single purpose
* 4. Type Safety: TypeScript helps catch errors early
* 5. Validation: Schema validation ensures API contracts are maintained
* This architecture makes it easy to add more API tests while keeping the code clean and maintainable.
* 
*/