"use client"
import RequestCard from "@/app/components/RequestCard";
import RequestModal from "@/app/components/RequestModal";
import EmptyState from "@/app/components/EmptyState";

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit2, 
  X, 
  Mail, 
  Download, 
  Clock, 
  Users, 
  Calendar, 
  ChevronDown,
  MessageCircle,
  Star,
  AlertCircle,
  CheckCircle,
  Plus,
  MoreHorizontal,
  ArrowUpDown,
  Briefcase
} from 'lucide-react';

const ActiveRequestsPage = () => {
  const [selectedView, setSelectedView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - replace with your actual data
  const mockRequests = [
    {
      id: 1,
      title: "React Native Mobile App Development",
      status: "open",
      category: "Mobile Development",
      postedOn: "2024-06-20",
      proposals: 8,
      deadline: "2024-07-15",
      duration: "3 months",
      budget: "$15,000",
      description: "Need a cross-platform mobile app for e-commerce with payment integration...",
      assignedConsultant: null,
      priority: "high",
      progress: 0
    },
    {
      id: 2,
      title: "SEO Optimization & Content Strategy",
      status: "in-progress",
      category: "Digital Marketing",
      postedOn: "2024-06-18",
      proposals: 12,
      deadline: "2024-07-01",
      duration: "2 months",
      budget: "$8,500",
      description: "Comprehensive SEO audit and content strategy for B2B SaaS company...",
      assignedConsultant: "Sarah Johnson",
      priority: "medium",
      progress: 65
    },
    {
      id: 3,
      title: "Financial Analysis Dashboard",
      status: "awaiting-proposals",
      category: "Data Analytics",
      postedOn: "2024-06-22",
      proposals: 3,
      deadline: "2024-08-30",
      duration: "6 weeks",
      budget: "$12,000",
      description: "Interactive dashboard for financial KPIs with real-time data visualization...",
      assignedConsultant: null,
      priority: "low",
      progress: 0
    },
    {
      id: 4,
      title: "Brand Identity & Logo Design",
      status: "in-progress",
      category: "Design",
      postedOn: "2024-06-15",
      proposals: 15,
      deadline: "2024-06-28",
      duration: "4 weeks",
      budget: "$5,000",
      description: "Complete brand identity package including logo, color palette, and guidelines...",
      assignedConsultant: "Mike Chen",
      priority: "high",
      progress: 80
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'awaiting-proposals': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'completed': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-sky-50 border-l-sky-500';
      case 'medium': return 'bg-blue-50 border-l-blue-400';
      case 'low': return 'bg-cyan-50 border-l-cyan-400';
      default: return 'bg-slate-50 border-l-slate-400';
    }
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredAndSortedRequests = useMemo(() => {
    let filtered = mockRequests.filter(request => {
      const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || request.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.postedOn) - new Date(a.postedOn);
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        case 'proposals':
          return b.proposals - a.proposals;
        case 'budget':
          return parseInt(b.budget.replace(/[$,]/g, '')) - parseInt(a.budget.replace(/[$,]/g, ''));
        default:
          return 0;
      }
    });

    return filtered;
  }, [mockRequests, searchTerm, statusFilter, categoryFilter, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Active Requests</h1>
              <p className="text-slate-600 mt-2">Manage and track your project requests</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button className="inline-flex items-center px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors shadow-sm">
                <Plus className="w-5 h-5 mr-2" />
                New Request
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-sky-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Active</p>
                <p className="text-2xl font-bold text-slate-900">{mockRequests.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">In Progress</p>
                <p className="text-2xl font-bold text-slate-900">
                  {mockRequests.filter(r => r.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-cyan-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Proposals</p>
                <p className="text-2xl font-bold text-slate-900">
                  {mockRequests.reduce((sum, r) => sum + r.proposals, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-sky-200 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-sky-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Due Soon</p>
                <p className="text-2xl font-bold text-slate-900">
                  {mockRequests.filter(r => getDaysUntilDeadline(r.deadline) <= 7).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-slate-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-slate-400" />
                <select
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="awaiting-proposals">Awaiting Proposals</option>
                </select>
              </div>

              <select
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Design">Design</option>
              </select>

              <div className="flex items-center space-x-2">
                <ArrowUpDown className="w-5 h-5 text-slate-400" />
                <select
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recent">Most Recent</option>
                  <option value="deadline">Soonest Deadline</option>
                  <option value="proposals">Most Proposals</option>
                  <option value="budget">Highest Budget</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Requests Grid */}
        {filteredAndSortedRequests.length === 0 ? (
          <EmptyState 
            title="No Active Requests" 
            message="You haven't posted any requests yet." 
            showButton={true} 
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAndSortedRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onViewDetails={setSelectedRequest}
                getPriorityColor={getPriorityColor}
                getStatusColor={getStatusColor}
                getDaysUntilDeadline={getDaysUntilDeadline}
              />
            ))}
          </div>
        )}

        {/* Request Details Modal */}
        {selectedRequest && (
          <RequestModal 
            request={selectedRequest} 
            onClose={() => setSelectedRequest(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default ActiveRequestsPage;