/*
* Separation of concerns: Interfaces are centralized in apiTest.ts, making them reusable across multiple schemas and tests.
* Reusability:Interfaces in apiTypes.ts can be reused for other APIs that share similar structures.
*
*/
// Defines data structures - Design pattern used: Separation of Concerns
// Utility Class Patter used: here, common API oprations are encapsulated, making them reusable across tests

export interface Category {
    category: string;
}

export interface UserType {
    usertype: string;
}

// Type Safety - the code uses TS interfaces to define expected data shapes, catching errors at compile time
export interface Product {
    id: number;
    name: string;
    price: string;
    brand: string;
    category: Category;
    usertype: UserType;
}

export interface ProductsListResponse {
    responseCode: number;
    products: Product[]
}