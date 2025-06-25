"use client";

import dynamic from 'next/dynamic';
import ClientNavbar from '@/app/components/client/navbar-client';

const RequestAlertsPage = dynamic(() => import('./alert-request-client'), { ssr: false });

export default function Page() {
  return (
    <>
      <ClientNavbar />
      <RequestAlertsPage />
    </>
  );
}
