import BrowseConsultantCard from "./BrowseConsultantCard";

export default function BrowseConsultantGrid({ consultants }) {
  if (!consultants.length) {
    return (
      <div className="text-center text-blue-700 py-12">
        No consultants found for this category.
      </div>
    );
  }
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {consultants.map(c => (
        <BrowseConsultantCard key={c.id} consultant={c} />
      ))}
    </div>
  );
}
