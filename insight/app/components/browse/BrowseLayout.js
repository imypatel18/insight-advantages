import BrowseHero from './BrowseHero';

export default function BrowseLayout({ children }) {
  return (
    <div className="min-h-screen bg-blue-50">
      <BrowseHero />
      <main className="max-w-6xl mx-auto px-4 pb-12">{children}</main>
    </div>
  );
}
