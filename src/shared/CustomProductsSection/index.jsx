import React, { useState } from "react";
import CategoryTabs from "./CategoryTabs";
import ProductDisplay from "./ProductDisplay";
import { productList } from "../../helpers/productsData";

function CustomProductsSection({ heading, categories, categoryDetails }) {
  const [activeCategory, setActiveCategory] = useState(
    categories[0].subCategory
  );

  const filteredProducts = productList
    ?.filter((product) => product?.subCategory === activeCategory)
    .slice(0, 5);

  const getCategoryDetails = (categoryName) => ({
    name: categoryDetails?.[categoryName]?.name,
    description: categoryDetails?.[categoryName]?.desc,
    imgSrc: categoryDetails?.[categoryName]?.imgSrc,
    link: categoryDetails?.[categoryName]?.link,
  });

  return (
    <div className="container mx-auto py-12 px-4 md:px-2 bg-white">
      <h2 className="text-4xl font-semibold text-center mb-8">{heading}</h2>
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
