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
    // If the URL category is set, ensure the filter state matches it.
    // If the URL category is NOT set (i.e., we are on /products), ensure the filter state is 'all'.
    const currentCategory = urlCategory || "all";
    if (selectedCategoryFilter !== currentCategory) {
        setSelectedCategoryFilter(currentCategory);
        // Reset sub-types and pagination when the main category changes
        setSelectedTypes([]);
        setCurrentPage(1);
    }
}, [urlCategory, selectedCategoryFilter, setSelectedCategoryFilter, setSelectedTypes, setCurrentPage]);

  useEffect(() => {
    // Check if a hash exists (e.g., #ageing)
    if (location.hash) {
      // 1. Extract the filter key (e.g., 'ageing')
      const initialFilterKey = location.hash.replace("#", "");

      // 2. Normalize the category state (if a link for a different category was used)
      // NOTE: This part is tricky. In the flat structure, you can't easily check
      // which 'category' an arbitrary 'subCategory' (the hash) belongs to.
      // We will assume the URL category logic is handled by the router/link creation.
      if (!urlCategory && location.pathname.split("/").length > 2) {
        const categoryFromPath = location.pathname.split("/")[2];
        if (categoryFromPath) {
          setSelectedCategoryFilter(categoryFromPath);
        }
      }

      // 3. Set the filter state (replaces any existing manual filters)
      setSelectedTypes([initialFilterKey]);
      setCurrentPage(1); // Reset pagination
    }
  }, [location.hash, location.pathname, selectedCategoryFilter, urlCategory]);

  // --- UPDATED LOGIC FOR availableProductTypes (Sidebar options) ---
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
  }, [baseProducts]); // BaseProducts determines which types are available

  const handleCategoryFilterChange = (key) => {
    setSelectedCategoryFilter(key);
    setSelectedTypes([]); // Reset sub-type filters when category changes
    setCurrentPage(1);
    // You may also want to update the URL here if it doesn't already happen via router/links
    // navigate(`/products/${key}`, { replace: true });
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
    if (selectedTypes.length === 0) {
      return allProductsFlat;
    }
    return allProductsFlat.filter((p) => selectedTypes.includes(p.subCategory));
  }, [selectedTypes, allProductsFlat]);

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
        className={`mt-5 ${isMobile ? "p-3" : "pt-5 pl-5"}`}
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
              categories={["all", "skin"]}
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
