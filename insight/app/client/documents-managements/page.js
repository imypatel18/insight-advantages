'use client';

import React from 'react';
import DocumentManagement from '@/app/client/documents-managements/documents-management-client';
import ClientNavbar from '@/app/components/client/navbar-client';

export default function DocumentManagementPage() {
  return (
    <>
      <ClientNavbar />
      <div className="mt-4 px-6">
        <DocumentManagement />
      </div>
    </>
  );
}
