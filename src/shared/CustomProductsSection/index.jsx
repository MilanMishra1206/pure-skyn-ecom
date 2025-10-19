import React, { useState } from "react";
import { skincareData } from "../../helpers/dummyData";
import CategoryTabs from "./CategoryTabs";
import ProductDisplay from "./ProductDisplay";

function CustomProductsSection() {
  const [activeCategory, setActiveCategory] = useState("Pigmentation");

  const filteredProducts = skincareData.filter(
    (product) => product.category === activeCategory
  );

  const categories = [
    "Pigmentation",
    "Acne & Acne Scars",
    "Eczema",
    "Ageing",
    "Damaged & Sensitive Skin",
    "Under Eye Concerns",
  ];

  const getCategoryDetails = (categoryName) => {
    // You'd typically pull this from a dedicated data source
    const details = {
      Pigmentation:
        "From occasional spots to full-on breakouts, to melasma, to freckles, to even hyperpigmentation we have you covered for blemish-free skin.",
      "Acne & Acne Scars":
        "Solutions for clearing breakouts and reducing the appearance of scars.",
      Eczema: "Gentle and soothing products to help relieve dry, itchy skin.",
      Ageing:
        "Formulas to help with fine lines, wrinkles, and skin elasticity.",
      "Damaged & Sensitive Skin":
        "Barrier-repairing and calming products for irritated skin.",
      "Under Eye Concerns":
        "Targeted treatments for dark circles, puffiness, and fine lines.",
    };
    return { name: categoryName, description: details[categoryName] };
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-0 bg-white">
      <h2 className="text-4xl font-semibold text-center mb-8">
        Proven skincare
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

export default CustomProductsSection;
