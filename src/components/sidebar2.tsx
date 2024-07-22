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
    <div className="w-64 bg-gray-300 shadow-md h-screen overflow-y-auto">
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      </div>
      <nav className="p-4">
        <ul className="menu font-semibold text-lg w-[200px] gap-5 min-h-full text-black">
          <li><Link to="">Dashboard</Link></li>
          <li><Link to="users">Users</Link></li>
          <li><Link to="vehicles">Vehicles</Link></li>
          <li><Link to="vehiclesSpecifications">Vehicles Specifications</Link></li>
          <li>
            <details>
              <summary>Bookings History</summary>
              <ul>
                <li><Link to="bookings">Bookings</Link></li>
                <li><Link to="bookingByUserId">Bookings History</Link></li>
              </ul>
            </details>
          </li>
          <li><Link to="payments">Revenue</Link></li>
          <li><Link to="fleetManagement">Fleet Management</Link></li>
          <li><Link to="ticket">Customer Tickets</Link></li>
          <li><Link to="cloudinaryform">Upload Vehicles Images</Link></li>
          <li><Link to="locations">Locations & Branches</Link></li>
          <li><Link to="cloudinary">Settings</Link></li>
        </ul>
      </nav>
      <div className="p-4">
        <button onClick={handleLogOut} className="text-red-700 hover:text-blue-600">Log Out</button>
      </div>
    </div>
  );
};

export default Sidebar;
