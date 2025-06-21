export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        <div>
          <h3 className="font-semibold mb-2">Products</h3>
          <ul className="space-y-1">
            <li>Landing Pages</li>
            <li>Personalization</li>
            <li>AI Matching</li>
            <li>Collaboration</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Solutions</h3>
          <ul className="space-y-1">
            <li>For Consultants</li>
            <li>For Organizations</li>
            <li>Remote Teams</li>
            <li>Compliance Support</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Resources</h3>
          <ul className="space-y-1">
            <li>Blog</li>
            <li>FAQs</li>
            <li>Help Center</li>
            <li>Use Cases</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Company</h3>
          <ul className="space-y-1">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
            <li>Privacy</li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <span>🔗</span>
            <span>📘</span>
            <span>🐦</span>
            <span>📺</span>
          </div>
        </div>
      </div>
      <p className="text-center text-sm mt-10 text-gray-300">&copy; 2025 ConsultMatch. All rights reserved.</p>
    </footer>
  );
}
