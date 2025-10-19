import ProductCardNew from "../ProductCardNew";

function ProductGridNew({ products, category }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products?.map((product) => (
        <ProductCardNew key={product.id} product={product} category={category} />
      ))}
    </div>
  );
}

export default ProductGridNew;
