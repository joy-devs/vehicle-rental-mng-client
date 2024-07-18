import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-purple-700 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">Elite Rides</h2>
      <ul>
        <li className="mb-4">
          <Link to="/" className="flex items-center text-lg">
            <span className="material-icons mr-2"></span>
            Dashboard
          </Link>
        </li>
        {/* Add more sidebar items here */}
      </ul>
    </div>
  );
};

export default Sidebar;
