"use client"

import { useState, useRef } from "react"
import { Upload, FileText, Eye, Trash2, CheckCircle, AlertCircle, XCircle, X, Shield } from "lucide-react"

const DocumentVerification = () => {
  // Main modal state
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Document Verification State
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Business License Certificate",
      fileName: "business-license.pdf",
      uploadDate: "2024-01-15",
      status: "verified",
      size: "2.3 MB",
    },
    {
      id: 2,
      name: "Professional Certification",
      fileName: "professional-cert.pdf",
      uploadDate: "2024-01-10",
      status: "pending",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "Identity Verification",
      fileName: "id-proof.jpg",
      uploadDate: "2024-01-08",
      status: "rejected",
      size: "0.9 MB",
    },
  ])

  const [activeTab, setActiveTab] = useState("upload")
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)
  const documentNameRef = useRef(null) // Use ref instead of state

  // Handle file selection
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files)
    setSelectedFiles(files)
  }

  // Handle document upload
  const handleDocumentUpload = async () => {
    const documentName = documentNameRef.current?.value || ""

    if (selectedFiles.length === 0 || !documentName.trim()) {
      alert("Please select files and enter a document name")
      return
    }

    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      const newDocuments = selectedFiles.map((file, index) => ({
        id: Date.now() + index,
        name: documentName.trim(),
        fileName: file.name,
        uploadDate: new Date().toISOString().split("T")[0],
        status: "pending",
        size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
      }))

      setDocuments((prev) => [...prev, ...newDocuments])
      setSelectedFiles([])
      setIsUploading(false)

      // Clear both inputs
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
      if (documentNameRef.current) {
        documentNameRef.current.value = ""
      }

      alert("Documents uploaded successfully!")
    }, 2000)
  }

  // Handle document deletion
  const handleDocumentDelete = (documentId) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== documentId))
    }
  }

  // Filter documents by status
  const getDocumentsByStatus = (status) => {
    return documents.filter((doc) => doc.status === status)
  }

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  // Get status color classes
  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "text-green-700 bg-green-100 border-green-200"
      case "pending":
        return "text-yellow-700 bg-yellow-100 border-yellow-200"
      case "rejected":
        return "text-red-700 bg-red-100 border-red-200"
      default:
        return "text-gray-700 bg-gray-100 border-gray-200"
    }
  }

  // Check if upload button should be enabled
  const isUploadDisabled = () => {
    const documentName = documentNameRef.current?.value || ""
    return isUploading || selectedFiles.length === 0 || !documentName.trim()
  }

  // Upload Section Component
  const UploadSection = () => (
    <div className="space-y-6">
      {/* Document Name Input - Using ref instead of state */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Document Name</label>
        <input
          ref={documentNameRef}
          type="text"
          placeholder="e.g., Business License, Professional Certificate"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          autoComplete="off"
          spellCheck="false"
        />
        <p className="text-xs text-gray-500 mt-2">Enter a descriptive name for your document</p>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Files</label>
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleFileSelect}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">Supported: PDF, JPG, PNG, DOC, DOCX (Max 10MB each)</p>
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Selected Files ({selectedFiles.length})
          </h4>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between text-sm bg-white p-2 rounded">
                <span className="text-blue-700 truncate flex-1">{file.name}</span>
                <span className="text-blue-600 font-medium ml-2">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleDocumentUpload}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        {isUploading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            Uploading Documents...
          </>
        ) : (
          <>
            <Upload className="h-5 w-5" />
            Upload Documents
          </>
        )}
      </button>
    </div>
  )

  // Document Item Component
  const DocumentItem = ({ doc, showActions = true }) => (
    <div
      className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-sm ${
        doc.status === "verified"
          ? "border-green-200 bg-green-50"
          : doc.status === "pending"
            ? "border-yellow-200 bg-yellow-50"
            : doc.status === "rejected"
              ? "border-red-200 bg-red-50"
              : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-gray-500 flex-shrink-0" />
            <h4 className="text-sm font-medium text-gray-900 truncate">{doc.name}</h4>
          </div>
          <p className="text-xs text-gray-600 mb-3">
            {doc.fileName} • {doc.size} • {doc.uploadDate}
          </p>
          <div className="flex items-center gap-2">
            {getStatusIcon(doc.status)}
            <span className={`text-xs px-3 py-1 rounded-full border font-medium ${getStatusColor(doc.status)}`}>
              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
            </span>
          </div>
        </div>
        {showActions && (
          <div className="flex gap-2 ml-3 flex-shrink-0">
            <button
              onClick={() => alert("View functionality would open document")}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="View Document"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleDocumentDelete(doc.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Document"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )

  // Empty State Component
  const EmptyState = ({ icon: Icon, title, description }) => (
    <div className="text-center py-12">
      <Icon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  )

  return (
    <>
      {/* Simplified Document Verification Button */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Document Verification</h3>
              <p className="text-sm text-gray-500">Manage your professional documents</p>
            </div>
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          </div>
        </button>
      </div>

      {/* Document Verification Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Document Verification Center</h2>
                    <p className="text-sm text-gray-600">Manage and verify your professional documents</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 bg-gray-50">
              {[
                { id: "upload", label: "Upload New", count: null, icon: Upload },
                { id: "all", label: "All Documents", count: documents.length, icon: FileText },
                {
                  id: "verified",
                  label: "Verified",
                  count: getDocumentsByStatus("verified").length,
                  icon: CheckCircle,
                },
                { id: "pending", label: "Pending", count: getDocumentsByStatus("pending").length, icon: AlertCircle },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`flex-1 px-4 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                  {tab.count !== null && (
                    <span className="ml-1 text-xs opacity-75 bg-gray-200 px-2 py-1 rounded-full">({tab.count})</span>
                  )}
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {activeTab === "upload" && <UploadSection />}

              {activeTab === "all" && (
                <div className="space-y-4">
                  {documents.length === 0 ? (
                    <EmptyState
                      icon={FileText}
                      title="No documents uploaded"
                      description="Upload your first document to get started with verification"
                    />
                  ) : (
                    documents.map((doc) => <DocumentItem key={doc.id} doc={doc} showActions={true} />)
                  )}
                </div>
              )}

              {activeTab === "verified" && (
                <div className="space-y-4">
                  {getDocumentsByStatus("verified").length === 0 ? (
                    <EmptyState
                      icon={CheckCircle}
                      title="No verified documents"
                      description="Documents will appear here once they are verified by our team"
                    />
                  ) : (
                    getDocumentsByStatus("verified").map((doc) => (
                      <DocumentItem key={doc.id} doc={doc} showActions={false} />
                    ))
                  )}
                </div>
              )}

              {activeTab === "pending" && (
                <div className="space-y-4">
                  {getDocumentsByStatus("pending").length === 0 ? (
                    <EmptyState
                      icon={AlertCircle}
                      title="No pending documents"
                      description="Documents under review will appear here"
                    />
                  ) : (
                    getDocumentsByStatus("pending").map((doc) => (
                      <DocumentItem key={doc.id} doc={doc} showActions={true} />
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {documents.length} total documents • {getDocumentsByStatus("verified").length} verified •{" "}
                  {getDocumentsByStatus("pending").length} pending
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DocumentVerification


// "use client"

// import { useState, useRef } from "react"
// import { Upload, FileText, Eye, Trash2, CheckCircle, AlertCircle, XCircle, X, Shield } from "lucide-react"

// const DocumentVerification = () => {
//   // Main modal state
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   // Document Verification State
//   const [documents, setDocuments] = useState([
//     {
//       id: 1,
//       name: "Business License Certificate",
//       fileName: "business-license.pdf",
//       uploadDate: "2024-01-15",
//       status: "verified",
//       size: "2.3 MB",
//     },
//     {
//       id: 2,
//       name: "Professional Certification",
//       fileName: "professional-cert.pdf",
//       uploadDate: "2024-01-10",
//       status: "pending",
//       size: "1.8 MB",
//     },
//     {
//       id: 3,
//       name: "Identity Verification",
//       fileName: "id-proof.jpg",
//       uploadDate: "2024-01-08",
//       status: "rejected",
//       size: "0.9 MB",
//     },
//   ])

//   const [activeTab, setActiveTab] = useState("upload")
//   const [selectedFiles, setSelectedFiles] = useState([])
//   const [documentName, setDocumentName] = useState("")
//   const [isUploading, setIsUploading] = useState(false)
//   const fileInputRef = useRef(null)

//   // Handle file selection
//   const handleFileSelect = (event) => {
//     const files = Array.from(event.target.files)
//     setSelectedFiles(files)
//   }

//   // Handle document name change - Fixed version
//   const handleDocumentNameChange = (event) => {
//     const value = event.target.value
//     setDocumentName(value)
//   }

//   // Handle document upload
//   const handleDocumentUpload = async () => {
//     if (selectedFiles.length === 0 || !documentName.trim()) {
//       alert("Please select files and enter a document name")
//       return
//     }

//     setIsUploading(true)

//     // Simulate upload process
//     setTimeout(() => {
//       const newDocuments = selectedFiles.map((file, index) => ({
//         id: Date.now() + index,
//         name: documentName.trim(),
//         fileName: file.name,
//         uploadDate: new Date().toISOString().split("T")[0],
//         status: "pending",
//         size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
//       }))

//       setDocuments((prev) => [...prev, ...newDocuments])
//       setSelectedFiles([])
//       setDocumentName("")
//       setIsUploading(false)

//       if (fileInputRef.current) {
//         fileInputRef.current.value = ""
//       }

//       alert("Documents uploaded successfully!")
//     }, 2000)
//   }

//   // Handle document deletion
//   const handleDocumentDelete = (documentId) => {
//     if (window.confirm("Are you sure you want to delete this document?")) {
//       setDocuments((prev) => prev.filter((doc) => doc.id !== documentId))
//     }
//   }

//   // Filter documents by status
//   const getDocumentsByStatus = (status) => {
//     return documents.filter((doc) => doc.status === status)
//   }

//   // Get status icon
//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "verified":
//         return <CheckCircle className="h-4 w-4 text-green-600" />
//       case "pending":
//         return <AlertCircle className="h-4 w-4 text-yellow-600" />
//       case "rejected":
//         return <XCircle className="h-4 w-4 text-red-600" />
//       default:
//         return <AlertCircle className="h-4 w-4 text-gray-600" />
//     }
//   }

//   // Get status color classes
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "verified":
//         return "text-green-700 bg-green-100 border-green-200"
//       case "pending":
//         return "text-yellow-700 bg-yellow-100 border-yellow-200"
//       case "rejected":
//         return "text-red-700 bg-red-100 border-red-200"
//       default:
//         return "text-gray-700 bg-gray-100 border-gray-200"
//     }
//   }

//   // Get verification status summary
//   const getVerificationSummary = () => {
//     const verified = getDocumentsByStatus("verified").length
//     const pending = getDocumentsByStatus("pending").length
//     const total = documents.length

//     if (total === 0) return { status: "none", text: "No documents", color: "text-gray-500" }
//     if (verified === total) return { status: "complete", text: "All verified", color: "text-green-600" }
//     if (pending > 0) return { status: "pending", text: `${pending} pending`, color: "text-yellow-600" }
//     return { status: "partial", text: `${verified}/${total} verified`, color: "text-blue-600" }
//   }

//   // Upload Section Component
//   const UploadSection = () => (
//     <div className="space-y-6">
//       {/* Document Name Input */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Document Name</label>
//         <input
//           type="text"
//           value={documentName}
//           onChange={handleDocumentNameChange}
//           placeholder="e.g., Business License, Professional Certificate"
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//           autoComplete="off"
//         />
//         <p className="text-xs text-gray-500 mt-2">Enter a descriptive name for your document</p>
//       </div>

//       {/* File Upload */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Select Files</label>
//         <div className="relative">
//           <input
//             ref={fileInputRef}
//             type="file"
//             multiple
//             accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
//             onChange={handleFileSelect}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
//           />
//         </div>
//         <p className="text-xs text-gray-500 mt-2">Supported: PDF, JPG, PNG, DOC, DOCX (Max 10MB each)</p>
//       </div>

//       {/* Selected Files Preview */}
//       {selectedFiles.length > 0 && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//           <h4 className="text-sm font-medium text-blue-900 mb-3 flex items-center gap-2">
//             <FileText className="h-4 w-4" />
//             Selected Files ({selectedFiles.length})
//           </h4>
//           <div className="space-y-2">
//             {selectedFiles.map((file, index) => (
//               <div key={index} className="flex items-center justify-between text-sm bg-white p-2 rounded">
//                 <span className="text-blue-700 truncate flex-1">{file.name}</span>
//                 <span className="text-blue-600 font-medium ml-2">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Upload Button */}
//       <button
//         onClick={handleDocumentUpload}
//         disabled={isUploading || selectedFiles.length === 0 || !documentName.trim()}
//         className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
//       >
//         {isUploading ? (
//           <>
//             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//             Uploading Documents...
//           </>
//         ) : (
//           <>
//             <Upload className="h-5 w-5" />
//             Upload Documents
//           </>
//         )}
//       </button>
//     </div>
//   )

//   // Document Item Component
//   const DocumentItem = ({ doc, showActions = true }) => (
//     <div
//       className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-sm ${
//         doc.status === "verified"
//           ? "border-green-200 bg-green-50"
//           : doc.status === "pending"
//             ? "border-yellow-200 bg-yellow-50"
//             : doc.status === "rejected"
//               ? "border-red-200 bg-red-50"
//               : "border-gray-200 bg-white"
//       }`}
//     >
//       <div className="flex items-start justify-between">
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 mb-2">
//             <FileText className="h-5 w-5 text-gray-500 flex-shrink-0" />
//             <h4 className="text-sm font-medium text-gray-900 truncate">{doc.name}</h4>
//           </div>
//           <p className="text-xs text-gray-600 mb-3">
//             {doc.fileName} • {doc.size} • {doc.uploadDate}
//           </p>
//           <div className="flex items-center gap-2">
//             {getStatusIcon(doc.status)}
//             <span className={`text-xs px-3 py-1 rounded-full border font-medium ${getStatusColor(doc.status)}`}>
//               {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
//             </span>
//           </div>
//         </div>
//         {showActions && (
//           <div className="flex gap-2 ml-3 flex-shrink-0">
//             <button
//               onClick={() => alert("View functionality would open document")}
//               className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//               title="View Document"
//             >
//               <Eye className="h-4 w-4" />
//             </button>
//             <button
//               onClick={() => handleDocumentDelete(doc.id)}
//               className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//               title="Delete Document"
//             >
//               <Trash2 className="h-4 w-4" />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )

//   // Empty State Component
//   const EmptyState = ({ icon: Icon, title, description }) => (
//     <div className="text-center py-12">
//       <Icon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//       <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
//       <p className="text-xs text-gray-400">{description}</p>
//     </div>
//   )

//   const summary = getVerificationSummary()

//   return (
//     <>
//       {/* Main Document Verification Button */}
//       <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <Shield className="h-6 w-6 text-blue-600" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900">Document Verification</h3>
//                 <p className={`text-sm ${summary.color}`}>{summary.text}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="text-right">
//                 <div className="text-sm font-medium text-gray-900">{documents.length}</div>
//                 <div className="text-xs text-gray-500">Documents</div>
//               </div>
//               <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
//             </div>
//           </div>
//         </button>
//       </div>

//       {/* Document Verification Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
//             {/* Modal Header */}
//             <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-blue-100 rounded-lg">
//                     <Shield className="h-6 w-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-semibold text-gray-900">Document Verification Center</h2>
//                     <p className="text-sm text-gray-600">Manage and verify your professional documents</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>
//             </div>

//             {/* Tab Navigation */}
//             <div className="flex border-b border-gray-200 bg-gray-50">
//               {[
//                 { id: "upload", label: "Upload New", count: null, icon: Upload },
//                 { id: "all", label: "All Documents", count: documents.length, icon: FileText },
//                 {
//                   id: "verified",
//                   label: "Verified",
//                   count: getDocumentsByStatus("verified").length,
//                   icon: CheckCircle,
//                 },
//                 { id: "pending", label: "Pending", count: getDocumentsByStatus("pending").length, icon: AlertCircle },
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   className={`flex-1 px-4 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
//                     activeTab === tab.id
//                       ? "text-blue-600 border-b-2 border-blue-600 bg-white"
//                       : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
//                   }`}
//                   onClick={() => setActiveTab(tab.id)}
//                 >
//                   <tab.icon className="h-4 w-4" />
//                   {tab.label}
//                   {tab.count !== null && (
//                     <span className="ml-1 text-xs opacity-75 bg-gray-200 px-2 py-1 rounded-full">({tab.count})</span>
//                   )}
//                 </button>
//               ))}
//             </div>

//             {/* Modal Content */}
//             <div className="p-6 overflow-y-auto max-h-[60vh]">
//               {activeTab === "upload" && <UploadSection />}

//               {activeTab === "all" && (
//                 <div className="space-y-4">
//                   {documents.length === 0 ? (
//                     <EmptyState
//                       icon={FileText}
//                       title="No documents uploaded"
//                       description="Upload your first document to get started with verification"
//                     />
//                   ) : (
//                     documents.map((doc) => <DocumentItem key={doc.id} doc={doc} showActions={true} />)
//                   )}
//                 </div>
//               )}

//               {activeTab === "verified" && (
//                 <div className="space-y-4">
//                   {getDocumentsByStatus("verified").length === 0 ? (
//                     <EmptyState
//                       icon={CheckCircle}
//                       title="No verified documents"
//                       description="Documents will appear here once they are verified by our team"
//                     />
//                   ) : (
//                     getDocumentsByStatus("verified").map((doc) => (
//                       <DocumentItem key={doc.id} doc={doc} showActions={false} />
//                     ))
//                   )}
//                 </div>
//               )}

//               {activeTab === "pending" && (
//                 <div className="space-y-4">
//                   {getDocumentsByStatus("pending").length === 0 ? (
//                     <EmptyState
//                       icon={AlertCircle}
//                       title="No pending documents"
//                       description="Documents under review will appear here"
//                     />
//                   ) : (
//                     getDocumentsByStatus("pending").map((doc) => (
//                       <DocumentItem key={doc.id} doc={doc} showActions={true} />
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Modal Footer */}
//             <div className="p-6 border-t border-gray-200 bg-gray-50">
//               <div className="flex items-center justify-between">
//                 <div className="text-sm text-gray-600">
//                   {documents.length} total documents • {getDocumentsByStatus("verified").length} verified •{" "}
//                   {getDocumentsByStatus("pending").length} pending
//                 </div>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default DocumentVerification

// "use client"

// import { useState, useRef } from "react"
// import { Upload, FileText, Eye, Trash2, CheckCircle, AlertCircle, XCircle } from "lucide-react"

// const DocumentVerification = () => {
//   // Document Verification State
//   const [documents, setDocuments] = useState([
//     {
//       id: 1,
//       name: "Business License Certificate",
//       fileName: "business-license.pdf",
//       uploadDate: "2024-01-15",
//       status: "verified",
//       size: "2.3 MB",
//     },
//     {
//       id: 2,
//       name: "Professional Certification",
//       fileName: "professional-cert.pdf",
//       uploadDate: "2024-01-10",
//       status: "pending",
//       size: "1.8 MB",
//     },
//     {
//       id: 3,
//       name: "Identity Verification",
//       fileName: "id-proof.jpg",
//       uploadDate: "2024-01-08",
//       status: "rejected",
//       size: "0.9 MB",
//     },
//   ])

//   const [activeTab, setActiveTab] = useState("upload")
//   const [selectedFiles, setSelectedFiles] = useState([])
//   const [documentName, setDocumentName] = useState("")
//   const [isUploading, setIsUploading] = useState(false)
//   const fileInputRef = useRef(null)

//   // Handle file selection
//   const handleFileSelect = (event) => {
//     const files = Array.from(event.target.files)
//     setSelectedFiles(files)
//   }

//   // Handle document upload
//   const handleDocumentUpload = async () => {
//     if (selectedFiles.length === 0 || !documentName.trim()) {
//       alert("Please select files and enter a document name")
//       return
//     }

//     setIsUploading(true)

//     // Simulate upload process
//     setTimeout(() => {
//       const newDocuments = selectedFiles.map((file, index) => ({
//         id: Date.now() + index,
//         name: documentName.trim(),
//         fileName: file.name,
//         uploadDate: new Date().toISOString().split("T")[0],
//         status: "pending",
//         size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
//       }))

//       setDocuments((prev) => [...prev, ...newDocuments])
//       setSelectedFiles([])
//       setDocumentName("")
//       setIsUploading(false)

//       if (fileInputRef.current) {
//         fileInputRef.current.value = ""
//       }

//       alert("Documents uploaded successfully!")
//     }, 2000)
//   }

//   // Handle document deletion
//   const handleDocumentDelete = (documentId) => {
//     if (window.confirm("Are you sure you want to delete this document?")) {
//       setDocuments((prev) => prev.filter((doc) => doc.id !== documentId))
//     }
//   }

//   // Filter documents by status
//   const getDocumentsByStatus = (status) => {
//     return documents.filter((doc) => doc.status === status)
//   }

//   // Get status icon
//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "verified":
//         return <CheckCircle className="h-4 w-4 text-green-600" />
//       case "pending":
//         return <AlertCircle className="h-4 w-4 text-yellow-600" />
//       case "rejected":
//         return <XCircle className="h-4 w-4 text-red-600" />
//       default:
//         return <AlertCircle className="h-4 w-4 text-gray-600" />
//     }
//   }

//   // Get status color classes
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "verified":
//         return "text-green-700 bg-green-100 border-green-200"
//       case "pending":
//         return "text-yellow-700 bg-yellow-100 border-yellow-200"
//       case "rejected":
//         return "text-red-700 bg-red-100 border-red-200"
//       default:
//         return "text-gray-700 bg-gray-100 border-gray-200"
//     }
//   }

//   // Upload Section Component
//   const UploadSection = () => (
//     <div className="space-y-4">
//       {/* Document Name Input */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Document Name</label>
//         <input
//           type="text"
//           value={documentName}
//           onChange={(e) => setDocumentName(e.target.value)}
//           placeholder="e.g., Business License, Professional Certificate"
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//         />
//         <p className="text-xs text-gray-500 mt-1">Enter a descriptive name for your document</p>
//       </div>

//       {/* File Upload */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Select Files</label>
//         <div className="relative">
//           <input
//             ref={fileInputRef}
//             type="file"
//             multiple
//             accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
//             onChange={handleFileSelect}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
//           />
//         </div>
//         <p className="text-xs text-gray-500 mt-1">Supported: PDF, JPG, PNG, DOC, DOCX (Max 10MB each)</p>
//       </div>

//       {/* Selected Files Preview */}
//       {selectedFiles.length > 0 && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
//           <h4 className="text-sm font-medium text-blue-900 mb-2 flex items-center gap-2">
//             <FileText className="h-4 w-4" />
//             Selected Files ({selectedFiles.length})
//           </h4>
//           <div className="space-y-1">
//             {selectedFiles.map((file, index) => (
//               <div key={index} className="flex items-center justify-between text-sm">
//                 <span className="text-blue-700 truncate">{file.name}</span>
//                 <span className="text-blue-600 font-medium ml-2">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Upload Button */}
//       <button
//         onClick={handleDocumentUpload}
//         disabled={isUploading || selectedFiles.length === 0 || !documentName.trim()}
//         className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
//       >
//         {isUploading ? (
//           <>
//             <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//             Uploading...
//           </>
//         ) : (
//           <>
//             <Upload className="h-4 w-4" />
//             Upload Documents
//           </>
//         )}
//       </button>
//     </div>
//   )

//   // Document Item Component
//   const DocumentItem = ({ doc, showActions = true }) => (
//     <div
//       className={`border rounded-lg p-3 transition-all duration-200 hover:shadow-sm ${
//         doc.status === "verified"
//           ? "border-green-200 bg-green-50"
//           : doc.status === "pending"
//             ? "border-yellow-200 bg-yellow-50"
//             : doc.status === "rejected"
//               ? "border-red-200 bg-red-50"
//               : "border-gray-200 bg-white"
//       }`}
//     >
//       <div className="flex items-start justify-between">
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 mb-1">
//             <FileText className="h-4 w-4 text-gray-500 flex-shrink-0" />
//             <h4 className="text-sm font-medium text-gray-900 truncate">{doc.name}</h4>
//           </div>
//           <p className="text-xs text-gray-600 mb-2">
//             {doc.fileName} • {doc.size} • {doc.uploadDate}
//           </p>
//           <div className="flex items-center gap-2">
//             {getStatusIcon(doc.status)}
//             <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(doc.status)}`}>
//               {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
//             </span>
//           </div>
//         </div>
//         {showActions && (
//           <div className="flex gap-1 ml-2 flex-shrink-0">
//             <button
//               onClick={() => alert("View functionality would open document")}
//               className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
//               title="View Document"
//             >
//               <Eye className="h-4 w-4" />
//             </button>
//             <button
//               onClick={() => handleDocumentDelete(doc.id)}
//               className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//               title="Delete Document"
//             >
//               <Trash2 className="h-4 w-4" />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )

//   // Empty State Component
//   const EmptyState = ({ icon: Icon, title, description }) => (
//     <div className="text-center py-8">
//       <Icon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//       <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
//       <p className="text-xs text-gray-400">{description}</p>
//     </div>
//   )

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
//       <div className="p-4 border-b border-gray-100">
//         <h3 className="font-semibold text-gray-900 flex items-center gap-2">
//           <FileText className="h-5 w-5 text-blue-600" />
//           Document Verification
//         </h3>
//       </div>

//       {/* Tab Navigation */}
//       <div className="flex border-b border-gray-100 bg-gray-50">
//         {[
//           { id: "upload", label: "Upload", count: null },
//           { id: "all", label: "All", count: documents.length },
//           { id: "verified", label: "Verified", count: getDocumentsByStatus("verified").length },
//           { id: "pending", label: "Pending", count: getDocumentsByStatus("pending").length },
//         ].map((tab) => (
//           <button
//             key={tab.id}
//             className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
//               activeTab === tab.id
//                 ? "text-blue-600 border-b-2 border-blue-600 bg-white"
//                 : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
//             }`}
//             onClick={() => setActiveTab(tab.id)}
//           >
//             {tab.label}
//             {tab.count !== null && <span className="ml-1 text-xs opacity-75">({tab.count})</span>}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div className="p-4">
//         <div className="min-h-[250px]">
//           {activeTab === "upload" && <UploadSection />}

//           {activeTab === "all" && (
//             <div className="space-y-3">
//               {documents.length === 0 ? (
//                 <EmptyState
//                   icon={FileText}
//                   title="No documents uploaded"
//                   description="Upload your first document to get started"
//                 />
//               ) : (
//                 documents.map((doc) => <DocumentItem key={doc.id} doc={doc} showActions={true} />)
//               )}
//             </div>
//           )}

//           {activeTab === "verified" && (
//             <div className="space-y-3">
//               {getDocumentsByStatus("verified").length === 0 ? (
//                 <EmptyState
//                   icon={CheckCircle}
//                   title="No verified documents"
//                   description="Documents will appear here once verified"
//                 />
//               ) : (
//                 getDocumentsByStatus("verified").map((doc) => (
//                   <DocumentItem key={doc.id} doc={doc} showActions={false} />
//                 ))
//               )}
//             </div>
//           )}

//           {activeTab === "pending" && (
//             <div className="space-y-3">
//               {getDocumentsByStatus("pending").length === 0 ? (
//                 <EmptyState
//                   icon={AlertCircle}
//                   title="No pending documents"
//                   description="Documents under review will appear here"
//                 />
//               ) : (
//                 getDocumentsByStatus("pending").map((doc) => <DocumentItem key={doc.id} doc={doc} showActions={true} />)
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DocumentVerification
