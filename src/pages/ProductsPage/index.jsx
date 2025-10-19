import React from 'react';
import { useParams } from 'react-router-dom';
import SingleProductPage from '../../components/ProductsNew/SingleProductPage';
import Products from '../../components/ProductsNew';

function ProductsPage() {
  const { category, productName } = useParams();

  // If the productName URL parameter exists, render the single product page
  if (productName) {
    return <SingleProductPage category={category} productName={productName} />;
  }

  // Otherwise, render the product collection page and pass the category prop
  return <Products category={category} />;
}

export default ProductsPage;