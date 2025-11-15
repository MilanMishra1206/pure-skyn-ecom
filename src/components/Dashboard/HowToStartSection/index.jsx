// This could be a new component (e.g., HowToStartSection.jsx) or directly in your main page.
import React from "react";
import Resources from "../../../config/Resources";
import { Link } from "react-router-dom";

function HowToStartSection() {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:!px-6 lg:!px-8 mx-2 md:!mx-4 lg:!mx-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
          Not sure where to start?
        </h2>

        <div className="flex flex-col md:!flex-row gap-8 justify-center items-stretch">
          <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg p-6 lg:p-0 flex-1 min-h-[300px] lg:min-h-[400px]">
            <div className="flex-shrink-0 lg:w-1/2 flex items-center justify-center p-4">
              <img
                src={Resources.images.home.how_to_start_1}
                alt="Doctor Consult"
                className="max-h-full max-w-full object-contain"
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
              />
            </div>
            <div className="flex flex-col justify-center p-6 lg:w-1/2">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Doctor Consult
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Consult licensed dermatologists who will recommend customized
                treatment plans that are shipped to your doorstep.
              </p>
              <Link
                to=""
                className="text-[#15676e] hover:text-[#0f4a51] font-medium flex items-center"
              >
                Consult now <span className="ml-1 text-lg">→</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg p-6 lg:p-0 flex-1 min-h-[300px] lg:min-h-[400px]">
            <div className="flex-shrink-0 lg:w-1/2 flex items-center justify-center p-4">
              <img
                src={Resources.images.home.aiImage}
                alt="AI Diagnostic"
                className="max-h-full max-w-full object-contain"
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
              />
            </div>
            <div className="flex flex-col justify-center p-6 lg:w-1/2">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                AI Diagnostic
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Tell us a few simple things about your concerns, overall health,
                and goals to have a treatment plan generated just for you.
              </p>
              <Link
                to=""
                className="text-[#15676e] hover:text-[#0f4a51] font-medium flex items-center"
              >
                Take the Quiz <span className="ml-1 text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowToStartSection;
