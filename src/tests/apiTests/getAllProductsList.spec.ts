import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../../utils/apiUtils';
import { AE_GETPRODUCTS_URL } from '../../config/config';

test.describe('API validation: Get All Products List', () => {
    test('Validate Get All Products List API', async () => {
        const apiContext = await request.newContext();
        const apiUtils = new ApiUtils(apiContext);

        const response = await apiUtils.get(`${AE_GETPRODUCTS_URL}/productsList`);

        // Validate response status code
        const statusCode = await apiContext.get(`${AE_GETPRODUCTS_URL}productsList`).then(res => res.status());
        expect(statusCode).toBe(200);

        // Validate response status and structure
        expect(response).toHaveProperty('products');
        expect(Array.isArray(response.products)).toBeTruthy();
        console.log('Response JSON: ', response);
    });
});