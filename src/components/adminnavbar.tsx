// Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-lg font-bold flex justify-center items-center h-full">
            <Link to="/" className="hover:text-gray-300 text-center">Elite Rides Admin</Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
