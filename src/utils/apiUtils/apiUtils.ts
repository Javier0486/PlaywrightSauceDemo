import { APIRequestContext } from "playwright";
import Ajv, { JSONSchemaType } from "ajv";

// class to handle common API operations - Design pattern used: Separation of Concerns
/*
* ApiUtils class encapsulates common API operations (GET, schema validation, etc.), reducing duplication across tests.
* This makes the framework modular and easier to extend (eg. adding POST, PUT, or DELETE methods)
* 
*/
// API request and schema validation logic
/*
* Utility Class Patern
* 
*/
export class ApiUtils {
    private apiContext: APIRequestContext;
    private ajv: Ajv;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
        this.ajv = new Ajv(); // initialize AJV for schema validation
    }

    async get(endpoint: string) {
        const response = await this.apiContext.get(endpoint);
        if(!response.ok()) {
            throw new Error(`GET ${endpoint} failed with status ${response.status()}`);
        }
        return response.json();
    }

    /*
    * Reusability: this method can be reused across all API tests.
    *
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