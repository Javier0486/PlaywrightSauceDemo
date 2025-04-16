import { test, expect, request } from "@playwright/test";
import { ApiUtils } from "../../utils/apiUtils/apiUtils";
import { AE_API_URL } from "../../config/config";
import { BrandsListResponse } from "../../types/apiTypes";
import { brandsListSchema } from "../../utils/apiUtils/brandsListSchema";

test.describe('API validation: Get all Brands list', () => {
    test('Validate Get all Brands List', async () => {
        // Test Setup
        const apiContext = await request.newContext();
        const apiUtils = new ApiUtils(apiContext);

        // API Execution
        const { status, json } = await apiUtils.get(`${AE_API_URL}/brandsList`);

        console.log(`Status code: ${status}`);
        console.log('Response JSON: ', json);

        // Response Validation
        // 1. Validate response schema matches expected structure
        apiUtils.validateSchema<BrandsListResponse>(json, brandsListSchema);
        
        // 2. Verify critical response properties exist
        expect(status).toBe(200);
        expect(json).toHaveProperty('brands');
        expect(Array.isArray(json.brands)).toBeTruthy();
    })
})