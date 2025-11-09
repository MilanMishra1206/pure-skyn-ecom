function Sidebar({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 lg:p-0 lg:!shadow-none lg:!bg-transparent">
      <nav>
        <ul>
          {categories.map((category) => (
            <li key={category} className="mb-2 last:mb-0">
              <button
                onClick={() => onSelectCategory(category)}
                className={`
                  w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 cursor-pointer
                  ${
                    activeCategory === category
                      ? "bg-gray-100 text-[#0f4a51] font-semibold border-l-4 border-[#15676e]"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
