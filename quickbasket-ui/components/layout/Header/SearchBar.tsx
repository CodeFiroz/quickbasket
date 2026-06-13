"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearch } from "./useSearch";
import type { PopularProduct } from "./types";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popularProducts, setPopularProducts] = useState<PopularProduct[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { searchTerm, setSearchTerm, results, loading, error, clearSearch } = useSearch(300);

  useEffect(() => {
    // Fetch popular products
    const fetchPopularProducts = async () => {
      // Replace with your API call
      const mockPopular: PopularProduct[] = [
        { id: 1, name: "Wireless Headphones", price: 99.99, image: "/headphones.jpg" },
        { id: 2, name: "Smart Watch", price: 199.99, image: "/watch.jpg" },
        { id: 3, name: "Laptop Backpack", price: 49.99, image: "/backpack.jpg" },
      ];
      setPopularProducts(mockPopular);
    };
    
    fetchPopularProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = (): void => {
    clearSearch();
  };

  return (
    <div ref={searchRef} className="relative flex-1 max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsOpen(true)}
          className="w-full px-4 py-2 pl-10 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        />
        <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <XIcon size={18} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 z-50 max-h-96 overflow-y-auto">
          {searchTerm ? (
            <>
              {loading && (
                <div className="p-4 text-center">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
                  <p className="text-sm text-gray-500 mt-2">Searching...</p>
                </div>
              )}
              
              {error && (
                <div className="p-4 text-center">
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}
              
              {!loading && !error && results.length > 0 && (
                <div>
                  <div className="p-2 text-xs text-gray-500 border-b">Search Results ({results.length})</div>
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      href={`/product/${result.id}`}
                      onClick={() => setIsOpen(false)}
                      className="block p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{result.name}</p>
                          <p className="text-xs text-gray-500">{result.category}</p>
                        </div>
                        <p className="text-sm font-semibold text-blue-600">${result.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              
              {!loading && !error && results.length === 0 && searchTerm && (
                <div className="p-8 text-center">
                  <p className="text-gray-500">No products found for &quot;{searchTerm}&quot;</p>
                  <p className="text-sm text-gray-400 mt-1">Try different keywords</p>
                </div>
              )}
            </>
          ) : (
            <div className="p-4">
              <p className="text-xs font-semibold text-gray-500 mb-3">POPULAR PRODUCTS</p>
              <div className="space-y-3">
                {popularProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-md"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;