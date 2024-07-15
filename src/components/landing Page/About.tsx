import React from 'react';
import Teslaimg2 from '../landing Page/Images/Tesla img2.jpg';

const AboutUs: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 rounded-lg shadow-lg">
      <div className="flex flex-row items-center w-full h-full p-8">
        <div className="w-1/2 h-full pr-6 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-6 text-gray-800">
            About Elite Rides Rental Management System
          </h1>
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            At Elite Rides, we specialize in providing a premium vehicle rental experience that exceeds expectations. Our mission is to offer hassle-free rentals with a focus on safety, comfort, and customer satisfaction.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Explore our diverse fleet of vehicles, including luxurious sedans, spacious SUVs, and efficient hybrids, all meticulously maintained to ensure reliability and performance. Whether you need a car for a weekend getaway or a long-term rental solution, Elite Rides has you covered.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Join us at Elite Rides and experience the convenience and luxury of seamless travel. Welcome to a new standard in vehicle rental excellence.
          </p>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center">
          <img src={Teslaimg2} alt="Tesla" className="max-h-full rounded-lg object-cover" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
