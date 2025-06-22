"use client";

import React from 'react';
import RequestHistory from './request-history-client';
import ClientNavbar from '../../../../app/components/navbar-client';

export default function RequestHistoryPage() {
  return (
    <>
      <ClientNavbar />
      <div className="max-w-6xl mx-auto p-6">
        <RequestHistory />
      </div>
    </>
  );
}
