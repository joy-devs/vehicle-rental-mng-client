import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Revenue',
      data: [12000, 15000, 8000, 17000, 14000, 20000, 22000],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Monthly Revenue',
    },
  },
};

const JoyDashboard: React.FC = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [currentBookings, setCurrentBookings] = useState(0);
  const [pastBookings, setPastBookings] = useState(0);

  useEffect(() => {
    // Fetch user-specific booking data from API
    axios.get('http://localhost:8000/api/bookings/user')
      .then(response => {
        const bookings = response.data;
        const current = bookings.filter((booking: any) => new Date(booking.endDate) >= new Date()).length;
        const past = bookings.length - current;
        setTotalBookings(bookings.length);
        setCurrentBookings(current);
        setPastBookings(past);
      })
      .catch(error => {
        console.error("There was an error fetching the bookings data!", error);
      });
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidenav */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <ul>
          <li className="mb-2"><a href="#dashboard" className="text-white">Dashboard</a></li>
          <li className="mb-2"><a href="#bookings" className="text-white">Bookings</a></li>
          <li className="mb-2"><a href="#profile" className="text-white">Profile</a></li>
          <li className="mb-2"><a href="#settings" className="text-white">Settings</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-gray-700 text-white p-4">
          <h1 className="text-3xl font-bold">Joy's Dashboard</h1>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <p className="text-xl text-center mb-8">Welcome back, Joy! Here's an overview of your activities.</p>
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <div className="card bg-base-100 shadow-xl p-6 border-t-4 border-secondary">
              <h2 className="card-title text-xl font-semibold mb-4">Booking Statistics</h2>
              <div className="stats stats-vertical lg:stats-horizontal shadow">
                <div className="stat">
                  <div className="stat-title">Total Bookings</div>
                  <div className="stat-value text-primary">{totalBookings}</div>
                  <div className="stat-desc">Total bookings made</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Current Bookings</div>
                  <div className="stat-value text-secondary">{currentBookings}</div>
                  <div className="stat-desc">Bookings currently active</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Past Bookings</div>
                  <div className="stat-value text-accent">{pastBookings}</div>
                  <div className="stat-desc">Completed bookings</div>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl p-6 border-t-4 border-primary">
              <h2 className="card-title text-xl font-semibold mb-4">Revenue Chart</h2>
              <div className="w-full h-80">
                <Bar data={data} options={options} />
              </div>
            </div>
          </div>
          <div className="mt-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4 text-primary">My Bookings</h2>
            {/* Display current bookings and past bookings here */}
            {/* Add your booking display logic here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoyDashboard;
