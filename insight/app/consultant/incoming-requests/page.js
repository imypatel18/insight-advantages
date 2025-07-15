"use client";

import React from 'react';
import IncomingReq from './incoming-requests';
import ClientNavbar from '@/app/components/consultant/navbar-consultant';

export default function RequestHistoryPage() {
  return (
    <>
      <ClientNavbar />
      <div className="max-w-6xl mx-auto p-6">
        <IncomingReq />
      </div>
    </>
  );
}
