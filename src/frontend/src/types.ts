// Local type definitions bridging the backend.
// These match the generated backend types and are used throughout the frontend.
import type { ExternalBlob } from "./backend";

export type { ExternalBlob };

export interface Product {
  id: bigint;
  inStock: boolean;
  name: string;
  createdAt: bigint;
  description: string;
  category: string;
  brand: string;
  image?: ExternalBlob;
  price?: string;
}

export enum UserRole {
  admin = "admin",
  user = "user",
  guest = "guest",
}

export interface BackendActor {
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductsByBrand(brand: string): Promise<Product[]>;
  getProduct(id: bigint): Promise<Product | null>;
  addProduct(product: Product): Promise<bigint>;
  updateProduct(id: bigint, product: Product): Promise<void>;
  deleteProduct(id: bigint): Promise<void>;
  getCategories(): Promise<string[]>;
  getBrands(): Promise<string[]>;
  addCategory(category: string): Promise<void>;
  removeCategory(category: string): Promise<void>;
  addBrand(brand: string): Promise<void>;
  removeBrand(brand: string): Promise<void>;
  isCallerAdmin(): Promise<boolean>;
  getCallerUserRole(): Promise<UserRole>;
}
