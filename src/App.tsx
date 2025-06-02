import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import CitizenLayout from './components/citizen/layout/CitizenLayout';
import AuthLayout from './components/citizen/layout/AuthLayout';
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

// Citizen Portal Pages
import CitizenLogin from './pages/citizen/CitizenLogin';
import CitizenRegister from './pages/citizen/CitizenRegister';
import CitizenRegistrationSuccess from './pages/citizen/CitizenRegistrationSuccess';
import CitizenForgotPassword from './pages/citizen/CitizenForgotPassword';
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import CitizenApplications from './pages/citizen/CitizenApplications';
import CitizenProfile from './pages/citizen/CitizenProfile';
import CitizenSettings from './pages/citizen/CitizenSettings';
import CitizenMessages from './pages/citizen/CitizenMessages';
import CitizenAppointments from './pages/citizen/CitizenAppointments';
import CitizenAppointmentList from './pages/citizen/CitizenAppointmentList';
import ETCApplication from './pages/citizen/services/ETCApplication';
//import PassportApplication from './pages/citizen/services/PassportApplication';
import NOLApplication from './pages/citizen/services/NOLApplication';
import AttestationApplication from './pages/citizen/services/AttestationApplication';

import './App.css';

// Auth Guard for Citizen Routes
const CitizenProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const citizenToken = localStorage.getItem('citizenToken');
  
  if (!citizenToken) {
    return <Navigate to="/citizen/login" replace />;
  }
  
  return <>{children}</>;
};

// Auth Guard for Admin Routes
const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const adminToken = localStorage.getItem('adminToken');
  
  if (!adminToken) {
    // In a real app, redirect to admin login
    // For now, admin routes are accessible without login
    return <>{children}</>;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin/Staff Routes */}
        <Route path="/" element={
          <AdminProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </AdminProtectedRoute>
        } />
        <Route path="/etc" element={
          <AdminProtectedRoute>
            <Layout>
              <EmergencyTravelCertificate />
            </Layout>
          </AdminProtectedRoute>
        } />
        <Route path="/nol" element={
          <AdminProtectedRoute>
            <Layout>
              <NoObjectionLetter />
            </Layout>
          </AdminProtectedRoute>
        } />
        <Route path="/attestation" element={
          <AdminProtectedRoute>
            <Layout>
              <Attestation />
            </Layout>
          </AdminProtectedRoute>
        } />
        <Route path="/verification" element={
          <AdminProtectedRoute>
            <Layout>
              <VerificationEqualization />
            </Layout>
          </AdminProtectedRoute>
        } />
        <Route path="/search" element={
          <AdminProtectedRoute>
            <Layout>
              <SearchPanel />
            </Layout>
          </AdminProtectedRoute>
        } />
        <Route path="/passport-search" element={
          <AdminProtectedRoute>
            <Layout>
              <PassportSearch />
            </Layout>
          </AdminProtectedRoute>
        } />
        <Route path="/activity" element={
          <AdminProtectedRoute>
            <Layout>
              <ActivityLog />
            </Layout>
          </AdminProtectedRoute>
        } />
        <Route path="/events" element={
          <AdminProtectedRoute>
            <Layout>
              <EventsCalendar />
            </Layout>
          </AdminProtectedRoute>
        } />
        <Route path="/settings" element={
          <AdminProtectedRoute>
            <Layout>
              <AccountSettings />
            </Layout>
          </AdminProtectedRoute>
        } />
        <Route path="/lost-passport" element={
          <AdminProtectedRoute>
            <Layout>
              <LostPassport />
            </Layout>
          </AdminProtectedRoute>
        } />

        {/* Citizen Authentication Routes */}
        <Route path="/citizen/login" element={
          <AuthLayout title="Sign in to your account">
            <CitizenLogin />
          </AuthLayout>
        } />
        <Route path="/citizen/register" element={
          <AuthLayout title="Create your account">
            <CitizenRegister />
          </AuthLayout>
        } />
        <Route path="/citizen/registration-success" element={
          <AuthLayout title="Registration Successful">
            <CitizenRegistrationSuccess />
          </AuthLayout>
        } />
        <Route path="/citizen/forgot-password" element={
          <AuthLayout title="Reset your password">
            <CitizenForgotPassword />
          </AuthLayout>
        } />

        {/* Protected Citizen Routes */}
        <Route path="/citizen/dashboard" element={
          <CitizenProtectedRoute>
            <CitizenLayout title="Dashboard">
              <CitizenDashboard />
            </CitizenLayout>
          </CitizenProtectedRoute>
        } />
        <Route path="/citizen/applications" element={
          <CitizenProtectedRoute>
            <CitizenLayout title="My Applications">
              <CitizenApplications />
            </CitizenLayout>
          </CitizenProtectedRoute>
        } />
        
        {/* Citizen Service Applications */}
        <Route path="/citizen/applications/etc" element={
          <CitizenProtectedRoute>
            <CitizenLayout title="Emergency Travel Certificate">
              <ETCApplication />
            </CitizenLayout>
          </CitizenProtectedRoute>
        } />
        {/* <Route path="/citizen/applications/passport" element={
          <CitizenProtectedRoute>
            <CitizenLayout title="Passport Application">
              <PassportApplication />
            </CitizenLayout>
          </CitizenProtectedRoute>
        } /> */}
        <Route path="/citizen/applications/nol" element={
          <CitizenProtectedRoute>
            <CitizenLayout title="No Objection Letter">
              <NOLApplication />
            </CitizenLayout>
          </CitizenProtectedRoute>
        } />
        <Route path="/citizen/applications/attestation" element={
          <CitizenProtectedRoute>
            <CitizenLayout title="Document Attestation">
              <AttestationApplication />
            </CitizenLayout>
          </CitizenProtectedRoute>
        } />
        
        {/* Citizen Account Management */}
        <Route path="/citizen/settings" element={
          <CitizenProtectedRoute>
            <CitizenLayout title="Account Settings">
              <CitizenSettings />
            </CitizenLayout>
          </CitizenProtectedRoute>
        } />
        
        <Route path="/citizen/profile" element={
          <CitizenProtectedRoute>
            <CitizenLayout title="My Profile">
              <CitizenProfile />
            </CitizenLayout>
          </CitizenProtectedRoute>
        } />
        
        {/* Citizen Communication */}
        <Route path="/citizen/messages" element={
          <CitizenProtectedRoute>
            <CitizenLayout title="Messages">
              <CitizenMessages />
            </CitizenLayout>
          </CitizenProtectedRoute>
        } />
        
        {/* Citizen Appointments */}
        <Route path="/citizen/appointments/list" element={
          <CitizenProtectedRoute>
            <CitizenLayout title="My Appointments">
              <CitizenAppointmentList />
            </CitizenLayout>
          </CitizenProtectedRoute>
        } />
        
        <Route path="/citizen/appointments/schedule" element={
          <CitizenProtectedRoute>
            <CitizenLayout title="Schedule Appointment">
              <CitizenAppointments />
            </CitizenLayout>
          </CitizenProtectedRoute>
        } />

        {/* 404 Route */}
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
