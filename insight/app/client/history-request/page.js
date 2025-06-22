"use client";

import React from 'react';
import RequestHistory from './request-history-client';
import BackToHomeButton from '@/app/components/BackToClientHome';

export default function RequestHistoryPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800"></h1>
      <BackToHomeButton />
      <RequestHistory />
    </div>
  );
}
