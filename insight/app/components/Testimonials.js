// components/TestimonialsSection.js
const testimonials = [
  {
    name: "Jane D.",
    role: "Consultant",
    text: "I found multiple high-quality projects within weeks of joining. The matching system is spot-on!",
  },
  {
    name: "Acme Rehab Org",
    role: "Organization",
    text: "We sourced top-tier consultants quickly and securely. The contract templates saved us hours.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-900">What Our Users Say</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-blue-50 rounded-lg p-6 shadow w-full md:w-1/3">
              <p className="text-blue-700 italic mb-4">"{t.text}"</p>
              <div className="font-semibold text-blue-900">{t.name}</div>
              <div className="text-blue-600 text-sm">{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
