import React, { useState } from "react";
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
    <div className="container mx-auto py-2 px-4 md:px-2 bg-white">
      <h2 className="text-2xl font-semibold text-center mb-8">{heading}</h2>
      <ProductDisplay
        products={filteredProducts}
        activeCategoryDetails={getCategoryDetails(activeCategory)}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
    </div>
  );
}

export default CustomProductsSection;
