import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { IoFilterSharp } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useAppSnackbar } from "../../config/Context/SnackbarContext";
import { addToCart } from "../../redux/Actions";
import { productList } from "../../helpers/productsData";
import FadeInWrapper from "../../config/MotionFramer/FadeInWrapper";
import BreadcrumbSection from "./BreadcrumbSection";
import ProductFilterDrawer from "./ProductFilterDrawer";
import SidebarFilters from "./SidebarFilters";
import ProductGrid from "./ProductGrid";
import PaginationControls from "./PaginationControls";

const CustomLoader = lazy(() => import("../../shared/CustomLoader"));

// Helper function to safely extract all product objects from a nested type object
const extractProductsFromType = (typeObject) => {
  if (!typeObject || typeof typeObject !== "object") return [];
  // Object.values extracts the product objects {id: X, productName: Y}
  return Object.values(typeObject);
};

const flattenCategoryProducts = (categoryObject) => {
  if (!categoryObject || typeof categoryObject !== "object") return [];
  // Object.values(categoryObject) gives us an array of the type objects (e.g., [sunscreen_obj, pigmentation_obj])
  // .flatMap() then runs extractProductsFromType on each of those type objects and flattens the result
  return Object.values(categoryObject).flatMap(extractProductsFromType);
};

const Products = () => {
  const dispatch = useDispatch();
  const { category: urlCategory } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const showSnackbar = useAppSnackbar();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(
    urlCategory || "all"
  );
  const productsPerPage = 12;

  // Memoized product list based on the URL or the internal category filter
  const baseProducts = useMemo(() => {
    const filterKey = urlCategory || selectedCategoryFilter;

    if (filterKey === "all") {
      // Show all products from all categories
      return Object.values(productList).flatMap(flattenCategoryProducts);
    }
    // Show products for the specific category from URL or filter
    return flattenCategoryProducts(productList[filterKey]);
  }, [urlCategory, selectedCategoryFilter]);

  const allProductsFlat = baseProducts;

  useEffect(() => {
    // Check if a hash exists (e.g., #ageing)
    if (location.hash) {
      // 1. Extract the filter key (e.g., 'ageing')
      const initialFilterKey = location.hash.replace("#", "");

      // 2. Normalize the category state (if a link for a different category was used)
      // Example: If user is on /products and clicks skin#ageing, set category to 'skin'
      if (!urlCategory) {
        const pathParts = location.pathname.split("/");
        const categoryFromPath = pathParts[2];
        if (categoryFromPath && categoryFromPath !== selectedCategoryFilter) {
          setSelectedCategoryFilter(categoryFromPath);
        }
      }

      // 3. Set the filter state (replaces any existing manual filters)
      setSelectedTypes([initialFilterKey]);
      setCurrentPage(1); // Reset pagination
    }
  }, [location.hash, location.pathname, selectedCategoryFilter, urlCategory]); // Reruns whenever the hash changes (e.g., navigating from one hash link to another)

  const availableProductTypes = useMemo(() => {
    const activeCategoryKey = urlCategory || selectedCategoryFilter;

    if (activeCategoryKey === "all" || !productList[activeCategoryKey]) {
      // If showing all, list all available sub-types (simplified for this example)
      return [
        { key: "sunscreen", label: "Sunscreen" },
        { key: "pigmentation", label: "Pigmentation" },
        { key: "shampoo", label: "Shampoo" },
        { key: "oil", label: "Oil" },
      ];
    }
    // List only sub-types available in the current selected category
    return Object.keys(productList[activeCategoryKey]).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    }));
  }, [urlCategory, selectedCategoryFilter]);

  const handleCategoryFilterChange = (key) => {
    setSelectedCategoryFilter(key);
    setSelectedTypes([]); // Reset sub-type filters when category changes
    setCurrentPage(1);
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

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    showSnackbar("Product Added to Cart", "success");
  };
  const filteredProducts =
    selectedTypes.length === 0
      ? allProductsFlat // No sub-filters, use the base list determined by URL/CategoryFilter
      : selectedTypes.flatMap((type) => {
          const activeCategoryKey = urlCategory || selectedCategoryFilter;

          if (activeCategoryKey !== "all" && productList[activeCategoryKey]) {
            // Filter within the specific category (URL or internal filter)
            return extractProductsFromType(
              productList[activeCategoryKey][type]
            );
          }
          // If viewing ALL, filter across all categories for the selected type
          return Object.values(productList).flatMap((categoryObj) =>
            extractProductsFromType(categoryObj[type])
          );
        });

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
    <div className="mt-5">
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
        productTypes={availableProductTypes} // Use the calculated list
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
              categories={Object.keys(productList)} // e.g., ['skin', 'hair']
              selectedCategory={selectedCategoryFilter}
              onCategoryChange={handleCategoryFilterChange} // New Handler
              productTypes={availableProductTypes} // Use the calculated list
              selectedTypes={selectedTypes}
              onChange={handleTypeChange}
              isCollectionPage={!urlCategory} // True if on /products route
            />
          </motion.div>
        )}
        <>
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] px-4 text-center w-[60%]">
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
              className="w-[75%]"
            >
              <ProductGrid
                products={paginateProducts()}
                onAddToCart={handleAddToCart}
                isMobile={isMobile}
                totalProductCount={totalProductCount}
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
