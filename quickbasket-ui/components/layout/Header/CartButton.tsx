"use client";

import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import type { CartItem } from "./types";

const CartButton = () => {
  // In a real app, this would come from a cart context/state management
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);

  useEffect(() => {
    // Mock cart data - replace with actual cart context
    const mockCartItems: CartItem[] = [
      { id: 1, name: "Product 1", price: 50, quantity: 2 },
      { id: 2, name: "Product 2", price: 30, quantity: 3 },
    ];
    setCartItems(mockCartItems);
    
    const total = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex items-center gap-4">
      <Link href="/cart" className="relative group">
        <div className="size-10 flex justify-center items-center bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
          <ShoppingBag size={20} />
        </div>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>

      <div className="hidden sm:block">
        <span className="text-xs text-gray-500">My Cart</span>
        <p className="text-sm font-semibold text-gray-900">
          ${cartTotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartButton;