
"use client";

import React, { useState, useMemo } from 'react';
import FilterSection from '@/app/components/FilterSection';
import RequestHistoryCard  from '@/app/components/RequestHistoryCard';
import RequestDetailsModal from '@/app/components/RequestDetailsModal';
import EmptyState from '@/app/components/EmptyState';
import PageHeader from '@/app/components/PageHeader';

const sampleRequests = [
  { id: 1, title: "E-commerce Website Design", consultant: "Sarah Johnson", category: "Design", status: "completed", budget: 2500, completionDate: "2024-12-15", rating: 5, feedback: "Excellent work, very professional and delivered on time!" },
  { id: 2, title: "Mobile App Development", consultant: "Mike Chen", category: "Development", status: "completed", budget: 4500, completionDate: "2024-12-01", rating: 4, feedback: "Great technical skills, minor delays but overall satisfied." },
  { id: 3, title: "Brand Identity Package", consultant: "Emily Davis", category: "Design", status: "cancelled", budget: 1800, completionDate: "2024-11-20", rating: null, feedback: null },
  { id: 4, title: "SEO Optimization", consultant: "David Wilson", category: "Marketing", status: "completed", budget: 800, completionDate: "2024-11-15", rating: 5, feedback: "Amazing results! Website traffic increased by 150%." },
  { id: 5, title: "Content Writing Service", consultant: "Lisa Thompson", category: "Writing", status: "expired", budget: 600, completionDate: "2024-10-30", rating: null, feedback: null }
];

export default function RequestHistory() {
  const [requests] = useState(sampleRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [consultantFilter, setConsultantFilter] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const categories = [...new Set(requests.map(r => r.category))];
  const consultants = [...new Set(requests.map(r => r.consultant))];

  const filteredRequests = useMemo(() => {
    let filtered = requests.filter(request => {
      const matchSearch = searchTerm === '' ||
        request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.consultant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === '' || request.status === statusFilter;
      const matchCategory = categoryFilter === '' || request.category === categoryFilter;
      const matchConsultant = consultantFilter === '' || request.consultant === consultantFilter;

      return matchSearch && matchStatus && matchCategory && matchConsultant;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent': return new Date(b.completionDate) - new Date(a.completionDate);
        case 'budget-high': return b.budget - a.budget;
        case 'budget-low': return a.budget - b.budget;
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        default: return 0;
      }
    });

    return filtered;
  }, [requests, searchTerm, statusFilter, categoryFilter, consultantFilter, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 p-6">
      <div className="max-w-6xl mx-auto">
        <PageHeader />

        <FilterSection
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
          consultantFilter={consultantFilter} setConsultantFilter={setConsultantFilter}
          sortBy={sortBy} setSortBy={setSortBy}
          categories={categories} consultants={consultants}
        />

        {filteredRequests.length === 0 ? (
          <EmptyState 
                title="No Request History" 
                message="There are no completed or archived requests yet." 
                showButton={false} 
            />
        ) : (
          <div className="space-y-4">
            {filteredRequests.map(request => (
              <RequestHistoryCard
                key={request.id}
                request={request}
                onViewDetails={setSelectedRequest}
                />

            ))}
          </div>
        )}

        <RequestDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      </div>
    </div>
  );
}
