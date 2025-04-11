import { APIRequestContext } from "playwright";

// class to handle common API operations
export class ApiUtils {
    private apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async get(endpoint: string) {
        const response = await this.apiContext.get(endpoint);
        if(!response.ok()) {
            throw new Error(`GET ${endpoint} failed with status ${response.status()}`);
        }
        return response.json();
    }
}