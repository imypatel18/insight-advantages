'use client';
import { useState } from "react";
import pfp from "../../public/images/pfp.png"; // Placeholder for avatar image
import BrowseLayout from "../components/browse/BrowseLayout";
import BrowseCategoryFilter from "../components/browse/BrowseCategoryFilter";
import BrowseConsultantGrid from "../components/browse/BrowseConsultantGrid";
import BrowsePagination from "../components/browse/BrowsePagination";
import Navbar from "../components/navbar";

// Mock data for demonstration
const ALL_CONSULTANTS = [
  {
    id: "1",
    name: "Alex Morgan",
    avatar: pfp,
    category: "Business",
    bio: "15+ years helping clients with return-to-work strategies and disability management.",
    skills: ["Assessments", "TSA", "Quality Assurance"],
    price: 120,
  },
  {
    id: "2",
    name: "Jamie Lee",
    avatar: pfp,
    category: "Sales & Marketing",
    bio: "Expert in job placement and workforce integration for diverse populations.",
    skills: ["Job Development", "Training"],
    price: 100,
  },
  // ...add more mock consultants as needed
];

const PAGE_SIZE = 6;

export default function BrowsePage() {
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = category === "All"
    ? ALL_CONSULTANTS
    : ALL_CONSULTANTS.filter(c => c.category === category);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleCategorySelect(cat) {
    setCategory(cat);
    setPage(1);
  }

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <>
    <Navbar />
    <BrowseLayout>
      <BrowseCategoryFilter selected={category} onSelect={handleCategorySelect} />
      <BrowseConsultantGrid consultants={paginated} />
      {totalPages > 1 && (
        <BrowsePagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </BrowseLayout>
    </>
  );
}
