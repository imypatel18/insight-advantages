'use client';
import React from 'react';
import AccountSettings from '@/app/client/account-setting/account-settings';
import ClientNavbar from '@/app/components/client/navbar-client';

export default function AccountSettingsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <ClientNavbar />
      <div className="max-w-6xl mx-auto">
        <AccountSettings />
      </div>
    </main>
  );
}
