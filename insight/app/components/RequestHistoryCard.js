// File: insight/app/components/RequestHistoryCard.js
"use client";

import React from 'react';
import { Download, MessageSquare, Copy, Calendar, DollarSign, User, Tag, Star } from 'lucide-react';

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

const RequestHistoryCard = ({ request, onViewDetails }) => (
  <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">{request.title}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4 text-blue-400" />
            <span>{request.consultant}</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4 text-blue-400" />
            <span>{request.category}</span>
          </div>
          {request.completionDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-blue-400" />
              <span>{new Date(request.completionDate).toLocaleDateString('en-US')}</span>
            </div>
          )}
        </div>
      </div>
      <StatusBadge status={request.status} />
    </div>

    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-1 text-lg font-semibold text-blue-900">
        <DollarSign className="h-5 w-5 text-blue-400" />
        <span>${request.budget.toLocaleString()}</span>
      </div>
      <StarRating rating={request.rating} />
    </div>

    {request.feedback && (
      <div className="bg-blue-50 p-3 rounded-lg mb-4">
        <p className="text-sm text-blue-800 italic">"{request.feedback}"</p>
      </div>
    )}

    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onViewDetails(request)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        View Details
      </button>

      {request.status === 'completed' && (
        <>
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium flex items-center gap-1">
            <Download className="h-4 w-4" /> Download Receipt
          </button>
          <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium flex items-center gap-1">
            <MessageSquare className="h-4 w-4" /> Leave Review
          </button>
        </>
      )}

      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center gap-1">
        <Copy className="h-4 w-4" /> Duplicate Request
      </button>
    </div>
  </div>
);

export default RequestHistoryCard;
