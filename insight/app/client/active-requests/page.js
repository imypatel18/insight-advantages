"use client";

import React from 'react';
import ActiveRequests from './active-requests-client';
import ClientNavbar from '../../../../app/components/navbar-client';

export default function ActiveRequestsPage() {
  return (
    <>
      <ClientNavbar />
      <div className="max-w-6xl mx-auto p-6">
        <ActiveRequests />
      </div>
    </>
  );
}
