import Resources from "../../config/Resources";
import {
  hairCategories,
  hairCategoryDetails,
  skinCategories,
  skinCategoryDetails,
} from "../../helpers/Dashboard";
import { bannerData } from "../../helpers/dummyData";
import CustomProductsSection from "../../shared/CustomProductsSection";
import CustomSection from "../../shared/CustomSection";
import NewsCarousel from "../NewsCarousel";

function Dashboard() {
  return (
    <div className="flex gap-4 flex-col">
      <img src={Resources.images.home.banner.bannerMain} alt="main banner" />
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold px-2 lg:!px-10">
          Expert Guidance Only
        </p>
        <CustomSection items={bannerData} />
        <CustomProductsSection
          heading="Proven Skincare"
          categories={skinCategories}
          categoryDetails={skinCategoryDetails}
        />
        <CustomProductsSection
          heading="Healthy Hair Starts Here"
          categories={hairCategories}
          categoryDetails={hairCategoryDetails}
        />
        <NewsCarousel />
      </div>
    </div>
  );
}

export default Dashboard;
