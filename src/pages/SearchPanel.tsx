import { useState } from 'react';
import Card from '../components/ui/Card';
import { FaSearch, FaFilePdf, FaPassport, FaFileAlt, FaIdCard } from 'react-icons/fa';

// Sample data for search results
const sampleResults = [
  {
    id: 'APP-2025-0123',
    name: 'John Smith',
    documentType: 'Passport',
    status: 'Approved',
    dateSubmitted: '2025-05-12',
    icon: <FaPassport size={18} className="text-blue-500" />
  },
  {
    id: 'ETC-2025-0456',
    name: 'Maria Garcia',
    documentType: 'Emergency Travel Certificate',
    status: 'Pending',
    dateSubmitted: '2025-05-20',
    icon: <FaIdCard size={18} className="text-yellow-500" />
  },
  {
    id: 'ATT-2025-0789',
    name: 'Robert Johnson',
    documentType: 'Attestation',
    status: 'In Progress',
    dateSubmitted: '2025-05-18',
    icon: <FaFileAlt size={18} className="text-purple-500" />
  },
  {
    id: 'NOL-2025-1234',
    name: 'Sarah Williams',
    documentType: 'No Objection Letter',
    status: 'Rejected',
    dateSubmitted: '2025-05-15',
    icon: <FaFilePdf size={18} className="text-red-500" />
  },
  {
    id: 'VER-2025-5678',
    name: 'David Brown',
    documentType: 'Verification',
    status: 'Approved',
    dateSubmitted: '2025-05-10',
    icon: <FaFilePdf size={18} className="text-green-500" />
  }
];

const SearchPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [results, setResults] = useState(sampleResults);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter based on search term and filter type
    const filtered = sampleResults.filter(item => {
      const matchesSearch = 
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.documentType.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesType = filterType === 'all' || item.documentType.toLowerCase().includes(filterType.toLowerCase());
      
      return matchesSearch && matchesType;
    });
    
    setResults(filtered);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Search Panel</h1>
        <button className="btn-primary">
          Advanced Search
        </button>
      </div>

      <Card className="mb-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, ID, document type..."
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-64">
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Document Types</option>
                <option value="passport">Passport</option>
                <option value="emergency">Emergency Travel Certificate</option>
                <option value="attestation">Attestation</option>
                <option value="no objection">No Objection Letter</option>
                <option value="verification">Verification</option>
              </select>
            </div>
            <button type="submit" className="btn-primary md:w-32">
              Search
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="font-medium text-gray-700 mr-2">Quick filters:</span>
            <button 
              type="button" 
              onClick={() => setFilterType('passport')}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
            >
              Passports
            </button>
            <button 
              type="button" 
              onClick={() => setFilterType('emergency')}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
            >
              ETCs
            </button>
            <button 
              type="button"
              className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
                setResults(sampleResults);
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </Card>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Search Results</h2>
          <span className="text-gray-500 text-sm">{results.length} results found</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Document ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date Submitted</th>
                <th className="px-4 py-3 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {results.length > 0 ? (
                results.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        {result.icon}
                        <span className="ml-2 font-medium">{result.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{result.name}</td>
                    <td className="px-4 py-3">{result.documentType}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(result.status)}`}>
                        {result.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{result.dateSubmitted}</td>
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
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No results found. Try adjusting your search criteria.
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

export default SearchPanel;
