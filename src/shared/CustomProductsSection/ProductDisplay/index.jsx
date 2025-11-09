import React from 'react';
import ProductCarousel from '../ProductCarousel';
import CategoryHero from '../CategoryHero';

const ProductDisplay = ({ products, activeCategoryDetails }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center">
      <div className="w-full lg:w-2/5">
        <CategoryHero details={activeCategoryDetails} />
      </div>
      <div className="w-full lg:w-3/5">
        <ProductCarousel products={products} />
      </div>
    </div>
  );
};

export default ProductDisplay;