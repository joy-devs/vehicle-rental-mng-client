import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/userdashboard'); // Change this to your dashboard route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600">
      <div className="bg-red-200 p-8 rounded-lg shadow-2xl w-full max-w-lg text-center">
        <CheckCircle className="w-16 h-16 mx-auto text-teal-500" />
        <h1 className="text-3xl font-bold text-teal-500 mt-4">Payment Successful!</h1>
        <p className="mt-4 text-gray-600">Thank you for your payment. Your transaction has been completed successfully.</p>
        <button
          onClick={handleGoToDashboard}
          className="mt-6 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full transition duration-300 shadow-md transform hover:scale-105"
        >
          Go to userDashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
