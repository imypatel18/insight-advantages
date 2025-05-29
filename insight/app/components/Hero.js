// components/HeroSection.js
export default function HeroSection() {
  return (
    <section className="bg-blue-50 py-16">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">
          Connect with Top Vocational Rehabilitation Consultants
        </h1>
        <p className="text-lg md:text-xl text-blue-700 mb-8">
          The easiest way for organizations to find, vet, and collaborate with professional consultants. AI-powered matching, secure communication, and streamlined contracting.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="/signup/consultant" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Join as Consultant
          </a>
          <a href="/signup/organization" className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
            For Organizations
          </a>
        </div>
      </div>
    </section>
  );
}
