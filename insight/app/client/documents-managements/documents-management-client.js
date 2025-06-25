"use client";

import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Download, 
  Eye, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle,
  Plus,
  Search,
  Filter
} from 'lucide-react';

const DocumentManagement = () => {
  const [activeTab, setActiveTab] = useState('uploaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample document data
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Professional_Resume_2024.pdf',
      type: 'Resume / CV',
      category: 'required',
      uploadDate: '2024-06-20',
      status: 'approved',
      fileType: 'pdf'
    },
    {
      id: 2,
      name: 'Engineering_License.pdf',
      type: 'Professional License',
      category: 'required',
      uploadDate: '2024-06-18',
      status: 'pending',
      fileType: 'pdf'
    },
    {
      id: 3,
      name: 'Insurance_Certificate.jpg',
      type: 'Professional Insurance',
      category: 'required',
      uploadDate: '2024-06-15',
      status: 'rejected',
      fileType: 'jpg'
    },
    {
      id: 4,
      name: 'Sample_Project_Portfolio.pdf',
      type: 'Sample Project or Case Study',
      category: 'additional',
      uploadDate: '2024-06-10',
      status: 'approved',
      fileType: 'pdf'
    },
    {
      id: 5,
      name: 'Client_Recommendation.docx',
      type: 'Client Recommendation Letter',
      category: 'additional',
      uploadDate: '2024-06-08',
      status: 'approved',
      fileType: 'docx'
    }
  ]);

  const requiredDocuments = [
    'Resume / CV',
    'Professional License',
    'Professional Insurance',
    'Government Issued ID / Business Registration',
    'Tax Compliance Certificate',
    'Proof of Address (if required)'
  ];

  const additionalDocuments = [
    'Sample Project or Case Study',
    'Client Recommendation Letter',
    'Certificates & Accreditations',
    'Training / Course Completion Certificates',
    'Work Testimonials',
    'Letter of Reference',
    'Company Brochure / Portfolio'
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'required':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1";
    switch (status) {
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-700`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-700`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-700`;
      case 'required':
        return `${baseClasses} bg-orange-100 text-orange-700`;
      default:
        return baseClasses;
    }
  };

  const getFileIcon = (fileType) => {
    return <FileText className="w-5 h-5 text-blue-500" />;
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getCompletionProgress = () => {
    const requiredDocs = documents.filter(doc => doc.category === 'required');
    const approvedRequired = requiredDocs.filter(doc => doc.status === 'approved').length;
    return Math.round((approvedRequired / requiredDocuments.length) * 100);
  };

  const handleFileUpload = (docType, category) => {
    // Simulate file upload
    const newDoc = {
      id: Date.now(),
      name: `New_${docType.replace(/\s+/g, '_')}_${Date.now()}.pdf`,
      type: docType,
      category: category,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      fileType: 'pdf'
    };
    setDocuments([...documents, newDoc]);
  };

  const handleAction = (action, docId) => {
    switch (action) {
      case 'download':
        console.log('Downloading document:', docId);
        break;
      case 'view':
        console.log('Viewing document:', docId);
        break;
      case 'delete':
        setDocuments(documents.filter(doc => doc.id !== docId));
        break;
      case 'reupload':
        console.log('Re-uploading document:', docId);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Document Management</h1>
              <p className="text-gray-600">Manage your professional documents and certifications</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-md">
              <Plus className="w-5 h-5" />
              Upload New
            </button>
          </div>

          {/* Progress Bar */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-blue-700">Profile Completion</span>
              <span className="text-sm font-bold text-blue-700">{getCompletionProgress()}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${getCompletionProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6 border border-blue-100">
          <div className="flex border-b border-blue-100">
            <button
              onClick={() => setActiveTab('uploaded')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'uploaded'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Uploaded Documents ({documents.length})
            </button>
            <button
              onClick={() => setActiveTab('required')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'required'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Required Documents
            </button>
            <button
              onClick={() => setActiveTab('additional')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'additional'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Additional Documents
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'uploaded' && (
              <div>
                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="pl-10 pr-8 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="all">All Status</option>
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                      <option value="required">Required</option>
                    </select>
                  </div>
                </div>

                {/* Documents Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-blue-50 border-b border-blue-200">
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Document</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Type</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Upload Date</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDocuments.map((doc) => (
                        <tr key={doc.id} className="border-b border-blue-100 hover:bg-blue-25 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              {getFileIcon(doc.fileType)}
                              <div>
                                <div className="font-medium text-gray-800">{doc.name}</div>
                                <div className="text-sm text-gray-500">{doc.fileType.toUpperCase()}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-700">{doc.type}</td>
                          <td className="py-4 px-4 text-gray-700">{doc.uploadDate}</td>
                          <td className="py-4 px-4">
                            <span className={getStatusBadge(doc.status)}>
                              {getStatusIcon(doc.status)}
                              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleAction('view', doc.id)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleAction('download', doc.id)}
                                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                title="Download"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              {doc.status === 'rejected' && (
                                <button
                                  onClick={() => handleAction('reupload', doc.id)}
                                  className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
                                  title="Re-upload"
                                >
                                  <Upload className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleAction('delete', doc.id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredDocuments.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No documents found</p>
                    <p className="text-gray-400">Upload your first document to get started</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'required' && (
              <div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-700 font-medium">
                    <AlertCircle className="w-5 h-5 inline mr-2" />
                    These documents are mandatory for profile completion and verification.
                  </p>
                </div>
                
                <div className="grid gap-4">
                  {requiredDocuments.map((docType, index) => {
                    const uploadedDoc = documents.find(doc => doc.type === docType);
                    return (
                      <div key={index} className="border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <FileText className="w-6 h-6 text-blue-500" />
                            <div>
                              <h3 className="font-medium text-gray-800">{docType}</h3>
                              {uploadedDoc && (
                                <p className="text-sm text-gray-500">
                                  Uploaded: {uploadedDoc.uploadDate}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {uploadedDoc ? (
                              <span className={getStatusBadge(uploadedDoc.status)}>
                                {getStatusIcon(uploadedDoc.status)}
                                {uploadedDoc.status.charAt(0).toUpperCase() + uploadedDoc.status.slice(1)}
                              </span>
                            ) : (
                              <span className={getStatusBadge('required')}>
                                {getStatusIcon('required')}
                                Required
                              </span>
                            )}
                            <button
                              onClick={() => handleFileUpload(docType, 'required')}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                            >
                              <Upload className="w-4 h-4" />
                              {uploadedDoc ? 'Re-upload' : 'Upload'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'additional' && (
              <div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-700 font-medium">
                    <CheckCircle className="w-5 h-5 inline mr-2" />
                    Optional documents that strengthen your professional profile.
                  </p>
                </div>
                
                <div className="grid gap-4">
                  {additionalDocuments.map((docType, index) => {
                    const uploadedDoc = documents.find(doc => doc.type === docType);
                    return (
                      <div key={index} className="border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <FileText className="w-6 h-6 text-blue-500" />
                            <div>
                              <h3 className="font-medium text-gray-800">{docType}</h3>
                              {uploadedDoc && (
                                <p className="text-sm text-gray-500">
                                  Uploaded: {uploadedDoc.uploadDate}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {uploadedDoc && (
                              <span className={getStatusBadge(uploadedDoc.status)}>
                                {getStatusIcon(uploadedDoc.status)}
                                {uploadedDoc.status.charAt(0).toUpperCase() + uploadedDoc.status.slice(1)}
                              </span>
                            )}
                            <button
                              onClick={() => handleFileUpload(docType, 'additional')}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                            >
                              <Upload className="w-4 h-4" />
                              {uploadedDoc ? 'Re-upload' : 'Upload'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentManagement;