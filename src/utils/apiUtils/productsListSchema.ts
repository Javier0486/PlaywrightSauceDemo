import { JSONSchemaType } from "ajv";
import { ProductsListResponse } from "../../types/apiTypes";

// Defines validation rules - Design pattern used: Separation of concerns
/*
* Separation of concerns: The schema file (productsListSchema.ts) focuses solely on validation logic
*
*/
// JSON schema for "Get All Products List" - only focuses on validation
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
                    price: { type: "string" },
                    brand: { type: "string" },
                    category: {
                        type: "object",
                        properties: {
                            category: { type: "string" },
                        },
                        required: ["category"],
                    },
                    usertype: {
                        type: "object",
                        properties: {
                            usertype: { type: "string" },
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