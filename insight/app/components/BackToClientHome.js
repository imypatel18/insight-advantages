'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackToHomeButton({ label = "Back to Dashboard" }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/client')}
      className="mb-6 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </button>
  );
}
