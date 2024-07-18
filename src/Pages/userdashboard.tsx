import React from 'react';
import Navbar from '../components/navbar2';
import Sidebar from '../components/sidebar';

const Userdashboard: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6">
          {/* Main content goes here */}
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;
