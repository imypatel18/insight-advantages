
"use client";

import React from 'react';
import { Star, DollarSign, Calendar, User, Tag } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const statusStyles = {
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
    expired: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusStyles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const StarRating = ({ rating }) => {
  if (!rating) return <span className="text-gray-400">No rating</span>;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600">({rating})</span>
    </div>
  );
};

export default function RequestDetailsModal({ request, onClose }) {
  if (!request) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-blue-900">{request.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Consultant</label>
              <p className="text-blue-900 font-medium">{request.consultant}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <p className="text-blue-900 font-medium">{request.category}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <StatusBadge status={request.status} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
              <p className="text-blue-900 font-medium text-lg">${request.budget.toLocaleString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date</label>
              <p className="text-blue-900 font-medium">{new Date(request.completionDate).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <StarRating rating={request.rating} />
            </div>
          </div>

          {request.feedback && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800">"{request.feedback}"</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            {request.status === 'completed' && (
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Download Receipt
              </button>
            )}
            <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
              Duplicate Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
