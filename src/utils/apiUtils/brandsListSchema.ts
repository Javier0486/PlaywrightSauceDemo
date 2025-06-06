import { JSONSchemaType } from "ajv";
import { BrandsListResponse } from "../../types/apiTypes";

export const brandsListSchema: JSONSchemaType<BrandsListResponse> = {
    type: "object",
    properties: {
        responseCode: { type: "integer" },
        brands: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    brand: { type: "string" },
                },
                required: ["id", "brand"],
            },
        },
    },
    required: ["responseCode", "brands"],
};