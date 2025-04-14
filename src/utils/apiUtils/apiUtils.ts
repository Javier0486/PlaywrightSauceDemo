import { APIRequestContext } from "playwright";
import Ajv, { JSONSchemaType } from "ajv";

/*
 * Encapsulates common API operations (GET, schema validation) for
 * reusability across tests.
 * Design Patterns:
 * - Separation of Concerns: Isolates API logic from test scripts.
 * - Utility Class Pattern: Centralizes reusable methods.
 * 
 * Extensible: Can be expanded with additional methods (POST, PUT, DELETE).
 */
export class ApiUtils {
    private apiContext: APIRequestContext;
    private ajv: Ajv;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
        this.ajv = new Ajv(); // initialize AJV for schema validation
    }

    /*
     * Sends a GET request to the specified endpoint.
     * @throws Error if the response status is not OK (2xx).
     */
    async get(endpoint: string) {
        const response = await this.apiContext.get(endpoint);
        if(!response.ok()) {
            throw new Error(`GET ${endpoint} failed with status ${response.status()}`);
        }
        return response.json();
    }

    /*
     * Validates data against a JSON schema. 
     * @returns Type guard (`data is T`) for type-safe validation.
     * @throws Error if validation fails.
     */
    validateSchema<T>(data: unknown, schema: JSONSchemaType<T>): data is T {
        const validate = this.ajv.compile(schema);
        const valid = validate(data);
        if(!valid) {
            throw new Error(`Schema validation failed: ${JSON.stringify(validate.errors)}`);
        }
        return true;
    }
}