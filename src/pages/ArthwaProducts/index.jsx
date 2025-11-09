import { lazy, Suspense } from "react";

const Products = lazy(() => import("../../components/Products"));

function ArthwaProducts() {
  return (
    <Suspense fallback={<div />}>
      <Products />
    </Suspense>
  );
}

export default ArthwaProducts;
