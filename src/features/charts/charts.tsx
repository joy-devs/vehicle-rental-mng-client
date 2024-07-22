import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
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

const Dashboard: React.FC = () => {
  // Hardcoded values for car statistics
  const totalCars = 100;
  const availableCars = 60;
  const rentedCars = 40;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">Vehicle Rental Management System Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card bg-base-100 shadow-xl p-6 border-t-4 border-primary">
          <h2 className="card-title text-xl font-semibold mb-4">Revenue Chart</h2>
          <Bar data={data} options={options} />
        </div>
        <div className="card bg-base-100 shadow-xl p-6 border-t-4 border-secondary">
          <h2 className="card-title text-xl font-semibold mb-4">Car Statistics</h2>
          <div className="stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
              <div className="stat-title">Total Cars</div>
              <div className="stat-value text-primary">{totalCars}</div>
              <div className="stat-desc">Total cars in the fleet</div>
            </div>
            <div className="stat">
              <div className="stat-title">Available Cars</div>
              <div className="stat-value text-secondary">{availableCars}</div>
              <div className="stat-desc">Cars available for rent</div>
            </div>
            <div className="stat">
              <div className="stat-title">Rented Cars</div>
              <div className="stat-value text-accent">{rentedCars}</div>
              <div className="stat-desc">Cars currently rented out</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
