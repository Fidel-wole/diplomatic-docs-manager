import { useState } from 'react';
import Card from '../components/ui/Card';
import { 
  FaUser, 
  FaLock, 
  FaBell, 
  FaSave, 
  FaSignOutAlt, 
  FaShieldAlt,
  FaEnvelope,
  FaIdCard,
  FaPhone,
  FaGlobe,
  FaExclamationCircle
} from 'react-icons/fa';

// Sample user data
const sampleUser = {
  id: 'USR-001',
  name: 'John Doe',
  email: 'john.doe@embassy.gov',
  role: 'Administrator',
  department: 'Consular Services',
  phone: '+1234567890',
  position: 'Senior Consular Officer',
  profileImage: null,
  lastLogin: '2025-05-31 09:45 AM',
  joinDate: '2022-03-15',
  twoFactorEnabled: true,
};

// Tab names
type TabName = 'profile' | 'security' | 'notifications' | 'sessions' | 'audit';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState<TabName>('profile');
  const [user, setUser] = useState(sampleUser);
  const [editedUser, setEditedUser] = useState(sampleUser);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | ''>('');
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    applicationUpdates: true,
    securityAlerts: true,
    systemMessages: false,
    marketingMessages: false
  });

  // Tabs list
  const tabs = [
    { name: 'profile', label: 'Profile', icon: <FaUser /> },
    { name: 'security', label: 'Security', icon: <FaLock /> },
    { name: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { name: 'sessions', label: 'Active Sessions', icon: <FaGlobe /> },
    { name: 'audit', label: 'Activity Log', icon: <FaExclamationCircle /> }
  ];

  // Handle editing profile
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  // Handle saving profile changes
  const handleSaveProfile = () => {
    setUser(editedUser);
    setIsEditing(false);
    // Here you would typically make an API call to update the user data
    alert('Profile updated successfully!');
  };

  // Handle input changes for profile editing
  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value
    });
  };

  // Handle password changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordFields({
      ...passwordFields,
      [name]: value
    });

    // Check password strength if the field is newPassword
    if (name === 'newPassword') {
      if (value.length === 0) {
        setPasswordStrength('');
      } else if (value.length < 8) {
        setPasswordStrength('weak');
      } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
        setPasswordStrength('strong');
      } else {
        setPasswordStrength('medium');
      }
    }
  };

  // Handle toggling notification settings
  const handleToggleNotification = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'strong':
        return 'bg-green-500';
      default:
        return 'bg-gray-200';
    }
  };

  // Sample session data
  const activeSessions = [
    {
      id: 'SESSION-001',
      device: 'Chrome on Windows',
      ipAddress: '192.168.1.45',
      location: 'Washington DC, USA',
      lastActive: '2025-06-01 09:30 AM',
      isCurrent: true
    },
    {
      id: 'SESSION-002',
      device: 'Safari on iPhone',
      ipAddress: '192.168.1.62',
      location: 'New York, USA',
      lastActive: '2025-05-31 15:45 PM',
      isCurrent: false
    },
    {
      id: 'SESSION-003',
      device: 'Firefox on MacOS',
      ipAddress: '192.168.1.28',
      location: 'Chicago, USA',
      lastActive: '2025-05-30 11:20 AM',
      isCurrent: false
    }
  ];

  // Sample audit log data
  const auditLogs = [
    {
      id: 'LOG-001',
      action: 'Profile updated',
      timestamp: '2025-05-30 10:15 AM',
      ipAddress: '192.168.1.45',
      details: 'Changed phone number and position'
    },
    {
      id: 'LOG-002',
      action: 'Password changed',
      timestamp: '2025-05-15 09:30 AM',
      ipAddress: '192.168.1.45',
      details: 'Password was successfully updated'
    },
    {
      id: 'LOG-003',
      action: 'Login',
      timestamp: '2025-05-15 09:25 AM',
      ipAddress: '192.168.1.45',
      details: 'Successful login from Chrome on Windows'
    },
    {
      id: 'LOG-004',
      action: 'Failed login attempt',
      timestamp: '2025-05-14 17:45 PM',
      ipAddress: '203.0.113.42',
      details: 'Unknown IP address, incorrect password'
    },
    {
      id: 'LOG-005',
      action: 'Two-factor authentication enabled',
      timestamp: '2025-05-10 14:20 PM',
      ipAddress: '192.168.1.45',
      details: 'Enabled 2FA via authentication app'
    }
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
        <button className="btn-primary flex items-center gap-2">
          <FaSignOutAlt size={14} />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64">
          <Card>
            <div className="flex flex-col items-center mb-6">
              <div className="h-24 w-24 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-3xl mb-4">
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} className="h-24 w-24 rounded-full" />
                ) : (
                  user.name.split(' ').map(n => n[0]).join('').toUpperCase()
                )}
              </div>
              <h3 className="text-lg font-medium">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.role}</p>
              <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full mt-2">
                {user.department}
              </div>
            </div>

            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name as TabName)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${
                    activeTab === tab.name 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="border-t border-gray-100 mt-6 pt-4">
              <div className="text-xs text-gray-500 mb-2">Account Info</div>
              <div className="text-xs text-gray-500 flex justify-between">
                <span>Last login:</span>
                <span>{user.lastLogin}</span>
              </div>
              <div className="text-xs text-gray-500 flex justify-between mt-1">
                <span>Member since:</span>
                <span>{user.joinDate}</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex-1">
          {activeTab === 'profile' && (
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                {!isEditing ? (
                  <button 
                    onClick={handleEditProfile}
                    className="btn-secondary"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button 
                    onClick={handleSaveProfile}
                    className="btn-primary flex items-center gap-2"
                  >
                    <FaSave size={14} />
                    <span>Save Changes</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={isEditing ? editedUser.name : user.name}
                      onChange={handleProfileInputChange}
                      disabled={!isEditing}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={isEditing ? editedUser.email : user.email}
                      onChange={handleProfileInputChange}
                      disabled={!isEditing}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaIdCard className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="position"
                      value={isEditing ? editedUser.position : user.position}
                      onChange={handleProfileInputChange}
                      disabled={!isEditing}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={isEditing ? editedUser.phone : user.phone}
                      onChange={handleProfileInputChange}
                      disabled={!isEditing}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaIdCard className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="department"
                      value={isEditing ? editedUser.department : user.department}
                      onChange={handleProfileInputChange}
                      disabled={!isEditing}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500 mb-4">
                    Please review your information before saving changes.
                  </p>
                </div>
              )}
            </Card>
          )}

          {activeTab === 'security' && (
            <>
              <Card className="mb-6">
                <h2 className="text-lg font-semibold mb-6">Password Settings</h2>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordFields.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your current password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordFields.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter new password"
                    />

                    {passwordStrength && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs text-gray-600">Password Strength</label>
                          <span className="text-xs capitalize">
                            {passwordStrength === 'weak' && (
                              <span className="text-red-500">Weak</span>
                            )}
                            {passwordStrength === 'medium' && (
                              <span className="text-yellow-500">Medium</span>
                            )}
                            {passwordStrength === 'strong' && (
                              <span className="text-green-500">Strong</span>
                            )}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-200 rounded-full">
                          <div 
                            className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`} 
                            style={{ 
                              width: passwordStrength === 'weak' 
                                ? '30%' 
                                : passwordStrength === 'medium' 
                                  ? '60%' 
                                  : '100%' 
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordFields.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Confirm new password"
                    />
                    
                    {passwordFields.newPassword && passwordFields.confirmPassword && (
                      passwordFields.newPassword !== passwordFields.confirmPassword ? (
                        <p className="mt-1 text-sm text-red-500">Passwords don't match</p>
                      ) : (
                        <p className="mt-1 text-sm text-green-500">Passwords match</p>
                      )
                    )}
                  </div>

                  <div className="mt-2">
                    <button 
                      className="btn-primary"
                      disabled={
                        !passwordFields.currentPassword || 
                        !passwordFields.newPassword ||
                        !passwordFields.confirmPassword ||
                        passwordFields.newPassword !== passwordFields.confirmPassword
                      }
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </Card>

              <Card>
                <h2 className="text-lg font-semibold mb-6">Two-Factor Authentication</h2>
                
                <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <input
                      id="twoFactor"
                      type="checkbox"
                      checked={user.twoFactorEnabled}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="twoFactor" className="font-medium text-gray-700">Enable two-factor authentication</label>
                    <p className="text-gray-500">Add an extra layer of security to your account using an authentication app.</p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
                  <FaShieldAlt className="text-yellow-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Security Recommendation</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      We strongly recommend enabling two-factor authentication for enhanced account security.
                    </p>
                    <button className="btn-secondary mt-3">Setup Two-Factor Authentication</button>
                  </div>
                </div>
              </Card>
            </>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <h2 className="text-lg font-semibold mb-6">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="emailAlerts"
                      type="checkbox"
                      checked={notificationSettings.emailAlerts}
                      onChange={() => handleToggleNotification('emailAlerts')}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="emailAlerts" className="font-medium text-gray-700">Email Alerts</label>
                    <p className="text-gray-500">Receive notifications via email for important account activities.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="applicationUpdates"
                      type="checkbox"
                      checked={notificationSettings.applicationUpdates}
                      onChange={() => handleToggleNotification('applicationUpdates')}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="applicationUpdates" className="font-medium text-gray-700">Application Updates</label>
                    <p className="text-gray-500">Get notified when applications are updated or change status.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="securityAlerts"
                      type="checkbox"
                      checked={notificationSettings.securityAlerts}
                      onChange={() => handleToggleNotification('securityAlerts')}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="securityAlerts" className="font-medium text-gray-700">Security Alerts</label>
                    <p className="text-gray-500">Receive notifications about important security events.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="systemMessages"
                      type="checkbox"
                      checked={notificationSettings.systemMessages}
                      onChange={() => handleToggleNotification('systemMessages')}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="systemMessages" className="font-medium text-gray-700">System Messages</label>
                    <p className="text-gray-500">Get updates about system maintenance and downtime.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="marketingMessages"
                      type="checkbox"
                      checked={notificationSettings.marketingMessages}
                      onChange={() => handleToggleNotification('marketingMessages')}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="marketingMessages" className="font-medium text-gray-700">Marketing Messages</label>
                    <p className="text-gray-500">Receive updates about new features and services.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <button className="btn-primary">Save Notification Settings</button>
              </div>
            </Card>
          )}

          {activeTab === 'sessions' && (
            <Card>
              <h2 className="text-lg font-semibold mb-6">Active Sessions</h2>
              
              <div className="space-y-4">
                {activeSessions.map(session => (
                  <div key={session.id} className={`border rounded-lg p-4 ${session.isCurrent ? 'border-primary-300 bg-primary-50' : 'border-gray-200'}`}>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full ${session.isCurrent ? 'bg-primary-100' : 'bg-gray-100'}`}>
                          <FaGlobe className={session.isCurrent ? 'text-primary-600' : 'text-gray-600'} />
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">{session.device}</div>
                          <div className="text-sm text-gray-500">{session.ipAddress} • {session.location}</div>
                        </div>
                      </div>
                      {session.isCurrent ? (
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full h-fit">
                          Current Session
                        </span>
                      ) : (
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                          Terminate
                        </button>
                      )}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Last active: {session.lastActive}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <button className="text-red-600 hover:text-red-800 font-medium">
                  Sign Out From All Devices
                </button>
              </div>
            </Card>
          )}

          {activeTab === 'audit' && (
            <Card>
              <h2 className="text-lg font-semibold mb-6">Account Activity Log</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-600 text-sm">
                    <tr>
                      <th className="px-4 py-3 rounded-tl-lg">Action</th>
                      <th className="px-4 py-3">Timestamp</th>
                      <th className="px-4 py-3">IP Address</th>
                      <th className="px-4 py-3 rounded-tr-lg">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{log.action}</td>
                        <td className="px-4 py-3">{log.timestamp}</td>
                        <td className="px-4 py-3">{log.ipAddress}</td>
                        <td className="px-4 py-3">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 text-center">
                <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                  View Complete History
                </button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
