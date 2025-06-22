"use client";

import React from "react";

export default function PageHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-sky-50 p-8 rounded-lg mb-8 border border-blue-100">
      <h1 className="text-3xl font-bold text-blue-900 mb-2">Request History</h1>
      <p className="text-blue-700 text-lg">View and manage your completed or archived requests.</p>
    </div>
  );
}