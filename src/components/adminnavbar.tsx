// Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-lg font-bold">
            <Link to="/" className="hover:text-gray-300">Elite Rides Admin</Link>
          </div>
          <div>
            <button className="btn btn-error">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
