// src/components/HairProductSection.js
import React, { useState } from "react";
import { hairProductData } from "../../../helpers/dummyData";
import CategoryTabs from "../../../shared/CustomProductsSection/CategoryTabs";
import ProductDisplay from "../../../shared/CustomProductsSection/ProductDisplay";

function HairProductSection() {
  const [activeCategory, setActiveCategory] = useState("Dandruff & Scalp Care");

  const filteredProducts = hairProductData.filter(
    (product) => product.category === activeCategory
  );

  const categories = [
    "Dandruff & Scalp Care",
    "Hair Fall Control",
    "Split Ends & Dry Hair",
  ];

  const getCategoryDetails = (categoryName) => {
    const details = {
      "Dandruff & Scalp Care":
        "Medicated shampoos and treatments to soothe irritated scalps and combat dandruff.",
      "Hair Fall Control":
        "Specialized products to strengthen hair follicles and reduce hair shedding.",
      "Split Ends & Dry Hair":
        "Hydrating serums and conditioners to restore moisture and repair damaged strands.",
    };
    return { name: categoryName, description: details[categoryName] };
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-0 bg-white">
      <h2 className="text-4xl font-semibold text-center mb-8">
        Healthy hair starts here
      </h2>
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <ProductDisplay
        products={filteredProducts}
        activeCategoryDetails={getCategoryDetails(activeCategory)}
      />
    </div>
  );
}

export default HairProductSection;
