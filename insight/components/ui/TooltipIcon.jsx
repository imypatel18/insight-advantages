import React from 'react';

export default function TooltipIcon({ icon: Icon, tooltip }) {
  return (
    <div className="relative group p-2 cursor-pointer">
      <Icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
        {tooltip}
      </span>
    </div>
  );
}
