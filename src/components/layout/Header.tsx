import { useState } from 'react';
import { FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-primary-700 hidden md:block">Embassy Staff Portal</h1>
      </div>
      
      <div className="flex items-center">
        <div className="relative mr-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Quick search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full mr-3">
          <FaBell size={18} />
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>
        
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center text-gray-700 focus:outline-none"
          >
            <div className="mr-2 text-right hidden md:block">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <FaUserCircle size={32} className="text-gray-500" />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Notifications</a>
              <div className="border-t border-gray-200"></div>
              <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign out</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
