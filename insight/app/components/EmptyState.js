// File: insight/app/components/EmptyState.js
"use client";

import React from 'react';
import { Briefcase, Plus } from 'lucide-react';

export default function EmptyState({ title = "No Requests Found", message = "There are no matching records in your request history.", showButton = true }) {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Briefcase className="w-12 h-12 text-sky-500" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 mb-6">{message}</p>
      {showButton && (
        <button className="inline-flex items-center px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors shadow-sm">
          <Plus className="w-5 h-5 mr-2" />
          Post a Request
        </button>
      )}
    </div>
  );
}
