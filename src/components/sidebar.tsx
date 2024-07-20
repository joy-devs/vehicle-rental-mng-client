import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="fixed inset-y-0 left-0 bg-blue-400 shadow-lg z-50 w-64">
      <div className="flex items-center justify-center p-4 border-b border-gray-300">
        <a className="btn btn-ghost normal-case text-black text-xl">User Dashboard</a>
      </div>
      <ul className="menu p-4 overflow-y-auto">
        <li><Link to="/vehicleList" className="text-blue-950 text-xl hover:underline">Vehicles</Link></li>
        <li><Link to="/bookings" className="text-blue-950 text-xl hover:underline">Bookings</Link></li>
        <li><Link to="/profile" className="text-blue-950 text-xl hover:underline">Profile</Link></li>
        <li><Link to="/account" className="text-blue-950 text-xl hover:underline">Account Settings</Link></li>
        <li><Link to="/support" className="text-blue-950 text-xl hover:underline">Support</Link></li>
        <li><Link to="/logout" className="text-blue-950 text-xl hover:underline">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
