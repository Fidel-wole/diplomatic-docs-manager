import { useState, useEffect } from 'react';
import { FaSave, FaKey, FaAddressCard, FaPassport } from 'react-icons/fa';

const CitizenSettings = () => {
  const [activeTab, setActiveTab] = useState<'personal'|'security'|'documents'|'notifications'>('personal');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    dateOfBirth: '',
  });
  
  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    twoFactorEnabled: false,
  });
  
  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    applicationUpdates: true,
    newsAndEvents: false,
    appointmentReminders: true,
    documentExpiryReminders: true,
  });
  
  useEffect(() => {
    // In a real application, you would fetch the user's data from your backend
    // For now, we'll simulate loading user data with a delay
    const userString = localStorage.getItem('citizenUser');
    
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        setPersonalInfo({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phoneNumber: userData.phoneNumber || '',
          address: userData.address || '',
          city: userData.city || '',
          state: userData.state || '',
          zipCode: userData.zipCode || '',
          country: userData.country || '',
          dateOfBirth: userData.dateOfBirth || '',
        });
      } catch (error) {
        console.error('Failed to parse user data', error);
      }
    }
  }, []);
  
  // Handle input changes for personal info
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };
  
  // Handle input changes for security settings
  const handleSecuritySettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings({ 
      ...securitySettings, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };
  
  // Handle input changes for notification settings
  const handleNotificationSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings({ ...notificationSettings, [name]: checked });
  };
  
  // Handle form submissions
  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would send the data to the backend
      const currentUserData = JSON.parse(localStorage.getItem('citizenUser') || '{}');
      const updatedUserData = { ...currentUserData, ...personalInfo };
      
      // Update local storage with the new data
      localStorage.setItem('citizenUser', JSON.stringify(updatedUserData));
      
      setLoading(false);
      setMessage({ type: 'success', text: 'Personal information updated successfully!' });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }, 1000);
  };
  
  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate passwords
    if (securitySettings.newPassword !== securitySettings.confirmNewPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      setLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would send the data to the backend
      setLoading(false);
      setMessage({ type: 'success', text: 'Security settings updated successfully!' });
      
      // Reset password fields
      setSecuritySettings({
        ...securitySettings,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }, 1000);
  };
  
  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would send the data to the backend
      setLoading(false);
      setMessage({ type: 'success', text: 'Notification preferences updated successfully!' });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }, 1000);
  };
  
  return (
    <div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('personal')}
              className={`${
                activeTab === 'personal'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center`}
            >
              <FaAddressCard className="mr-2" /> Personal Information
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`${
                activeTab === 'security'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center`}
            >
              <FaKey className="mr-2" /> Security
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`${
                activeTab === 'documents'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center`}
            >
              <FaPassport className="mr-2" /> My Documents
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`${
                activeTab === 'notifications'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center`}
            >
              <FaAddressCard className="mr-2" /> Notifications
            </button>
          </nav>
        </div>
        
        {/* Status Messages */}
        {message.text && (
          <div
            className={`p-4 ${
              message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}
        
        <div className="p-6">
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <form onSubmit={handlePersonalInfoSubmit}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <p className="text-gray-600 mb-6">Update your personal information and contact details.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={personalInfo.phoneNumber}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={personalInfo.dateOfBirth}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={personalInfo.address}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={personalInfo.city}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                  <input
                    type="text"
                    name="state"
                    value={personalInfo.state}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={personalInfo.zipCode}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={personalInfo.country}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    'Saving...'
                  ) : (
                    <>
                      <FaSave className="mr-2" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
          
          {/* Security Tab */}
          {activeTab === 'security' && (
            <form onSubmit={handleSecuritySubmit}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
              <p className="text-gray-600 mb-6">Update your password and security preferences.</p>
              
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-800 mb-3">Change Password</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={securitySettings.currentPassword}
                      onChange={handleSecuritySettingsChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required={securitySettings.newPassword !== ''}
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={securitySettings.newPassword}
                      onChange={handleSecuritySettingsChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      value={securitySettings.confirmNewPassword}
                      onChange={handleSecuritySettingsChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required={securitySettings.newPassword !== ''}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-800 mb-3">Two-Factor Authentication</h4>
                <div className="flex items-center">
                  <input
                    id="twoFactorEnabled"
                    name="twoFactorEnabled"
                    type="checkbox"
                    checked={securitySettings.twoFactorEnabled}
                    onChange={handleSecuritySettingsChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="twoFactorEnabled" className="ml-3 block text-sm font-medium text-gray-700">
                    Enable two-factor authentication for additional security
                  </label>
                </div>
                {securitySettings.twoFactorEnabled && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600 mb-2">
                      Two-factor authentication adds an extra layer of security to your account. When enabled, you'll need to provide a code from your phone in addition to your password when signing in.
                    </p>
                    <button
                      type="button"
                      className="text-primary-600 hover:text-primary-500 text-sm font-medium"
                      onClick={() => {
                        // In a real app, this would open a setup flow
                        alert('This would initiate the 2FA setup process in a real application.');
                      }}
                    >
                      Set up two-factor authentication
                    </button>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    'Saving...'
                  ) : (
                    <>
                      <FaSave className="mr-2" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
          
          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">My Documents</h3>
              <p className="text-gray-600 mb-6">Manage your uploaded documents and identification.</p>
              
              <div className="border border-gray-200 rounded-md mb-6 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="text-md font-medium text-gray-800">Personal Identification</h4>
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FaPassport className="text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">Passport</p>
                          <p className="text-xs text-gray-500">Added: 01/15/2025</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          className="text-sm text-primary-600 hover:text-primary-500"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="text-sm text-red-600 hover:text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FaAddressCard className="text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">National ID Card</p>
                          <p className="text-xs text-gray-500">Added: 01/10/2025</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          className="text-sm text-primary-600 hover:text-primary-500"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="text-sm text-red-600 hover:text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="button"
                      className="text-sm text-primary-600 hover:text-primary-500"
                    >
                      Upload new document
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="text-md font-medium text-gray-800">Supporting Documents</h4>
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FaAddressCard className="text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">Birth Certificate</p>
                          <p className="text-xs text-gray-500">Added: 12/05/2024</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          className="text-sm text-primary-600 hover:text-primary-500"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="text-sm text-red-600 hover:text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FaAddressCard className="text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">Proof of Address</p>
                          <p className="text-xs text-gray-500">Added: 01/20/2025</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          className="text-sm text-primary-600 hover:text-primary-500"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="text-sm text-red-600 hover:text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="button"
                      className="text-sm text-primary-600 hover:text-primary-500"
                    >
                      Upload new document
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <form onSubmit={handleNotificationSubmit}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
              <p className="text-gray-600 mb-6">Customize how and when you receive notifications.</p>
              
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-800 mb-3">Communication Channels</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="emailNotifications"
                      name="emailNotifications"
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationSettingsChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="emailNotifications" className="ml-3 block text-sm font-medium text-gray-700">
                      Email Notifications
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="smsNotifications"
                      name="smsNotifications"
                      type="checkbox"
                      checked={notificationSettings.smsNotifications}
                      onChange={handleNotificationSettingsChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="smsNotifications" className="ml-3 block text-sm font-medium text-gray-700">
                      SMS Notifications
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-800 mb-3">Notification Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="applicationUpdates"
                      name="applicationUpdates"
                      type="checkbox"
                      checked={notificationSettings.applicationUpdates}
                      onChange={handleNotificationSettingsChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="applicationUpdates" className="ml-3 block text-sm font-medium text-gray-700">
                      Application Status Updates
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="appointmentReminders"
                      name="appointmentReminders"
                      type="checkbox"
                      checked={notificationSettings.appointmentReminders}
                      onChange={handleNotificationSettingsChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="appointmentReminders" className="ml-3 block text-sm font-medium text-gray-700">
                      Appointment Reminders
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="documentExpiryReminders"
                      name="documentExpiryReminders"
                      type="checkbox"
                      checked={notificationSettings.documentExpiryReminders}
                      onChange={handleNotificationSettingsChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="documentExpiryReminders" className="ml-3 block text-sm font-medium text-gray-700">
                      Document Expiry Reminders
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="newsAndEvents"
                      name="newsAndEvents"
                      type="checkbox"
                      checked={notificationSettings.newsAndEvents}
                      onChange={handleNotificationSettingsChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="newsAndEvents" className="ml-3 block text-sm font-medium text-gray-700">
                      News and Embassy Events
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    'Saving...'
                  ) : (
                    <>
                      <FaSave className="mr-2" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitizenSettings;
