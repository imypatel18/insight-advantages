"use client";
import dynamic from 'next/dynamic';
import ClientNavbar from '../../../components/client/navbar-client';
const BrowseConsultant = dynamic(() => import('./BrowseConsultant'), { ssr: false });

export default function Page() {
  return (
    <>
      <ClientNavbar />
      <BrowseConsultant />
    </>
  );
}