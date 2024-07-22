import React from 'react';
import OverviewCards from '../components/overviewCards';
import Sidebar from '../components/sidebar2';

const Dashboard: React.FC = () =>{
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <OverviewCards />
        
      </div>
    </div>
  );
};

export default Dashboard;
