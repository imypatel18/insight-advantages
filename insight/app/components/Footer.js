// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Advantage Match. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
