"use client";

import React from 'react';
import { Calendar, Clock, Users, Briefcase, MoreHorizontal, Eye, Edit2, MessageCircle } from 'lucide-react';

export default function RequestCard({ request, onViewDetails, getPriorityColor, getStatusColor, getDaysUntilDeadline }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 ${getPriorityColor(request.priority)} hover:shadow-lg transition-all duration-200 p-6`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{request.title}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
              {request.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
              {request.category}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{request.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Posted {new Date(request.deadline).toISOString().slice(0, 10)}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          <span>{request.proposals} proposals</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span className={getDaysUntilDeadline(request.deadline) < 7 ? 'text-sky-700 font-medium' : ''}>
            {getDaysUntilDeadline(request.deadline)} days left
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <Briefcase className="w-4 h-4 mr-2" />
          <span className="font-medium">{request.budget}</span>
        </div>
      </div>

      {request.status === 'in-progress' && request.progress > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{request.progress}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-sky-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${request.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {request.assignedConsultant && (
        <div className="mb-4 p-3 bg-sky-50 rounded-lg border border-sky-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
              {request.assignedConsultant.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Assigned to {request.assignedConsultant}</p>
              <p className="text-xs text-slate-600">Consultant</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => onViewDetails(request)}
          className="flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm shadow-sm"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </button>
        <button className="flex items-center px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm">
          <Edit2 className="w-4 h-4 mr-2" />
          Edit
        </button>
        {request.assignedConsultant && (
          <button className="flex items-center px-4 py-2 border border-sky-300 text-sky-700 rounded-lg hover:bg-sky-50 transition-colors text-sm">
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat
          </button>
        )}
      </div>
    </div>
  );
}
