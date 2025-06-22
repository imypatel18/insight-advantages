"use client"

const RequestModal = ({ request, onClose }) => {
    if (!request) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-sky-50 to-blue-50">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{request.title}</h2>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
                    {request.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <span className="text-sm text-slate-600">{request.category}</span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-3 text-slate-900">Project Description</h3>
                <p className="text-slate-700 leading-relaxed mb-6">{request.description}</p>

                {request.status === 'in-progress' && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-slate-900">Progress</h3>
                    <div className="bg-sky-50 rounded-lg p-4 border border-sky-100">
                      <div className="flex justify-between text-sm text-slate-600 mb-2">
                        <span>Overall Progress</span>
                        <span>{request.progress}% Complete</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div 
                          className="bg-sky-500 h-3 rounded-full transition-all duration-300" 
                          style={{ width: `${request.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <h3 className="text-lg font-semibold mb-3 text-slate-900">Proposals ({request.proposals})</h3>3
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium mr-3">
                            C{i}
                          </div>
                          <div>
                            <p className="font-medium">Consultant {i}</p>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-sm text-gray-600">4.{8+i} (23 reviews)</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-green-600">${(Math.random() * 5000 + 10000).toFixed(0)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        I have {3+i} years of experience in {request.category.toLowerCase()}...
                      </p>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                          Accept
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold mb-3">Project Details</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget:</span>
                      <span className="font-medium">{request.budget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{request.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deadline:</span>
                      <span className="font-medium">{new Date(request.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Posted:</span>
                      <span className="font-medium">{new Date(request.postedOn).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {request.assignedConsultant && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold mb-3">Assigned Consultant</h4>
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium mr-3">
                        {request.assignedConsultant.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium">{request.assignedConsultant}</p>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-600">4.9 (45 reviews)</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                      <MessageCircle className="w-4 h-4 inline mr-2" />
                      Send Message
                    </button>
                  </div>
                )}

                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Request
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Proposals
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-sm">
                    <X className="w-4 h-4 mr-2" />
                    Cancel Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };