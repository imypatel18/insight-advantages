"use client"

import Navbar from "../../components/client/navbar-client"

import React, { useState } from 'react';

import Hero from '../../components/client/Hero';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('talent') // or 'jobs'

   const handleSearch = (query) => {
    console.log('Search triggered for:', query)
    // implement routing or state update here
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
        <Navbar />
      {/* Hero Section */}
      <Hero
        onSearch={handleSearch}
        query={searchQuery}
        setQuery={setSearchQuery}
        searchType={searchType}
        setSearchType={setSearchType}
      />
      {/* Main Content */}
      
    </div>
  );
};

export default ClientDashboard;