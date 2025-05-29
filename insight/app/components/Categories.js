// components/Categories.js
export default function Categories() {
  const categories = [
    'Business',
    'Sales & Marketing',
    'Funding',
    'Product & Design',
    'Technology',
    'Skills & Management',
    'Industries',
    'Other',
  ];

  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Browse Categories</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((category) => (
          <div key={category} className="bg-white py-4 px-6 rounded shadow hover:shadow-lg transition">
            <p className="text-lg font-medium text-gray-700">{category}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
