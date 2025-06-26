'use client';

import React from 'react';
import BrowseConsultant from '@/app/client/browse-consultants/BrowseConsultant';
import ClientNavbar from '@/app/components/client/navbar-client';


export default function BrowseConsultantsPage() {
  return (
    <>
      <ClientNavbar />
      <div className="mt-4">
        <BrowseConsultant />
      </div>
    </>
  );
}