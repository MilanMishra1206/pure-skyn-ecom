import React, { useState } from 'react';
import { faqCategories, faqData } from '../../helpers/dummyData';
import Sidebar from './Sidebar';
import FAQContent from './FAQContent';

function FAQPage () {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0]); // Default to the first category

  return (
    <div className="container mx-auto py-12 px-4 md:px-0 flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4">
        <Sidebar
          categories={faqCategories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>

      {/* Main FAQ Content */}
      <div className="w-full lg:w-3/4">
        <FAQContent
          category={activeCategory}
          data={faqData[activeCategory]} // Pass data relevant to the active category
        />
      </div>
    </div>
  );
};

export default FAQPage;