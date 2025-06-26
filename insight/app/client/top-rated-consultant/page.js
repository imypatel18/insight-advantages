'use client';

import React from 'react';
import TopRatedConsultants from '@/app/client/top-rated-consultant/TopRatedConsultants';
import ClientNavbar from '@/app/components/client/navbar-client';

export default function TopRatedPage() {
  return (
    <>
      <ClientNavbar />
      <div className="mt-4">
        <TopRatedConsultants />
      </div>
    </>
  );
}