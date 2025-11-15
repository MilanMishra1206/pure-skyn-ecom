import React from "react";
import ProductCarousel from "../ProductCarousel";
import CategoryHero from "../CategoryHero";
import CategoryTabs from "../CategoryTabs";

const ProductDisplay = ({
  products,
  activeCategoryDetails,
  categories,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:!w-[25%] xl:!w-[30%]">
        <CategoryHero details={activeCategoryDetails} />
      </div>
      <div className="w-full lg:!w-[75%] xl:!w-[70%] flex flex-col">
        <div className="shrink-0 mb-2">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>
        <div className="grow overflow-hidden">
          <ProductCarousel products={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
