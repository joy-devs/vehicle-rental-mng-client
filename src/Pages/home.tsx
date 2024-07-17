import React from 'react';
import Navbar from '../components/Navbar';
import Car from '../components/featuredvehicles'
// import Vehicles from './Vehicles'

import Footer from '../components/Footer';
import Vehicles from '../components/Vehicles';


const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Car />
      
      <Vehicles />
      <Footer />
    </>
  );
};

export default Home;
