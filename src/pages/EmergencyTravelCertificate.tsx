import { useState } from 'react';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import { 
  FaIdCard, 
  FaUserClock, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaPlus, 
  FaSearch, 
  FaFilter
} from 'react-icons/fa';

// Sample ETC applications
const sampleApplications = [
  {
    id: 'ETC-2025-0001',
    applicantName: 'Michael Johnson',
    reason: 'Medical Emergency',
    destination: 'United States',
    submissionDate: '2025-05-29',
    status: 'Approved',
    urgency: 'High',
    issuanceDate: '2025-05-30',
    validUntil: '2025-08-30'
  },
  {
    id: 'ETC-2025-0002',
    applicantName: 'Sophia Williams',
    reason: 'Family Emergency',
    destination: 'Canada',
    submissionDate: '2025-05-30',
    status: 'Processing',
    urgency: 'High',
    issuanceDate: null,
    validUntil: null
  },
  {
    id: 'ETC-2025-0003',
    applicantName: 'Robert Brown',
    reason: 'Lost Passport',
    destination: 'United Kingdom',
    submissionDate: '2025-05-30',
    status: 'Pending Documentation',
    urgency: 'Medium',
    issuanceDate: null,
    validUntil: null
  },
  {
    id: 'ETC-2025-0004',
    applicantName: 'Emma Davis',
    reason: 'Business Travel',
    destination: 'Germany',
    submissionDate: '2025-05-28',
    status: 'Approved',
    urgency: 'Medium',
    issuanceDate: '2025-05-29',
    validUntil: '2025-08-29'
  },
  {
    id: 'ETC-2025-0005',
    applicantName: 'James Wilson',
    reason: 'Study Abroad',
    destination: 'France',
    submissionDate: '2025-05-31',
    status: 'Under Review',
    urgency: 'Low',
    issuanceDate: null,
    validUntil: null
  },
  {
    id: 'ETC-2025-0006',
    applicantName: 'Olivia Martinez',
    reason: 'Expired Passport',
    destination: 'Spain',
    submissionDate: '2025-05-27',
    status: 'Approved',
    urgency: 'Medium',
    issuanceDate: '2025-05-28',
    validUntil: '2025-08-28'
  }
];

const EmergencyTravelCertificate = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [applications, setApplications] = useState(sampleApplications);

  // Apply filters
  const handleFilter = () => {
    let filtered = [...sampleApplications];
    
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.destination.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status.toLowerCase() === statusFilter.toLowerCase());
    }
    
    setApplications(filtered);
  };

  // Status badge styling
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending documentation':
        return 'bg-yellow-100 text-yellow-800';
      case 'under review':
        return 'bg-purple-100 text-purple-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Urgency badge styling
  const getUrgencyBadgeClass = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate stats
  const approved = sampleApplications.filter(app => app.status === 'Approved').length;
  const pending = sampleApplications.filter(app => app.status === 'Processing' || app.status === 'Pending Documentation' || app.status === 'Under Review').length;
  const highUrgency = sampleApplications.filter(app => app.urgency === 'High').length;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Emergency Travel Certificate</h1>
        <div className="flex space-x-2">
          <button className="btn-secondary">
            Print Report
          </button>
          <button className="btn-primary flex items-center gap-2">
            <FaPlus size={12} />
            <span>New Application</span>
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Approved Certificates"
          value={approved}
          icon={<FaCheckCircle size={24} className="text-green-500" />}
          bgColor="bg-green-50"
        />
        <StatCard
          title="Pending Applications"
          value={pending}
          icon={<FaUserClock size={24} className="text-blue-500" />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="High Urgency"
          value={highUrgency}
          icon={<FaExclamationTriangle size={24} className="text-red-500" />}
          bgColor="bg-red-50"
        />
      </div>

      {/* Filter Section */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, ID, or destination..."
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="md:w-64">
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="processing">Processing</option>
              <option value="pending documentation">Pending Documentation</option>
              <option value="under review">Under Review</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <button 
            onClick={handleFilter}
            className="btn-primary md:w-32 flex items-center justify-center gap-2"
          >
            <FaFilter size={14} />
            <span>Filter</span>
          </button>
        </div>
      </Card>

      {/* Applications Table */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">ETC Applications</h2>
          <span className="text-gray-500 text-sm">{applications.length} applications found</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Application ID</th>
                <th className="px-4 py-3">Applicant Name</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Destination</th>
                <th className="px-4 py-3">Submission Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Urgency</th>
                <th className="px-4 py-3 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.length > 0 ? (
                applications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaIdCard size={16} className="text-primary-500 mr-2" />
                        <span className="font-medium">{application.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{application.applicantName}</td>
                    <td className="px-4 py-3">{application.reason}</td>
                    <td className="px-4 py-3">{application.destination}</td>
                    <td className="px-4 py-3">{application.submissionDate}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getUrgencyBadgeClass(application.urgency)}`}>
                        {application.urgency}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-800">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          Edit
                        </button>
                        {application.status === 'Approved' && (
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
                    No applications found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <div className="text-gray-500 text-sm">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{applications.length}</span> of <span className="font-medium">{applications.length}</span> results
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

export default EmergencyTravelCertificate;
