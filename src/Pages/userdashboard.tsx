import React from 'react';
import Navbar from '../components/navbar2';
import Sidebar from '../components/sidebar';
import JoyDashboard from '../components/userchart';


const Userdashboard: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar  />
      <div className="flex flex-1 bg-blue-600 text-white shadow-md">
        <Sidebar  />
        <div className="flex-1 p-6 bg-white text-white w-64">
         <JoyDashboard /> 
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;
