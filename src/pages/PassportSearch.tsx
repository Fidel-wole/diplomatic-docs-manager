import { useState } from 'react';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import { 
  FaSearch, 
  FaPassport, 
  FaCalendarAlt, 
  FaCheck, 
  FaExclamationTriangle,
  FaSpinner
} from 'react-icons/fa';

// Sample passport data
const samplePassports = [
  {
    id: 'P-2025-0001',
    applicantName: 'James Wilson',
    passportNumber: 'AB1234567',
    issueDate: '2025-04-15',
    expiryDate: '2035-04-14',
    status: 'Active',
    type: 'Regular'
  },
  {
    id: 'P-2025-0002',
    applicantName: 'Emily Davis',
    passportNumber: 'CD8901234',
    issueDate: '2025-03-10',
    expiryDate: '2035-03-09',
    status: 'Active',
    type: 'Diplomatic'
  },
  {
    id: 'P-2025-0003',
    applicantName: 'Michael Brown',
    passportNumber: 'EF5678901',
    issueDate: '2025-05-22',
    expiryDate: '2035-05-21',
    status: 'Processing',
    type: 'Regular'
  },
  {
    id: 'P-2025-0004',
    applicantName: 'Sophia Martinez',
    passportNumber: 'GH2345678',
    issueDate: null,
    expiryDate: null,
    status: 'Pending Biometrics',
    type: 'Regular'
  },
  {
    id: 'P-2025-0005',
    applicantName: 'Oliver Taylor',
    passportNumber: 'IJ9012345',
    issueDate: '2020-06-30',
    expiryDate: '2025-06-29',
    status: 'Expiring Soon',
    type: 'Regular'
  },
  {
    id: 'P-2025-0006',
    applicantName: 'Ava Johnson',
    passportNumber: 'KL5678901',
    issueDate: '2024-01-15',
    expiryDate: '2034-01-14',
    status: 'Active',
    type: 'Service'
  },
  {
    id: 'P-2025-0007',
    applicantName: 'William Thomas',
    passportNumber: 'MN2345678',
    issueDate: null,
    expiryDate: null,
    status: 'Reported Lost',
    type: 'Regular'
  }
];

const PassportSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('passportNumber');
  const [statusFilter, setStatusFilter] = useState('all');
  const [results, setResults] = useState(samplePassports);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter based on search term, search type, and status
    const filtered = samplePassports.filter(passport => {
      let matches = true;
      
      // Match search term based on selected search type
      if (searchTerm) {
        if (searchType === 'passportNumber') {
          matches = passport.passportNumber?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
        } else if (searchType === 'applicantName') {
          matches = passport.applicantName.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchType === 'applicationId') {
          matches = passport.id.toLowerCase().includes(searchTerm.toLowerCase());
        }
      }
      
      // Apply status filter if not "all"
      if (statusFilter !== 'all') {
        matches = matches && passport.status.toLowerCase() === statusFilter.toLowerCase();
      }
      
      return matches;
    });
    
    setResults(filtered);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending biometrics':
        return 'bg-yellow-100 text-yellow-800';
      case 'expiring soon':
        return 'bg-orange-100 text-orange-800';
      case 'reported lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPassportTypeClass = (type: string) => {
    switch (type.toLowerCase()) {
      case 'diplomatic':
        return 'bg-purple-100 text-purple-800';
      case 'service':
        return 'bg-blue-100 text-blue-800';
      case 'regular':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate stats
  const activePassports = samplePassports.filter(p => p.status === 'Active').length;
  const processingPassports = samplePassports.filter(p => p.status === 'Processing' || p.status === 'Pending Biometrics').length;
  const expiringSoonPassports = samplePassports.filter(p => p.status === 'Expiring Soon').length;
  const lostPassports = samplePassports.filter(p => p.status === 'Reported Lost').length;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Passport Search</h1>
        <div className="flex space-x-2">
          <button className="btn-secondary">
            Export Results
          </button>
          <button className="btn-primary">
            New Passport Application
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Active Passports"
          value={activePassports}
          icon={<FaCheck size={24} className="text-green-500" />}
          bgColor="bg-green-50"
        />
        <StatCard
          title="Processing"
          value={processingPassports}
          icon={<FaSpinner size={24} className="text-blue-500" />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Expiring Soon"
          value={expiringSoonPassports}
          icon={<FaCalendarAlt size={24} className="text-orange-500" />}
          bgColor="bg-orange-50"
        />
        <StatCard
          title="Reported Lost"
          value={lostPassports}
          icon={<FaExclamationTriangle size={24} className="text-red-500" />}
          bgColor="bg-red-50"
        />
      </div>

      <Card className="mb-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-48">
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="passportNumber">Passport Number</option>
                <option value="applicantName">Applicant Name</option>
                <option value="applicationId">Application ID</option>
              </select>
            </div>
            
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={`Search by ${searchType === 'passportNumber' ? 'passport number' : searchType === 'applicantName' ? 'applicant name' : 'application ID'}...`}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="md:w-48">
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="processing">Processing</option>
                <option value="pending biometrics">Pending Biometrics</option>
                <option value="expiring soon">Expiring Soon</option>
                <option value="reported lost">Reported Lost</option>
              </select>
            </div>
            
            <button type="submit" className="btn-primary md:w-32">
              Search
            </button>
          </div>
        </form>
      </Card>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Passport Database</h2>
          <span className="text-gray-500 text-sm">{results.length} records found</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Application ID</th>
                <th className="px-4 py-3">Applicant Name</th>
                <th className="px-4 py-3">Passport Number</th>
                <th className="px-4 py-3">Issue Date</th>
                <th className="px-4 py-3">Expiry Date</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {results.length > 0 ? (
                results.map((passport) => (
                  <tr key={passport.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaPassport size={16} className="text-primary-500 mr-2" />
                        <span className="font-medium">{passport.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{passport.applicantName}</td>
                    <td className="px-4 py-3 font-medium">{passport.passportNumber || '-'}</td>
                    <td className="px-4 py-3">{passport.issueDate || '-'}</td>
                    <td className="px-4 py-3">{passport.expiryDate || '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPassportTypeClass(passport.type)}`}>
                        {passport.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(passport.status)}`}>
                        {passport.status}
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
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No passports found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <div className="text-gray-500 text-sm">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{results.length}</span> of <span className="font-medium">{results.length}</span> results
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

export default PassportSearch;
