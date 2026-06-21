"use client";

import { useState, useEffect, useMemo } from "react";
import product from "@/data/product-variant.json";
import Image from "next/image";

interface ProductCardProps {
  productData?: typeof product;
}

interface Variant {
  _id: string;
  productId: string;
  sku: string;
  attributes: Record<string, string>;
  price: number;
  compareAtPrice: number | null;
  inventory: {
    quantity: number;
    reservedStock: number;
    lowStockAlert: number;
  };
  images: Array<{ url: string; alt: string }>;
  status: string;
}

const ProductCard = ({ productData = product }: ProductCardProps) => {
  const p = productData?.product;
  const haveVariants = p?.hasVariants;
  const variantAttributes = p?.variantAttributes || [];
  const allVariants = productData?.variants || [];

  // State for selected variant combinations
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  // Get available values for each attribute based on selected attributes
  const getAvailableValues = (attributeName: string) => {
    const currentAttrIndex = variantAttributes.findIndex(attr => attr.name === attributeName);
    
    // Build filter object with currently selected attributes (excluding current)
    const filter: Record<string, string> = {};
    Object.entries(selectedAttributes).forEach(([key, value]) => {
      if (key !== attributeName && value) {
        filter[key] = value;
      }
    });

    // Filter variants that match selected attributes
    const matchingVariants = allVariants.filter(variant => {
      return Object.entries(filter).every(([key, value]) => {
        return variant.attributes[key] === value;
      });
    });

    // Get unique values for this attribute from matching variants
    const availableValues = new Set<string>();
    matchingVariants.forEach(variant => {
      const value = variant.attributes[attributeName];
      if (value) availableValues.add(value);
    });

    return Array.from(availableValues);
  };

  // Check if a specific variant combination is in stock
  const isVariantInStock = (attributes: Record<string, string>) => {
    const variant = allVariants.find(v => 
      Object.entries(attributes).every(([key, value]) => 
        v.attributes[key] === value
      )
    );
    return variant && variant.inventory.quantity > 0 && variant.status === "active";
  };

  // Handle attribute selection
  const handleAttributeSelect = (attributeName: string, value: string) => {
    setSelectedAttributes(prev => {
      const newSelection = { ...prev, [attributeName]: value };
      
      // Clear subsequent selections that become invalid
      const attrNames = variantAttributes.map(attr => attr.name);
      const currentIndex = attrNames.indexOf(attributeName);
      
      for (let i = currentIndex + 1; i < attrNames.length; i++) {
        const nextAttr = attrNames[i];
        const available = getAvailableValues(nextAttr);
        if (newSelection[nextAttr] && !available.includes(newSelection[nextAttr])) {
          delete newSelection[nextAttr];
        }
      }
      
      return newSelection;
    });
  };

  // Find and set the matching variant when selections change
  useEffect(() => {
    const allSelected = variantAttributes.every(
      attr => selectedAttributes[attr.name] && selectedAttributes[attr.name].length > 0
    );

    if (allSelected) {
      const matchedVariant = allVariants.find(variant =>
        Object.entries(selectedAttributes).every(([key, value]) =>
          variant.attributes[key] === value
        )
      );
      setSelectedVariant(matchedVariant || null);
    } else {
      setSelectedVariant(null);
    }
  }, [selectedAttributes, variantAttributes, allVariants]);

  // Calculate display price
  const displayPrice = useMemo(() => {
    if (selectedVariant) {
      return {
        price: `$${selectedVariant.price.toFixed(2)}`,
        compareAt: selectedVariant.compareAtPrice 
          ? `$${selectedVariant.compareAtPrice.toFixed(2)}` 
          : null,
        inStock: selectedVariant.inventory.quantity > 0,
        quantity: selectedVariant.inventory.quantity,
      };
    }
    
    // Default to base price if available
    if (p?.pricing?.basePrice) {
      return {
        price: `$${p.pricing.basePrice.toFixed(2)}`,
        compareAt: p.pricing.compareAtPrice 
          ? `$${p.pricing.compareAtPrice.toFixed(2)}` 
          : null,
        inStock: p.inventory?.quantity > 0,
        quantity: p.inventory?.quantity || 0,
      };
    }
    
    return {
      price: "Price not available",
      compareAt: null,
      inStock: false,
      quantity: 0,
    };
  }, [selectedVariant, p]);

  // Check if all required attributes are selected
  const allAttributesSelected = useMemo(() => {
    return variantAttributes.every(
      attr => selectedAttributes[attr.name] && selectedAttributes[attr.name].length > 0
    );
  }, [selectedAttributes, variantAttributes]);

  // Reset selections
  const resetSelections = () => {
    setSelectedAttributes({});
    setSelectedVariant(null);
  };

  // Get selected variant image
  const displayImage = useMemo(() => {
    if (selectedVariant?.images?.[0]?.url) {
      return selectedVariant.images[0];
    }
    return p?.images?.main;
  }, [selectedVariant, p]);

  return (
    <div className="w-full border border-gray-100 p-3 rounded-lg hover:shadow-lg transition-shadow duration-200 bg-white">
      {/* Image Section */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50 rounded-lg">
        {displayImage?.url ? (
          <Image
            alt={displayImage.alt || "Product image"}
            src={displayImage.url}
            width={400}
            height={400}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Product Name */}
      <p className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[2.5rem] mt-3">
        {p?.name || "Unnamed Product"}
      </p>

      {/* Price Display */}
      <div className="mt-1 flex items-center gap-2">
        <span className={`text-lg font-bold ${displayPrice.inStock ? 'text-theme' : 'text-gray-500'}`}>
          {displayPrice.price}
        </span>
        {displayPrice.compareAt && (
          <span className="text-sm text-gray-400 line-through">
            {displayPrice.compareAt}
          </span>
        )}
        {!displayPrice.inStock && (
          <span className="text-xs text-red-500 font-medium ml-2">Out of Stock</span>
        )}
        {selectedVariant && displayPrice.inStock && (
          <span className="text-xs text-green-600 font-medium ml-2">
            In Stock ({displayPrice.quantity})
          </span>
        )}
      </div>

      {/* Variant Selection */}
      {haveVariants && variantAttributes.length > 0 && (
        <div className="mt-3 space-y-3">
          {variantAttributes.map((attr, idx) => {
            const availableValues = getAvailableValues(attr.name);
            const selectedValue = selectedAttributes[attr.name] || "";

            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-700">
                    {attr.name}:
                  </span>
                  {selectedValue && (
                    <span className="text-xs text-gray-500">
                      Selected: {selectedValue}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {attr.values.map((value: string) => {
                    const isAvailable = availableValues.includes(value);
                    const isSelected = selectedValue === value;
                    const isOutOfStock = !isVariantInStock({
                      ...selectedAttributes,
                      [attr.name]: value,
                    });

                    return (
                      <button
                        key={value}
                        onClick={() => isAvailable && handleAttributeSelect(attr.name, value)}
                        disabled={!isAvailable}
                        className={`
                          text-xs px-3 py-1.5 rounded-full border transition-all duration-200
                          ${isSelected 
                            ? 'bg-theme text-white border-theme shadow-md' 
                            : isAvailable 
                              ? 'bg-white text-gray-700 border-gray-200 hover:border-theme hover:bg-gray-50' 
                              : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50'
                          }
                          ${isOutOfStock && isAvailable ? 'border-red-200 text-red-400' : ''}
                        `}
                      >
                        {value}
                        {isOutOfStock && isAvailable && ' (Out of Stock)'}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add to Cart Section */}
      <div className="mt-4 space-y-2">
        <button
          className={`
            w-full text-white text-sm text-center rounded-full py-2.5 px-4 transition-all duration-200
            ${allAttributesSelected && displayPrice.inStock
              ? 'bg-theme hover:bg-theme-dark hover:shadow-lg' 
              : 'bg-gray-300 cursor-not-allowed'
            }
          `}
          disabled={!allAttributesSelected || !displayPrice.inStock}
          onClick={() => {
            if (selectedVariant) {
              console.log("Add to cart:", {
                productId: p?._id,
                variantId: selectedVariant._id,
                sku: selectedVariant.sku,
                attributes: selectedAttributes,
                price: selectedVariant.price,
                quantity: 1,
              });
            } else {
              console.log("Add to cart:", {
                productId: p?._id,
                price: p?.pricing?.basePrice,
                quantity: 1,
              });
            }
          }}
        >
          {!haveVariants 
            ? 'Add to Cart'
            : !allAttributesSelected 
              ? 'Select Options'
              : !displayPrice.inStock 
                ? 'Out of Stock' 
                : `Add to Cart - ${displayPrice.price}`
          }
        </button>

        {/* Reset button when variants are selected */}
        {haveVariants && allAttributesSelected && (
          <button
            onClick={resetSelections}
            className="w-full text-xs text-gray-500 hover:text-theme transition-colors"
          >
            Clear Selection
          </button>
        )}
      </div>

      {/* SKU Display for selected variant */}
      {selectedVariant && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            SKU: {selectedVariant.sku}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;