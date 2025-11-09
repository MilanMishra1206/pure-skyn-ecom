import { useState } from 'react';

function AccordionItem ({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium text-lg text-gray-800 focus:outline-none cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span className="text-gray-500 text-xl font-bold">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 pr-6 text-gray-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;