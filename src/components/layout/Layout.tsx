import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const getBreadcrumbTitle = (path: string) => {
  switch (path) {
    case '/':
      return 'Dashboard';
    case '/etc':
      return 'Emergency Travel Certificate';
    case '/nol':
      return 'No Objection Letter';
    case '/attestation':
      return 'Attestation';
    case '/verification':
      return 'Verification / Equalization';
    case '/search':
      return 'Search Panel';
    case '/passport-search':
      return 'Passport Search';
    case '/activity':
      return 'Activity Log';
    case '/events':
      return 'Events Calendar';
    case '/settings':
      return 'Account Settings';
    case '/lost-passport':
      return 'Lost Passport';
    default:
      return 'Unknown Page';
  }
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const pageName = getBreadcrumbTitle(location.pathname);
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <div className="text-sm breadcrumbs text-gray-500">
              <ul className="flex items-center space-x-2">
                <li><a href="/">Home</a></li>
                {location.pathname !== '/' && (
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{pageName}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
