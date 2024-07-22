import React from 'react';
import Navbar from '../components/adminnavbar';
import Sidebar from '../components/sidebar2';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const ADashBoard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar  />
        <div className="flex-1 p-4 bg-gray-100">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ADashBoard;
