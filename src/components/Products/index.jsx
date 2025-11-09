import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { IoFilterSharp } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useAppSnackbar } from "../../config/Context/SnackbarContext";
import { addToCart, updateQuantity, removeFromCart } from "../../redux/Actions";
import { productList } from "../../helpers/productsData";
import FadeInWrapper from "../../config/MotionFramer/FadeInWrapper";
import BreadcrumbSection from "./BreadcrumbSection";
import ProductFilterDrawer from "./ProductFilterDrawer";
import SidebarFilters from "./SidebarFilters";
import ProductGrid from "./ProductGrid";
import PaginationControls from "./PaginationControls";

const CustomLoader = lazy(() => import("../../shared/CustomLoader"));

const Products = () => {
  const dispatch = useDispatch();
  const { category: urlCategory } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const showSnackbar = useAppSnackbar();
  const cartItems = useSelector((state) => state.cart.items);

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(
    urlCategory || "all"
  );
  const productsPerPage = 12;

  const baseProducts = useMemo(() => {
    const filterKey = urlCategory || selectedCategoryFilter;
    const allProducts = productList;

    if (filterKey === "all") {
      return allProducts;
    }
    return allProducts.filter(
      (p) => p.category.toLowerCase() === filterKey.toLowerCase()
    );
  }, [urlCategory, selectedCategoryFilter]);

  const allProductsFlat = baseProducts;

  useEffect(() => {
    // Determine the category state based on the URL parameter.
    // If urlCategory is defined (e.g., 'skin'), use it. Otherwise, use 'all'.
    const expectedCategory = urlCategory || "all";

    if (selectedCategoryFilter !== expectedCategory) {
      // Only update the state and reset sub-filters if the URL value has changed.
      setSelectedCategoryFilter(expectedCategory);
      setSelectedTypes([]);
      setCurrentPage(1);
    }
  }, [
    urlCategory,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    setSelectedTypes,
    setCurrentPage,
  ]);

  const availableBrands = useMemo(() => {
    const uniqueBrands = new Set(
      baseProducts.map((p) => p.brand).filter(Boolean)
    );
    return Array.from(uniqueBrands).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    }));
  }, [baseProducts]);

  useEffect(() => {
    if (location.hash) {
      let initialFilterKey = location.hash.replace("#", "");
      initialFilterKey = decodeURIComponent(initialFilterKey);

      const isBrandFilter = availableBrands.some(
        (brand) => brand.key.toLowerCase() === initialFilterKey.toLowerCase()
      );

      if (!urlCategory && location.pathname.split("/").length > 2) {
        const categoryFromPath = location.pathname.split("/")[2];
        if (categoryFromPath) {
          setSelectedCategoryFilter(categoryFromPath);
        }
      }

      if (isBrandFilter) {
        setSelectedBrands([initialFilterKey]);
        setSelectedTypes([]);
      } else {
        setSelectedTypes([initialFilterKey]);
        setSelectedBrands([]);
      }
      setCurrentPage(1);
    }
  }, [
    location.hash,
    location.pathname,
    selectedCategoryFilter,
    urlCategory,
    availableBrands,
  ]);

  const availableProductTypes = useMemo(() => {
    // Get unique subCategory values from the currently visible products (baseProducts)
    const uniqueTypes = new Set(
      baseProducts.map((p) => p.subCategory).filter(Boolean) // Filter out null/undefined
    );

    // Map the unique keys to the { key: 'value', label: 'Value' } format
    return Array.from(uniqueTypes).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    }));
  }, [baseProducts]);

  const handleCategoryFilterChange = (key) => {
    setSelectedTypes([]);
    setCurrentPage(1);

    if (key === "all") {
      navigate("/products", { replace: true });
    } else {
      navigate(`/products/${key}`, { replace: true });
    }

    setSelectedCategoryFilter(key);
  };

  const toggleFilterDrawer = (open) => () => setIsFilterDrawerOpen(open);

  const handleTypeChange = (key) => {
    setSelectedTypes((prev) => {
      const isCurrentlySelected = prev.includes(key);
      let newSelection;

      if (isCurrentlySelected) {
        // --- ACTION: UNCHECKING (Remove from state and remove hash) ---
        newSelection = prev.filter((type) => type !== key);

        // Check if the unchecked item was the one causing the hash (primary filter)
        if (location.hash === `#${key}`) {
          // Removes the hash from the URL
          navigate(location.pathname, { replace: true });
        }
      } else {
        // --- ACTION: CHECKING (Add to state, do NOT update hash here) ---
        newSelection = [...prev, key];
      }

      setCurrentPage(1);
      return newSelection;
    });
  };

  const handleItemIncrease = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleItemDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      handleItemIncrease(existingItem);
      showSnackbar("Product Quantity Increased", "info");
    } else {
      dispatch(addToCart(product));
      showSnackbar("Product Added to Cart", "success");
    }
  };

  const handleItemRemove = (product) => {
    dispatch(removeFromCart(product.id));
    showSnackbar("Product Removed from Cart", "info");
  };

  const filteredProducts = useMemo(() => {
    let result = allProductsFlat;

    // 1. Filter by Product Type (SubCategory)
    if (selectedTypes.length > 0) {
      result = result.filter((p) => selectedTypes.includes(p.subCategory));
    }

    // 2. Filter by Brand
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    return result;
  }, [selectedTypes, selectedBrands, allProductsFlat]);

  useEffect(() => {
    setTotalProductCount(filteredProducts?.length);
  }, [filteredProducts]);

  const paginateProducts = () => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(filteredProducts.length / productsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const calculateRange = () => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const start = indexOfFirstProduct + 1;
    const end =
      indexOfLastProduct > totalProductCount
        ? totalProductCount
        : indexOfLastProduct;
    return `${start}-${end}`;
  };

  return (
    <div>
      <Suspense>
        <CustomLoader open={false} />
      </Suspense>
      <motion.div
        variants={FadeInWrapper("left", 0.1)}
        initial="hidden"
        whileInView="show"
        className={`${isMobile ? "p-3" : "mt-5 pt-4 pl-5"}`}
      >
        <BreadcrumbSection category={urlCategory} />
      </motion.div>

      {isMobile && (
        <div className="flex justify-start px-3 mb-4">
          <button
            onClick={toggleFilterDrawer(true)}
            className="flex items-center px-4 py-2 rounded gap-2 !bg-[#0f4a51] !text-white"
          >
            <IoFilterSharp /> Filter
          </button>
        </div>
      )}

      <ProductFilterDrawer
        open={isFilterDrawerOpen}
        toggleDrawer={toggleFilterDrawer}
        productTypes={availableProductTypes}
        selectedTypes={selectedTypes}
        onChange={handleTypeChange}
      />
      <div className="flex flex-col lg:!flex-row">
        {!isMobile && (
          <motion.div
            variants={FadeInWrapper("right", 0.2)}
            initial="hidden"
            whileInView="show"
            className="flex gap-2 justify-center items-center mb-4 font-poppins px-5 self-start w-[25%]"
          >
            <SidebarFilters
              categories={["all", "skin", "hair"]}
              selectedCategory={selectedCategoryFilter}
              onCategoryChange={handleCategoryFilterChange}
              productTypes={availableProductTypes}
              selectedTypes={selectedTypes}
              onChange={handleTypeChange}
              isCollectionPage={!urlCategory}
            />
          </motion.div>
        )}
        <>
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] px-4 text-center w-full lg:w-[60%]">
              <MdOutlineProductionQuantityLimits className="text-5xl text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700">
                We are adding products soon
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Stay tuned! New products will be available shortly.
              </p>
            </div>
          ) : (
            <motion.div
              variants={FadeInWrapper("up", 0.2)}
              initial="hidden"
              whileInView="show"
              className="w-full lg:w-[75%]"
            >
              <ProductGrid
                products={paginateProducts()}
                isMobile={isMobile}
                totalProductCount={totalProductCount}
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onIncrease={handleItemIncrease}
                onDecrease={handleItemDecrease}
                onRemove={handleItemRemove}
              />
            </motion.div>
          )}
        </>
      </div>
      {filteredProducts.length !== 0 && (
        <>
          <div className="flex justify-center my-4">
            <div className="text-gray-700">
              Showing {calculateRange()} of {totalProductCount} items
            </div>
          </div>

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Products;
