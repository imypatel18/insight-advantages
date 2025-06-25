'use client';

import React from 'react';
import ClientNavbar from '@/app/components/client/navbar-client';
import ProfileClient from './profile-client';


export default function ClientProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNavbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Profile Content */}
        <ProfileClient />
      </div>
    </div>
  );
}
