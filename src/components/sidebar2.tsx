import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    // Remove credentials from localStorage directly
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="w-64 bg-gradient-to-b from-blue-800 to-purple-800 text-white h-screen shadow-lg flex flex-col justify-between pb-4">
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'bg-green-400',
            warning: 'bg-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
      <div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        </div>
        <nav className="px-4">
          <ul className="space-y-4">
            <li><Link to="" className="block py-2 px-4 rounded hover:bg-blue-700">Dashboard</Link></li>
            <li><Link to="users" className="block py-2 px-4 rounded hover:bg-blue-700">Users</Link></li>
            <li><Link to="cars" className="block py-2 px-4 rounded hover:bg-blue-700">Vehicles</Link></li>
            <li><Link to="vehicleSpecifications" className="block py-2 px-4 rounded hover:bg-blue-700">Vehicles Specifications</Link></li>
            <li>
              <details className="group">
                <summary className="block py-2 px-4 rounded hover:bg-blue-700 cursor-pointer">
                  Bookings History
                </summary>
                <ul className="pl-4 space-y-2 mt-2">
                  <li><Link to="bookings" className="block py-2 px-4 rounded hover:bg-blue-700">Bookings</Link></li>
                  <li><Link to="bookingByUserId" className="block py-2 px-4 rounded hover:bg-blue-700">Bookings History</Link></li>
                </ul>
              </details>
            </li>
            <li><Link to="payments" className="block py-2 px-4 rounded hover:bg-blue-700">Revenue</Link></li>
            <li><Link to="fleet" className="block py-2 px-4 rounded hover:bg-blue-700">Fleet Management</Link></li>
            <li><Link to="tickets" className="block py-2 px-4 rounded hover:bg-blue-700">Customer Tickets</Link></li>
            <li><Link to="cloudinaryForm" className="block py-2 px-4 rounded hover:bg-blue-700">Upload Vehicles Images</Link></li>
            <li><Link to="locations" className="block py-2 px-4 rounded hover:bg-blue-700">Locations & Branches</Link></li>
            <li><Link to="cloudinary" className="block py-2 px-4 rounded hover:bg-blue-700">Settings</Link></li>
          </ul>
        </nav>
      </div>
      <div className="p-4">
        <button onClick={handleLogOut} className="w-full py-2 text-center rounded bg-red-600 hover:bg-red-700 text-white">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
