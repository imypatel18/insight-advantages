"use client";

import React from 'react';
import PostRequestForm from './post-request-client';
import BackToHomeButton from '@/app/components/BackToClientHome';

export default function PostRequestPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <BackToHomeButton />
      <PostRequestForm />
    </div>
  );
}
