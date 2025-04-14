/* 
 * Design Principles:
 * - Separation of Concerns: Interfaces are centralized here for data 
 * structure definitions
 * - Reusability: Interfaces can be imported and reused across the 
 * application
 * - Type Safety: TypeScript interfaces enforce compile-time type checking
 */

// Product-related interfaces
export interface Category {
    category: string;
}

export interface UserType {
    usertype: string;
}

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