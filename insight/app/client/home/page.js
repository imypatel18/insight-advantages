"use client"

import Navbar from "../../components/navbar-client"

import React, { useState } from 'react';


const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');

  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
        <Navbar />

      {/* Main Content */}
      
    </div>
  );
};

export default ClientDashboard;