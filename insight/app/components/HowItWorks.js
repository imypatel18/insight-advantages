// components/HowItWorksSection.js
const steps = [
  {
    title: "Create Your Profile",
    description: "Consultants and organizations sign up and complete detailed profiles, including credentials, needs, and preferences.",
  },
  {
    title: "Get Matched",
    description: "Our AI recommends the best consultants or projects based on your criteria and expertise.",
  },
  {
    title: "Connect & Collaborate",
    description: "Message securely, share documents, and set up calls—all within the platform.",
  },
  {
    title: "Contract & Work",
    description: "Use built-in contract templates, manage payments, and track engagements easily.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-blue-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-900">How It Works</h2>
        <div className="flex flex-col md:flex-row md:justify-center gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6 flex-1">
              <div className="text-2xl font-bold text-blue-600 mb-2">{idx + 1}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-blue-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
