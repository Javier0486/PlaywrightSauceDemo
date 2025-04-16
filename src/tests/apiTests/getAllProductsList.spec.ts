import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../../utils/apiUtils/apiUtils';
import { AE_API_URL } from '../../config/config';
import { productsListSchema } from '../../utils/apiUtils/productsListSchema';
import { ProductsListResponse } from '../../types/apiTypes';

/**
 * API Test Suite for Get All Products List endpoint
 * 
 * Test Stratefy:
 * 1. Functional validation of the products API
 * 2. Response structure validation
 * 3. Type safety verification
 */
test.describe('API validation: Get All Products List', () => {
    test('Validate Get All Products List API', async () => {
        // Test Setup
        const apiContext = await request.newContext();
        const apiUtils = new ApiUtils(apiContext);

        // API Execution
        const { status, json } = await apiUtils.get(`${AE_API_URL}/productsList`);

        console.log(`Status code: ${status}`);
        console.log(`Response JSON: `, json);

        // Response Validation
        // 1. Validate response schema matches expected structure
        apiUtils.validateSchema<ProductsListResponse>(json, productsListSchema);

        // 2. Verify critical response properties exist
        expect(status).toBe(200);
        expect(json).toHaveProperty('products');
        expect(Array.isArray(json.products)).toBeTruthy();
    });
});
