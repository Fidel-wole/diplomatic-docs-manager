import { useState } from 'react';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import { 
  FaCheckCircle, 
  FaFileContract, 
  FaRegClock,
  FaReceipt,
  FaPlus, 
  FaSearch, 
  FaFilter,
  FaPrint,
  FaFileSignature
} from 'react-icons/fa';

// Sample attestation applications data
const sampleAttestations = [
  {
    id: 'ATT-2025-0001',
    applicantName: 'Victoria Lewis',
    documentType: 'Birth Certificate',
    purpose: 'Immigration',
    submissionDate: '2025-05-26',
    status: 'Completed',
    paymentStatus: 'Paid',
    completionDate: '2025-05-28'
  },
  {
    id: 'ATT-2025-0002',
    applicantName: 'Benjamin Clark',
    documentType: 'Academic Certificate',
    purpose: 'Foreign Employment',
    submissionDate: '2025-05-27',
    status: 'In Progress',
    paymentStatus: 'Paid',
    completionDate: null
  },
  {
    id: 'ATT-2025-0003',
    applicantName: 'Alexander White',
    documentType: 'Marriage Certificate',
    purpose: 'Visa Application',
    submissionDate: '2025-05-29',
    status: 'Awaiting Verification',
    paymentStatus: 'Paid',
    completionDate: null
  },
  {
    id: 'ATT-2025-0004',
    applicantName: 'Sophia Rodriguez',
    documentType: 'Power of Attorney',
    purpose: 'Legal Proceedings',
    submissionDate: '2025-05-25',
    status: 'Completed',
    paymentStatus: 'Paid',
    completionDate: '2025-05-27'
  },
  {
    id: 'ATT-2025-0005',
    applicantName: 'Matthew Johnson',
    documentType: 'Commercial Invoice',
    purpose: 'Business Import',
    submissionDate: '2025-05-30',
    status: 'Pending Payment',
    paymentStatus: 'Unpaid',
    completionDate: null
  },
  {
    id: 'ATT-2025-0006',
    applicantName: 'Olivia Brown',
    documentType: 'Academic Transcript',
    purpose: 'Further Education',
    submissionDate: '2025-05-28',
    status: 'Document Review',
    paymentStatus: 'Paid',
    completionDate: null
  },
  {
    id: 'ATT-2025-0007',
    applicantName: 'Ethan Wilson',
    documentType: 'Police Clearance',
    purpose: 'Visa Application',
    submissionDate: '2025-05-26',
    status: 'Completed',
    paymentStatus: 'Paid',
    completionDate: '2025-05-29'
  },
  {
    id: 'ATT-2025-0008',
    applicantName: 'Amelia Taylor',
    documentType: 'Medical Certificate',
    purpose: 'Insurance Claim',
    submissionDate: '2025-05-31',
    status: 'Awaiting Verification',
    paymentStatus: 'Paid',
    completionDate: null
  }
];

// Document types for attestation
const documentTypes = [
  { type: 'Academic Certificate', count: 1 },
  { type: 'Academic Transcript', count: 1 },
  { type: 'Birth Certificate', count: 1 },
  { type: 'Commercial Invoice', count: 1 },
  { type: 'Marriage Certificate', count: 1 },
  { type: 'Medical Certificate', count: 1 },
  { type: 'Police Clearance', count: 1 },
  { type: 'Power of Attorney', count: 1 }
];

const Attestation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [documentFilter, setDocumentFilter] = useState('all');
  const [attestations, setAttestations] = useState(sampleAttestations);

  // Apply filters
  const handleFilter = () => {
    let filtered = [...sampleAttestations];
    
    if (searchTerm) {
      filtered = filtered.filter(att => 
        att.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        att.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        att.purpose.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(att => att.status.toLowerCase() === statusFilter.toLowerCase());
    }
    
    if (documentFilter !== 'all') {
      filtered = filtered.filter(att => att.documentType.toLowerCase() === documentFilter.toLowerCase());
    }
    
    setAttestations(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDocumentFilter('all');
    setAttestations(sampleAttestations);
  };

  // Status badge styling
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'awaiting verification':
        return 'bg-yellow-100 text-yellow-800';
      case 'document review':
        return 'bg-purple-100 text-purple-800';
      case 'pending payment':
        return 'bg-orange-100 text-orange-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Payment status badge styling
  const getPaymentBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'unpaid':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate stats
  const completed = sampleAttestations.filter(att => att.status === 'Completed').length;
  const inProgress = sampleAttestations.filter(att => 
    att.status === 'In Progress' || 
    att.status === 'Awaiting Verification' || 
    att.status === 'Document Review'
  ).length;
  const pending = sampleAttestations.filter(att => att.status === 'Pending Payment').length;
  const totalAttestations = sampleAttestations.length;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Attestation Services</h1>
        <div className="flex space-x-2">
          <button className="btn-secondary flex items-center gap-2">
            <FaPrint size={14} />
            <span>Print Report</span>
          </button>
          <button className="btn-primary flex items-center gap-2">
            <FaPlus size={12} />
            <span>New Attestation</span>
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Completed"
          value={completed}
          icon={<FaCheckCircle size={24} className="text-green-500" />}
          bgColor="bg-green-50"
        />
        <StatCard
          title="In Progress"
          value={inProgress}
          icon={<FaRegClock size={24} className="text-blue-500" />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Pending Payment"
          value={pending}
          icon={<FaReceipt size={24} className="text-orange-500" />}
          bgColor="bg-orange-50"
        />
        <StatCard
          title="Total Attestations"
          value={totalAttestations}
          icon={<FaFileContract size={24} className="text-gray-500" />}
          bgColor="bg-gray-50"
        />
      </div>

      {/* Document Types Summary */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Document Types</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {documentTypes.map((doc, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-primary-50 hover:border-primary-200 transition-all cursor-pointer"
              onClick={() => {
                setDocumentFilter(doc.type.toLowerCase());
                handleFilter();
              }}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-700">{doc.type}</div>
                <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700 shadow-sm">
                  {doc.count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Filter Section */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search attestations..."
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="in progress">In Progress</option>
              <option value="awaiting verification">Awaiting Verification</option>
              <option value="document review">Document Review</option>
              <option value="pending payment">Pending Payment</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <div>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={documentFilter}
              onChange={(e) => setDocumentFilter(e.target.value)}
            >
              <option value="all">All Document Types</option>
              {documentTypes.map((doc, index) => (
                <option key={index} value={doc.type.toLowerCase()}>
                  {doc.type}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleFilter}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <FaFilter size={14} />
              <span>Filter</span>
            </button>
            <button
              onClick={resetFilters}
              className="btn-secondary px-3"
            >
              Reset
            </button>
          </div>
        </div>
      </Card>

      {/* Attestations Table */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Attestation Applications</h2>
          <span className="text-gray-500 text-sm">{attestations.length} applications found</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Reference ID</th>
                <th className="px-4 py-3">Applicant Name</th>
                <th className="px-4 py-3">Document Type</th>
                <th className="px-4 py-3">Purpose</th>
                <th className="px-4 py-3">Submission Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {attestations.length > 0 ? (
                attestations.map((attestation) => (
                  <tr key={attestation.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaFileSignature size={16} className="text-primary-500 mr-2" />
                        <span className="font-medium">{attestation.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{attestation.applicantName}</td>
                    <td className="px-4 py-3">{attestation.documentType}</td>
                    <td className="px-4 py-3">{attestation.purpose}</td>
                    <td className="px-4 py-3">{attestation.submissionDate}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(attestation.status)}`}>
                        {attestation.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPaymentBadgeClass(attestation.paymentStatus)}`}>
                        {attestation.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-800">
                          View
                        </button>
                        {attestation.status !== 'Completed' && (
                          <button className="text-gray-600 hover:text-gray-800">
                            Edit
                          </button>
                        )}
                        {attestation.status === 'Completed' && (
                          <button className="text-green-600 hover:text-green-800">
                            Print
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No attestations found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <div className="text-gray-500 text-sm">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{attestations.length}</span> of <span className="font-medium">{attestations.length}</span> results
          </div>
          
          <div className="flex space-x-1">
            <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-primary-50 text-primary-600 border border-primary-100 font-medium">
              1
            </button>
            <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Attestation;
