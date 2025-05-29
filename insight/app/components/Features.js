// components/FeaturesSection.js
const features = [
  {
    title: "Detailed Profiles",
    description: "Showcase experience, certifications, and availability. Organizations and consultants both create robust, searchable profiles.",
    icon: "👤",
  },
  {
    title: "AI-Powered Matching",
    description: "Smart recommendations based on skills, expertise, and budget for both consultants and organizations.",
    icon: "🤖",
  },
  {
    title: "Secure Communication",
    description: "In-platform messaging and document sharing with privacy and compliance in mind.",
    icon: "🔒",
  },
  {
    title: "Subscription Model",
    description: "Flexible membership tiers with advanced features and premium exposure.",
    icon: "💎",
  },
  {
    title: "Contract Templates",
    description: "Streamlined contracting with built-in templates and e-signature support.",
    icon: "📄",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-900">Platform Features</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <div key={i} className="bg-blue-50 rounded-lg p-6 shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl text-black font-semibold mb-2">{f.title}</h3>
              <p className="text-blue-700">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
