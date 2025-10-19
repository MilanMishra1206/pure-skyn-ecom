import Resources from "../../config/Resources";
import { bannerData } from "../../helpers/dummyData";
import CustomProductsSection from "../../shared/CustomProductsSection";
import CustomSection from "../../shared/CustomSection";
import NewsCarousel from "../NewsCarousel";
import HairProductSection from "./HairProductSection";

function Dashboard() {
  return (
    <div className="flex gap-4 flex-col">
      <img src={Resources.images.home.banner.bannerMain} alt="main banner" />
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold px-2 lg:!px-10">
          Expert Guidance Only
        </p>
        <CustomSection items={bannerData} />
        <CustomProductsSection heading="Proven skincare" />
        <HairProductSection />
        <NewsCarousel />
      </div>
    </div>
  );
}

export default Dashboard;
