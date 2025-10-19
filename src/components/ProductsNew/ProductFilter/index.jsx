function ProductFilter({ filters, onFilterChange }) {
  const priceRanges = [
    { label: "Under ₹2,000", value: "0-2000" },
    { label: "₹2,000 - ₹5,000", value: "2000-5000" },
    { label: "Above ₹5,000", value: "5000-100000" }, // Use a large number for 'above'
  ];

  const concerns = ["Dandruff", "Hair Fall", "Scalp Health"];

  const renderCheckbox = (type, value, label) => (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        id={`${type}-${value}`}
        checked={filters[type].includes(value)}
        onChange={() => onFilterChange(type, value)}
        className="form-checkbox text-purple-600 h-4 w-4"
      />
      <label
        htmlFor={`${type}-${value}`}
        className="ml-2 text-gray-700 text-sm"
      >
        {label}
      </label>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-2">Price</h4>
        {priceRanges.map((range) =>
          renderCheckbox("price", range.value, range.label)
        )}
      </div>

      <div>
        <h4 className="font-medium text-gray-800 mb-2">Concerns</h4>
        {concerns.map((concern) =>
          renderCheckbox("concerns", concern, concern)
        )}
      </div>
    </div>
  );
}

export default ProductFilter;
