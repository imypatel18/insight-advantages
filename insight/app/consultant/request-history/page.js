"use client";

import React from 'react';
import RequestHistory from './request-history-consultant';
import Navbar from '../../components/consultant/navbar-consultant';

export default function RequestHistoryPage() {
  return (
    <>
      <Navbar />
      
      <div className="max-w-6xl mx-auto p-6">
        <RequestHistory />
      </div>
    </>
  );
}
