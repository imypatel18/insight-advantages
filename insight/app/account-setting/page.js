'use client';
import React from 'react';
import AccountSettings from '@/app/components/account-settings';

export default function AccountSettingsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <AccountSettings />
      </div>
    </main>
  );
}
