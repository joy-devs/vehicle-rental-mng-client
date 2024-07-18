import React from 'react';
import FordImage from '../assets/Ford E2.jpg';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <div className="container mx-auto py-12 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900">About Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            Learn more about Elite Rides and our mission to provide top-quality rental services.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 flex flex-col lg:flex-row items-center">
          <img
            src={FordImage}
            alt="Ford E2"
            className="w-full lg:w-1/3 rounded-lg mb-8 lg:mb-0 lg:mr-8"
          />
          <div>
            <h2 className="text-2xl font-semibold text-blue-700">Our Mission</h2>
            <p className="mt-4 text-gray-600">
              At Elite Rides, our mission is to provide the best car rental experience with top-quality vehicles and exceptional customer service. We strive to make every ride an elite experience.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-red-400 rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-blue-700">Quality Vehicles</h3>
            <p className="mt-4 text-gray-600">
              We offer a wide range of high-quality vehicles to suit all your needs, from compact cars to luxury sedans.
            </p>
          </div>
          <div className="bg-orange-400 rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-blue-700">Exceptional Service</h3>
            <p className="mt-4 text-gray-600">
              Our team is dedicated to providing exceptional customer service to ensure a smooth rental experience.
            </p>
          </div>
          <div className="bg-amber-300 rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-blue-700">Affordable Rates</h3>
            <p className="mt-4 text-gray-600">
              We offer competitive rates and flexible rental options to fit your budget and schedule.
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2024 Elite Rides Rental Management System. All rights reserved.</p>
        <p>Contact us: lilian@gmail.com | +1234567890</p>
      </footer>
    </div>
  );
};

export default AboutUs;
