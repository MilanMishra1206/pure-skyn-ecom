import React, { useState } from "react";
import Resources from "../../../config/Resources";
// Assume product image and ArthaLogo are correctly imported
// import ArthaProductImage from '../assets/images/artha-foaming-facewash.png';

function ProductFAQSection() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How does Artha work?",
      answer:
        "Artha provides personalized dermatology solutions. You start with an online consult or an AI diagnostic quiz, receive a customized treatment plan from experts, and then get your products delivered directly to your doorstep. Our approach ensures you get exactly what your skin and hair needs, backed by professional guidance.",
    },
    {
      question: "Why is skin & hair care important?",
      answer:
        "Consistent skin and hair care is vital for maintaining health, preventing issues like aging, acne, dandruff, and hair fall, and boosting overall confidence. It protects against environmental damage, ensures proper hydration, and promotes cellular regeneration, leading to healthier and more vibrant skin and hair.",
    },
    {
      question: "How do skincare products help?",
      answer:
        "Skincare products are formulated with active ingredients to address specific concerns. They cleanse, hydrate, protect, and treat, helping to improve skin texture, reduce blemishes, minimize signs of aging, and prevent future damage. When used correctly as part of a personalized routine, they significantly enhance skin health and appearance.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="bg-white py-2 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between">
        <div className="lg:w-1/2 flex flex-col items-center lg:mb-0">
          <img
            src={
              Resources.images.products.sunscreen.dermaticaAzeProactiveLotion.img1
            }
            alt="Artha Foaming Face Wash"
            className="h-96 shadow-[3px_3px_0px_#313440]"
          />
        </div>

        <div className="lg:w-1/2 lg:pl-16 my-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight mb-8 text-center lg:text-left">
            India's one-stop dermatology destination.
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <button
                  className="flex justify-between items-center w-full text-left text-sm font-semibold text-gray-700 hover:text-[#15676e]"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <span className="text-xl">
                    {openFAQ === index ? "−" : "+"}
                  </span>
                </button>
                {openFAQ === index && (
                  <p className="mt-2 text-gray-500 leading-relaxed text-[13px]">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-center lg:text-left text-sm text-gray-500 uppercase tracking-wide">
            Our assurance: All our products are of top grade quality
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductFAQSection;
