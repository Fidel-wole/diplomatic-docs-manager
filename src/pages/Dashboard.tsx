import { FaIdCard, FaFileAlt, FaCheckCircle, FaUserShield, FaSearch, FaPassport, FaHistory, FaCalendarAlt, FaExclamationTriangle, FaUsers, FaFilePdf, FaPassport as FaPassportFull } from 'react-icons/fa';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import ServiceCard from '../components/dashboard/ServiceCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Sample data for the chart
  const chartData = {
    labels: ['ETC', 'NOL', 'Attestation', 'Verification', 'Lost Passport'],
    datasets: [
      {
        label: 'Applications this month',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
      {
        label: 'Applications last month',
        data: [45, 70, 65, 75, 42],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  };
  
  // Import ActivityType from ActivityFeed if not already imported
  // import type { ActivityType } from '../components/dashboard/ActivityFeed';

  // Sample activity data
  const activities = [
    {
      type: 'approval' as const,
      user: 'John Doe',
      action: 'approved passport application',
      documentId: 'APP-2025-0123',
      documentType: 'Passport',
      timestamp: '10 minutes ago'
    },
    {
      type: 'creation' as const,
      user: 'Jane Smith',
      action: 'created new ETC document',
      documentId: 'ETC-2025-0456',
      documentType: 'Emergency Travel Certificate',
      timestamp: '45 minutes ago'
    },
    {
      type: 'update' as const,
      user: 'Mark Johnson',
      action: 'updated attestation document',
      documentId: 'ATT-2025-0789',
      documentType: 'Attestation',
      timestamp: '2 hours ago'
    },
    {
      type: 'rejection' as const,
      user: 'Sarah Williams',
      action: 'rejected verification request',
      documentId: 'VER-2025-0321',
      documentType: 'Verification',
      timestamp: '3 hours ago'
    }
  ];
  
  const services = [
    {
      title: 'Emergency Travel Certificate',
      description: 'Issue travel documents for emergency situations',
      icon: <FaIdCard size={24} />,
      link: '/etc'
    },
    {
      title: 'No Objection Letter',
      description: 'Process no objection certificates',
      icon: <FaFileAlt size={24} />,
      link: '/nol',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Attestation',
      description: 'Authenticate and attest official documents',
      icon: <FaCheckCircle size={24} />,
      link: '/attestation',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Verification / Equalization',
      description: 'Verify educational and other documents',
      icon: <FaUserShield size={24} />,
      link: '/verification',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Search Panel',
      description: 'Search for applications and documents',
      icon: <FaSearch size={24} />,
      link: '/search',
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'Passport Search',
      description: 'Find passport applications and status',
      icon: <FaPassport size={24} />,
      link: '/passport-search',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'Activity Log',
      description: 'View user activities and audit logs',
      icon: <FaHistory size={24} />,
      link: '/activity',
      color: 'bg-gray-50 text-gray-600'
    },
    {
      title: 'Events Calendar',
      description: 'Manage embassy events and appointments',
      icon: <FaCalendarAlt size={24} />,
      link: '/events',
      color: 'bg-pink-50 text-pink-600'
    },
    {
      title: 'Lost Passport',
      description: 'Process lost passport reports and replacements',
      icon: <FaExclamationTriangle size={24} />,
      link: '/lost-passport',
      color: 'bg-red-50 text-red-600'
    }
  ];
  
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <button className="btn-secondary">
            Export Data
          </button>
          <button className="btn-primary">
            New Application
          </button>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Applications"
          value="2,751"
          icon={<FaFilePdf size={24} className="text-primary-600" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Pending Approvals"
          value="184"
          icon={<FaFileAlt size={24} className="text-yellow-500" />}
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="New Passports"
          value="342"
          icon={<FaPassportFull size={24} className="text-green-500" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Active Users"
          value="128"
          icon={<FaUsers size={24} className="text-blue-500" />}
          trend={{ value: 2, isPositive: true }}
        />
      </div>
      
      {/* Chart and Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Application Trends</h2>
          <div className="h-64">
            <Bar options={chartOptions} data={chartData} />
          </div>
        </Card>
        
        <Card title="Recent Activities">
          <div className="overflow-y-auto max-h-64">
            <ActivityFeed activities={activities} />
          </div>
          <div className="mt-4 text-right">
            <a href="/activity" className="text-primary-600 text-sm font-medium hover:underline">
              View all activities
            </a>
          </div>
        </Card>
      </div>
      
      {/* Services Grid */}
      <h2 className="text-xl font-semibold mb-4">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            icon={service.icon}
            link={service.link}
            color={service.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
