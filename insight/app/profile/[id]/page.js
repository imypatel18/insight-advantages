'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '../../components/navbar';

export default function ConsultantProfile() {
  const { id } = useParams();
  const [consultant, setConsultant] = useState(null);

  useEffect(() => {
    // Simulating API call - replace with actual fetch from backend later
    const mockData = {
      id: "1",
      name: "John Mitchell",
      title: "Strategic Business Consultant & Growth Specialist",
      rating: 5,
      reviews: 119,
      location: "Boston, MA",
      price: 150,
      skills: ["Strategic Planning", "Business Development", "Market Research", "Financial Modeling", "Competitive Analysis"],
      bio: "I'm a senior strategy consultant with over 8 years of experience helping businesses scale and grow...",
      education: [
        { degree: "MBA in Strategy", school: "Harvard Business School", year: "2018" },
        { degree: "BS in Economics", school: "MIT", year: "2014" }
      ],
      email: "john.mitchell@example.com",
      phone: "+1 (555) 123-4567",
      website: "johnmitchell.consulting"
    };
    setConsultant(mockData);
  }, [id]);

  if (!consultant) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-8">
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold">{consultant.name}</h1>
          <p className="text-gray-600">{consultant.title}</p>
          <p className="text-sm text-gray-500">{consultant.location}</p>
          <div className="mt-2 text-yellow-500">⭐ {consultant.rating} ({consultant.reviews} reviews)</div>
          <p className="text-blue-600 font-semibold mt-1">${consultant.price}/hour</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {consultant.skills.map(skill => (
              <span key={skill} className="bg-gray-100 text-sm px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p>{consultant.bio}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          <ul className="list-disc pl-5">
            {consultant.education.map((edu, idx) => (
              <li key={idx}>{edu.degree}, {edu.school} ({edu.year})</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p>Email: <a href={`mailto:${consultant.email}`} className="text-blue-600">{consultant.email}</a></p>
          <p>Phone: {consultant.phone}</p>
          <p>Website: <a href={`https://${consultant.website}`} className="text-blue-600">{consultant.website}</a></p>
        </div>
      </div>
    </div>
  );
}
