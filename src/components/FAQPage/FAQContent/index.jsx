import AccordionItem from "../AccordionItem";

function FAQContent ({ category, data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">{category}</h2>
        <p className="text-gray-600">No FAQs found for this category.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">{category}</h2>
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          // You might want to manage open state here if only one can be open at a time
        />
      ))}
    </div>
  );
};

export default FAQContent;