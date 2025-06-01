import { useState } from 'react';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import { 
  FaFileAlt, 
  FaUserGraduate, 
  FaUniversity, 
  FaGlobe,
  FaSearch, 
  FaFilter,
  FaPlus,
  FaClipboardCheck,
  FaClipboardList,
  FaPrint
} from 'react-icons/fa';

// Sample NOL applications data
const sampleApplications = [
  {
    id: 'NOL-2025-0001',
    applicantName: 'Andrew Parker',
    purpose: 'Foreign Study',
    destination: 'Australia',
    institution: 'University of Sydney',
    submissionDate: '2025-05-25',
    status: 'Approved',
    completionDate: '2025-05-27'
  },
  {
    id: 'NOL-2025-0002',
    applicantName: 'Jennifer Adams',
    purpose: 'Foreign Study',
    destination: 'United Kingdom',
    institution: 'Oxford University',
    submissionDate: '2025-05-28',
    status: 'In Review',
    completionDate: null
  },
  {
    id: 'NOL-2025-0003',
    applicantName: 'Thomas Wilson',
    purpose: 'Foreign Employment',
    destination: 'Canada',
    institution: 'Toronto General Hospital',
    submissionDate: '2025-05-26',
    status: 'Approved',
    completionDate: '2025-05-28'
  },
  {
    id: 'NOL-2025-0004',
    applicantName: 'Rachel Green',
    purpose: 'Scholarship Application',
    destination: 'Germany',
    institution: 'Max Planck Institute',
    submissionDate: '2025-05-30',
    status: 'Pending Documentation',
    completionDate: null
  },
  {
    id: 'NOL-2025-0005',
    applicantName: 'Daniel Lee',
    purpose: 'Foreign Study',
    destination: 'Japan',
    institution: 'Tokyo University',
    submissionDate: '2025-05-29',
    status: 'In Review',
    completionDate: null
  },
  {
    id: 'NOL-2025-0006',
    applicantName: 'Jessica Martinez',
    purpose: 'Research Program',
    destination: 'France',
    institution: 'Sorbonne University',
    submissionDate: '2025-05-24',
    status: 'Approved',
    completionDate: '2025-05-26'
  },
  {
    id: 'NOL-2025-0007',
    applicantName: 'Kevin Thompson',
    purpose: 'Foreign Employment',
    destination: 'United Arab Emirates',
    institution: 'Abu Dhabi National Oil Company',
    submissionDate: '2025-05-31',
    status: 'Pending Payment',
    completionDate: null
  }
];

// Types of purposes for NOL
const purposeTypes = [
  { id: 'study', name: 'Foreign Study', count: 4 },
  { id: 'employment', name: 'Foreign Employment', count: 2 },
  { id: 'scholarship', name: 'Scholarship Application', count: 1 },
  { id: 'research', name: 'Research Program', count: 1 }
];

const NoObjectionLetter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [purposeFilter, setPurposeFilter] = useState('all');
  const [applications, setApplications] = useState(sampleApplications);

  // Apply filters
  const handleFilter = () => {
    let filtered = [...sampleApplications];
    
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.institution.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status.toLowerCase() === statusFilter.toLowerCase());
    }
    
    if (purposeFilter !== 'all') {
      filtered = filtered.filter(app => app.purpose.toLowerCase().includes(purposeFilter.toLowerCase()));
    }
    
    setApplications(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPurposeFilter('all');
    setApplications(sampleApplications);
  };

  // Status badge styling
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'in review':
        return 'bg-blue-100 text-blue-800';
      case 'pending documentation':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending payment':
        return 'bg-purple-100 text-purple-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate stats
  const approved = sampleApplications.filter(app => app.status === 'Approved').length;
  const pending = sampleApplications.filter(app => 
    app.status === 'In Review' || 
    app.status === 'Pending Documentation' || 
    app.status === 'Pending Payment'
  ).length;
  const totalApplications = sampleApplications.length;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">No Objection Letters</h1>
        <div className="flex space-x-2">
          <button className="btn-secondary flex items-center gap-2">
            <FaPrint size={14} />
            <span>Print Report</span>
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
          title="Approved Letters"
          value={approved}
          icon={<FaClipboardCheck size={24} className="text-green-500" />}
          bgColor="bg-green-50"
        />
        <StatCard
          title="Pending Applications"
          value={pending}
          icon={<FaClipboardList size={24} className="text-blue-500" />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Total Applications"
          value={totalApplications}
          icon={<FaFileAlt size={24} className="text-gray-500" />}
          bgColor="bg-gray-50"
        />
      </div>

      {/* Purpose Types Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {purposeTypes.map(purpose => (
          <div 
            key={purpose.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
            onClick={() => {
              setPurposeFilter(purpose.name.toLowerCase());
              handleFilter();
            }}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">{purpose.name}</div>
              <div className="text-lg font-semibold text-gray-700">{purpose.count}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search applications..."
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
              <option value="approved">Approved</option>
              <option value="in review">In Review</option>
              <option value="pending documentation">Pending Documentation</option>
              <option value="pending payment">Pending Payment</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <div>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={purposeFilter}
              onChange={(e) => setPurposeFilter(e.target.value)}
            >
              <option value="all">All Purposes</option>
              <option value="foreign study">Foreign Study</option>
              <option value="foreign employment">Foreign Employment</option>
              <option value="scholarship">Scholarship Application</option>
              <option value="research">Research Program</option>
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

      {/* Applications Table */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">NOL Applications</h2>
          <span className="text-gray-500 text-sm">{applications.length} applications found</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Application ID</th>
                <th className="px-4 py-3">Applicant Name</th>
                <th className="px-4 py-3">Purpose</th>
                <th className="px-4 py-3">Destination</th>
                <th className="px-4 py-3">Institution</th>
                <th className="px-4 py-3">Submission Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.length > 0 ? (
                applications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaFileAlt size={16} className="text-primary-500 mr-2" />
                        <span className="font-medium">{application.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{application.applicantName}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {application.purpose === 'Foreign Study' && <FaUserGraduate size={14} className="mr-2 text-blue-500" />}
                        {application.purpose === 'Foreign Employment' && <FaGlobe size={14} className="mr-2 text-green-500" />}
                        {application.purpose === 'Scholarship Application' && <FaUniversity size={14} className="mr-2 text-purple-500" />}
                        {application.purpose === 'Research Program' && <FaUniversity size={14} className="mr-2 text-yellow-500" />}
                        {application.purpose}
                      </div>
                    </td>
                    <td className="px-4 py-3">{application.destination}</td>
                    <td className="px-4 py-3 max-w-xs truncate" title={application.institution}>
                      {application.institution}
                    </td>
                    <td className="px-4 py-3">{application.submissionDate}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-800">
                          View
                        </button>
                        {application.status !== 'Approved' && (
                          <button className="text-gray-600 hover:text-gray-800">
                            Edit
                          </button>
                        )}
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">{applications.length}</span> of <span className="font-medium">{sampleApplications.length}</span> applications
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

export default NoObjectionLetter;
