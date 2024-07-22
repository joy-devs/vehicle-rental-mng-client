import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/dashboard'); // Change this to your dashboard route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
        <h1 className="text-3xl font-bold text-green-500 mt-4">Payment Successful!</h1>
        <p className="mt-4 text-gray-600">Thank you for your payment. Your transaction has been completed successfully.</p>
        <button
          onClick={handleGoToDashboard}
          className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition duration-300"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;