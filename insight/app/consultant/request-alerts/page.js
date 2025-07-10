"use client";

import dynamic from 'next/dynamic';
import Navbar from '../../components/consultant/navbar-consultant';

const RequestAlertsPage = dynamic(() => import('./alert-request-consultant'), { ssr: false });

export default function Page() {
  return (
    <>
    <Navbar />
    
      <RequestAlertsPage />
    </>
  );
}
