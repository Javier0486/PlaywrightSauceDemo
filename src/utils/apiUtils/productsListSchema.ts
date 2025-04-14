import { JSONSchemaType } from "ajv";
import { ProductsListResponse } from "../../types/apiTypes";

/**
 * JSON Schema validation for Products List API response.
 * 
 * Implements Separation of Concerns principle by:
 * - Isolating validation rules from business logic
 * - Providing a single source of truth for response structure
 * - Enabling reusable validation across tests
 * 
 * Validates:
 * - Overall response structure
 * - Product object requirements
 * - Data types for all fields
 */
export const productsListSchema: JSONSchemaType<ProductsListResponse> = {
    type: "object",
    properties: {
        responseCode: { type: "integer" },
        products: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    name: { type: "string" },
                    price: { type: "string" }, // Note: Price as string to accommodate currency symbols
                    brand: { type: "string" },
                    category: {
                        type: "object",
                        properties: {
                            category: { type: "string" }, // Nested category object
                        },
                        required: ["category"],
                    },
                    usertype: {
                        type: "object",
                        properties: {
                            usertype: { type: "string" }, // Nested usertype object
                        },
                        required: ["usertype"],
                    },
                },
                required: ["id", "name", "price", "brand", "category"],
            },
        },
    },
    required: ["responseCode", "products"],
};