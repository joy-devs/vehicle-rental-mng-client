import React from 'react';
import { Link } from 'react-router-dom';

const Logout: React.FC = () => {
    localStorage.removeItem('accessToken'); 
    localStorage.removeItem('refreshToken'); 
    window.location.href = '/login';


  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold">Elite Rides Rental Management System</div>
        <div>
          <Link to="/logout" className="btn btn-secondary">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Logout;
