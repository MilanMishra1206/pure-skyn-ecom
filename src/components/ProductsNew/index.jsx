import React, { useState } from "react";

import { hairProductData, skinProductData } from "../../helpers/dummyData";
import ProductFilter from "./ProductFilter";
import HeroSection from "./HeroSection";
import ProductGridNew from "./ProductGridNew";

// Map category names to their data sources
const categoryDataMap = {
  skin: skinProductData,
  hair: hairProductData,
  // Add other categories here
};

function Products({ category }) {
  const [filters, setFilters] = useState({
    price: [],
    concerns: [],
  });

  const allProducts = categoryDataMap[category] || [];

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type].includes(value)
        ? prevFilters[type].filter((item) => item !== value)
        : [...prevFilters[type], value],
    }));
  };

  const filteredProducts = allProducts.filter((product) => {
    const isPriceMatch =
      filters.price.length === 0 ||
      filters.price.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return product.price >= min && product.price <= max;
      });
    const isConcernMatch =
      filters.concerns.length === 0 ||
      filters.concerns.includes(product.concern);
    return isPriceMatch && isConcernMatch;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroSection category={category} />
      <div className="container mx-auto px-4 md:px-0 mt-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <ProductFilter
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="w-full lg:w-3/4">
          <ProductGridNew products={filteredProducts} category={category} />
        </div>
      </div>
    </div>
  );
}

export default Products;
