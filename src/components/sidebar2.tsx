// Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen">
      <div className="flex flex-col p-4 space-y-4">
        <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/manage-vehicles" className="hover:text-gray-300">Manage Vehicles</Link>
        <Link to="/manage-users" className="hover:text-gray-300">Manage Users</Link>
        <Link to="/reports" className="hover:text-gray-300">Reports</Link>
        <Link to="/locations" className="hover:text-gray-300">Locations & Branches</Link>
        <Link to="/support-tickets" className="hover:text-gray-300">Customer Support</Link>
        <Link to="/fleet-management" className="hover:text-gray-300">Fleet Management</Link>
      </div>
    </div>
  );
};

export default Sidebar;
