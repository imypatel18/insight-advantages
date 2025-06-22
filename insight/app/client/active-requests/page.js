"use client";

import React from 'react';
import ActiveRequests from './active-requests-client';
import BackToHomeButton from '@/app/components/BackToClientHome';

export default function ActiveRequestsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800"></h1>
      <BackToHomeButton />
      <ActiveRequests />
    </div>
  );
}
