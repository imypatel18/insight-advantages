const categories = [
  "All",
  "Business",
  "Sales & Marketing",
  "Funding",
  "Product & Design",
  "Technology",
  "Skills & Management",
  "Industries",
];

export default function BrowseCategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map(cat => (
        <button
          key={cat}
          className={`px-4 py-2 rounded-full font-semibold border transition
            ${selected === cat
              ? "bg-blue-700 text-white border-blue-700"
              : "bg-white text-blue-700 border-blue-200 hover:bg-blue-100"}
          `}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
