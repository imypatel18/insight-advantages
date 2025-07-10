// components/PreferencesContent.jsx

import React from 'react';
import { CheckCircle, Settings } from 'lucide-react';

const PreferencesContent = () => {
  return (
    <div className="p-6 bg-blue-50 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <Settings className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-blue-700">Your Preferences</h3>
      </div>
      <ul className="space-y-3 text-blue-700 text-sm">
        <li className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          Remote-friendly roles
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          Senior level opportunities
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          Preferred technologies: React, Node.js, TypeScript
        </li>
      </ul>
    </div>
  );
};

export default PreferencesContent;
