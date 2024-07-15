import React from 'react';
import Navbar from './Navbar';
import Car from './featured'
// import Vehicles from './Vehicles'
import Login from './login';
import Footer from './Footer';


const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Car />
      {/* <h1 className="text-2xl font-bold text-center mt-8 mb-12">Welcome to Elite Rides, your premier destination for hassle-free vehicle rentals. Whether you're planning a weekend getaway or need a reliable ride for your daily commute.

Explore our diverse fleet of vehicles, from sleek sedans to spacious SUVs, all meticulously maintained to ensure your safety and comfort. With easy booking, flexible rental options, and exceptional customer service, Elite Rides is your trusted partner. Welcome aboard!</h1> */}
      {/* <Vehicles /> */}
      <Login />
      <Footer />
    </>
  );
};

export default Home;
