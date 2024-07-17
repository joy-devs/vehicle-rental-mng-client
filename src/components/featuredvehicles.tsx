import React from 'react';
import { Link } from 'react-router-dom';
import Teslaimg2 from '../assets/Tesla img2.jpg';



const Car: React.FC = () => {
  return (
    <div className="relative h-screen w-full ">
      <div className="absolute inset-0">
        <img src={Teslaimg2} alt="Tesla img2" className="w-full h-full object-cover " />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 bg-black bg-opacity-30">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold">Elite Rides Car Rental</h1>
          <p className="mt-4 text-lg">Fast, Elegant, and Reliable</p>
          <p className="mt-2">Experience top-notch car rental services worldwide</p>
          <p className="mt-2">Unmatched quality and performance, 2024</p>
        </div>
        <div className="mt-10 flex space-x-4">
          <Link to="/about">
            <button className="btn btn-primary">About Us</button>
          </Link>
          {/* <button className="btn btn-outline text-white">Watch Video</button> */}
        </div>
      </div>
      <div className="absolute top-1/4 left-10 z-10 p-4 bg-black bg-opacity-75 rounded-lg shadow-lg">
        <p className="text-white font-semibold">FEATURED</p>
        <p className="text-gray-300">TOP PERFORMANCE</p>
        <p className="mt-2 text-gray-300">Experience the power of elite vehicles</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-white">Ford E</span>
          <span className="text-xl font-bold text-white">$8750.00</span>
        </div>
      </div>
    </div>
  );
};

export default Car;
