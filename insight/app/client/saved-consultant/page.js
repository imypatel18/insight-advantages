'use client';

import React from 'react';
import SavedConsultants from '@/app/client/saved-consultant/SavedConsultants';
import ClientNavbar from '@/app/components/client/navbar-client';

export default function SavedConsultantsPage() {
  return (
    <>
      <ClientNavbar />
      <div className="mt-4">
        <SavedConsultants />
      </div>
    </>
  );
}