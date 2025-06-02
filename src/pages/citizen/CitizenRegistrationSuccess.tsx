import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import AuthLayout from '../../components/citizen/layout/AuthLayout';

const CitizenRegistrationSuccess = () => {
  return (
    <AuthLayout 
      title="Registration Successful!" 
    >
      <div className="text-center py-4">
        <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <p className="mt-4 text-lg font-medium text-gray-900">
          Your account has been created successfully
        </p>
        <p className="mt-2 text-gray-600">
          We've sent a verification email to your inbox. 
          Please verify your email address to continue.
        </p>
        <div className="mt-8 flex flex-col space-y-3">
          <Link 
            to="/citizen/login" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Sign In Now
          </Link>
          <Link 
            to="/"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default CitizenRegistrationSuccess;
