// components/CallToActionSection.js
export default function CallToActionSection() {
  return (
    <section className="py-12 bg-blue-700">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Find or Offer Expertise?
        </h2>
        <p className="text-blue-100 mb-8">
          Join the leading consultant connection platform for vocational rehabilitation professionals and organizations.
        </p>
        <a href="/signup" className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
          Get Started
        </a>
      </div>
    </section>
  );
}
