"use client";

import dynamic from 'next/dynamic';
import BackToHomeButton from '@/app/components/BackToClientHome';

const RequestAlertsPage = dynamic(() => import('./alert-request-client'), { ssr: false });

export default function Page() {
  return (
    <>
      <BackToHomeButton />
      <RequestAlertsPage />
    </>
  );
}
