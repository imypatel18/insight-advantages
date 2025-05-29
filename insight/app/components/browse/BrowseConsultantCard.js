import pfp from "../../../public/images/pfp.png"; // Placeholder for avatar image
import Image from "next/image";

export default function BrowseConsultantCard({ consultant }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col">
      <div className="flex items-center mb-4">
        <Image
          src={consultant.avatar || pfp}
          alt={consultant.name}
          className="w-14 h-14 rounded-full border border-blue-100 mr-4"
        />
        <div>
          <h3 className="text-xl font-semibold text-blue-900">{consultant.name}</h3>
          <div className="text-blue-600 text-sm">{consultant.category}</div>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-blue-800 mb-2 line-clamp-3">{consultant.bio}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {consultant.skills.map(skill => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-blue-700 font-semibold">
          {consultant.price ? `$${consultant.price}/hr` : "Contact for pricing"}
        </span>
        <a
          href={`/consultant/${consultant.id}`}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition text-sm font-semibold"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}
