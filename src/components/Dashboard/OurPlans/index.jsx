import React from "react";
import Resources from "../../../config/Resources";

function OurPlans() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-90 mx-1 md:!mx-4 lg:!mx-4 px-4 md:!px-8 lg:!px-16 min-h-[500px] flex items-center">
      <div className="max-w-7xl mx-auto flex flex-col md:!flex-row items-center justify-between w-full">
        <div className="lg:w-1/2 text-center lg:text-left mb-6 lg:!mb-0">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight mb-8">
            Our treatment plans. Your needs.
          </h1>
          <ol className="list-none space-y-4 mb-10 text-sm text-gray-700">
            <li className="flex items-center justify-center lg:justify-start">
              <span className="bg-[#15676e] text-white rounded-full h-5 w-5 flex items-center justify-center mr-4 text-xs font-semibold">
                1
              </span>
              Quick online consult
            </li>
            <li className="flex items-center justify-center lg:justify-start">
              <span className="bg-[#15676e] text-white rounded-full h-5 w-5 flex items-center justify-center mr-4 text-xs font-semibold">
                2
              </span>
              Treatment plan designed for you by experts
            </li>
            <li className="flex items-center justify-center lg:justify-start">
              <span className="bg-[#15676e] text-white rounded-full h-5 w-5 flex items-center justify-center mr-4 text-xs font-semibold">
                3
              </span>
              Free doorstep delivery
            </li>
          </ol>
          <button className="bg-[#15676e] hover:bg-[#0f4a51] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
            Find My Plan →
          </button>
        </div>

        <div className="w-full md:w-1/2 flex justify-center relative h-[300px] md:!h-[350px] lg:!h-[380px]">
          <div className="relative w-full max-w-md h-full">
            <img
              src={Resources.images.home.ourPlan.customer1}
              alt="Happy customer 1"
              className="absolute top-4 left-4 w-[80px] h-[80px] md:!w-[100px] md:!h-[100px] object-cover rounded-lg shadow-md"
            />
            <img
              src={Resources.images.home.ourPlan.customer2}
              alt="Happy customer 2"
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[120px] md:!w-[140px] md:!h-[140px] object-cover rounded-lg shadow-md z-10"
            />
            <img
              src={Resources.images.home.ourPlan.customer3}
              alt="Happy customer 3"
              className="absolute top-4 right-4 w-[80px] h-[80px] md:!w-[100px] md:!h-[100px] object-cover rounded-lg shadow-md"
            />
            <img
              src={Resources.images.home.ourPlan.customer4}
              alt="Happy customer 4"
              className="absolute bottom-4 left-0 w-[100px] h-[100px] md:!w-[120px] md:!h-[120px] object-cover rounded-lg shadow-md z-0"
            />
            <img
              src={Resources.images.home.ourPlan.customer5}
              alt="Happy customer 5"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120px] h-[120px] md:!w-[140px] md:!h-[140px] object-cover rounded-lg shadow-md z-10"
            />
            <img
              src={Resources.images.home.ourPlan.customer6}
              alt="Happy customer 6"
              className="absolute bottom-4 right-0 w-[100px] h-[100px] md:!w-[120px] md:!h-[120px] object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurPlans;
