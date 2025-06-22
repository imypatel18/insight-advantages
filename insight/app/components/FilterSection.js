"use client";

import React from 'react';
import { Search } from 'lucide-react';

export default function FiltersSection({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter, 
  categoryFilter, 
  setCategoryFilter,
  sortBy,
  setSortBy,
  categories,
  consultants,
  consultantFilter,
  setConsultantFilter
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100 mb-6">
      <div className="flex flex-wrap gap-4 items-center">

        {/* Search Input */}
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
          <input
            type="text"
            placeholder="Search by title, consultant, or category..."
            className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <select
          className="px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none bg-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="expired">Expired</option>
        </select>

        {/* Category Filter */}
        <select
          className="px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none bg-white"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        {/* Consultant Filter */}
        <select
          className="px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none bg-white"
          value={consultantFilter}
          onChange={(e) => setConsultantFilter(e.target.value)}
        >
          <option value="">All Consultants</option>
          {consultants.map(consultant => (
            <option key={consultant} value={consultant}>{consultant}</option>
          ))}
        </select>

        {/* Sort By */}
        <select
          className="px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none bg-white"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="recent">Most Recent</option>
          <option value="budget-high">Budget (High to Low)</option>
          <option value="budget-low">Budget (Low to High)</option>
          <option value="rating">Rating</option>
        </select>

      </div>
    </div>
  );
} 
