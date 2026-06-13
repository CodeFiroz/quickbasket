// types.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  category?: string;
}

export interface NavItem {
  url: string;
  name: string;
}

export interface NavMenu {
  leftNav: NavItem[];
  rightNav: NavItem[];
}

export interface SearchResult {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface PopularProduct extends Product {}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}