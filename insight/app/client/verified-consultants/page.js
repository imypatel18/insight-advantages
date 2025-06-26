'use client';

import React from 'react';
import VerifiedConsultantsPage from '@/app/client/verified-consultants/VerifiedConsultants';
import ClientNavbar from '@/app/components/client/navbar-client';

export default function VerifiedConsultants() {
  return (
    <>
      <ClientNavbar />
      <div className="mt-4">
        <VerifiedConsultantsPage />
      </div>
    </>
  );
}