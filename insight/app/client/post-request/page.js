"use client";

import React from 'react';
import PostRequestForm from './post-request-client';
import ClientNavbar from '@/app/components/client/navbar-client';

export default function PostRequestPage() {
  return (
    <>
      <ClientNavbar />
      <div className="max-w-4xl mx-auto p-6">
        <PostRequestForm />  {/* Main Form */}
      </div>
    </>
  );
}

