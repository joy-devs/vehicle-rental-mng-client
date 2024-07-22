import React from 'react';
import { XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();

  const handleRetryPayment = () => {
    navigate('/dashboard'); // Change this to your payment route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-400 via-yellow-500 to-orange-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <XCircle className="w-16 h-16 mx-auto text-red-500" />
        <h1 className="text-3xl font-bold text-red-500 mt-4">Payment Cancelled</h1>
        <p className="mt-4 text-gray-600">Your payment has been cancelled. If you encountered an issue, please try again.</p>
        <button
          onClick={handleRetryPayment}
          className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition duration-300"
        >
          Retry Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;