'use client';

import React from 'react';
import SubscriptionClient from './subscription-client';
import ClientNavbar from '@/app/components/client/navbar-client';

export default function SubscriptionPage() {
  return (
    <>
      <ClientNavbar />
      <div className="mt-4 px-6">
        <SubscriptionClient />
      </div>
    </>
  );
}
