import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import SearchPanel from './pages/SearchPanel';
import PassportSearch from './pages/PassportSearch';
import ActivityLog from './pages/ActivityLog';
import EventsCalendar from './pages/EventsCalendar';
import AccountSettings from './pages/AccountSettings';
import LostPassport from './pages/LostPassport';
import EmergencyTravelCertificate from './pages/EmergencyTravelCertificate';
import NoObjectionLetter from './pages/NoObjectionLetter';
import Attestation from './pages/Attestation';
import VerificationEqualization from './pages/VerificationEqualization';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/etc" element={
          <Layout>
            <EmergencyTravelCertificate />
          </Layout>
        } />
        <Route path="/nol" element={
          <Layout>
            <NoObjectionLetter />
          </Layout>
        } />
        <Route path="/attestation" element={
          <Layout>
            <Attestation />
          </Layout>
        } />
        <Route path="/verification" element={
          <Layout>
            <VerificationEqualization />
          </Layout>
        } />
        <Route path="/search" element={
          <Layout>
            <SearchPanel />
          </Layout>
        } />
        <Route path="/passport-search" element={
          <Layout>
            <PassportSearch />
          </Layout>
        } />
        <Route path="/activity" element={
          <Layout>
            <ActivityLog />
          </Layout>
        } />
        <Route path="/events" element={
          <Layout>
            <EventsCalendar />
          </Layout>
        } />
        <Route path="/settings" element={
          <Layout>
            <AccountSettings />
          </Layout>
        } />
        <Route path="/lost-passport" element={
          <Layout>
            <LostPassport />
          </Layout>
        } />
        <Route path="*" element={
          <Layout>
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-6">Page not found</p>
                <a href="/" className="btn-primary">Go back to Dashboard</a>
              </div>
            </div>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App
