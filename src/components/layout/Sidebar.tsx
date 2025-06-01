import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaPassport,
  FaFileAlt,
  FaSearch,
  FaCalendarAlt,
  FaCog,
  FaUserShield,
  FaExclamationTriangle,
  FaCheckCircle,
  FaIdCard,
  FaHistory
} from 'react-icons/fa';

const sidebarItems = [
  { name: 'User Dashboard', path: '/', icon: <FaHome size={18} /> },
  { name: 'Emergency Travel Certificate', path: '/etc', icon: <FaIdCard size={18} /> },
  { name: 'No Objection Letter', path: '/nol', icon: <FaFileAlt size={18} /> },
  { name: 'Attestation', path: '/attestation', icon: <FaCheckCircle size={18} /> },
  { name: 'Verification / Equalization', path: '/verification', icon: <FaUserShield size={18} /> },
  { name: 'Search Panel', path: '/search', icon: <FaSearch size={18} /> },
  { name: 'Passport Search', path: '/passport-search', icon: <FaPassport size={18} /> },
  { name: 'Activity Log', path: '/activity', icon: <FaHistory size={18} /> },
  { name: 'Events (Calendar)', path: '/events', icon: <FaCalendarAlt size={18} /> },
  { name: 'Account Settings', path: '/settings', icon: <FaCog size={18} /> },
  { name: 'Lost Passport', path: '/lost-passport', icon: <FaExclamationTriangle size={18} /> },
];

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <aside className={`bg-white border-r border-gray-200 h-screen transition-all ${isOpen ? 'w-64' : 'w-20'} shadow-sm`}>
      <div className="p-5 flex justify-between items-center border-b border-gray-200">
        {isOpen ? (
          <h1 className="text-primary-700 font-semibold text-lg">Embassy CRM</h1>
        ) : (
          <h1 className="text-primary-700 font-semibold">CRM</h1>
        )}
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
      
      <nav className="mt-6 px-2">
        <ul className="space-y-1">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
