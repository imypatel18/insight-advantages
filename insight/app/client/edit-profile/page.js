"use client";

import React from "react";
import EditClientProfile from "./edit-profile";
import ClientNavbar from '@/app/components/client/navbar-client';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <ClientNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EditClientProfile />
      </div>
    </div>
  );
}