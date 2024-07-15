import React from 'react';
import FordImage from '../landing Page/Images/Ford E.jpg';
import AudiImage from '../landing Page/Images/Audi A 4.png';
import TeslaImage from '../landing Page/Images/Tesla M3.jpeg';
import BMWImage from '../landing Page/Images/BMW x5.jpeg';

const Vehicles: React.FC = () => {
  return (
    <>
      <div className="carousel w-full bg-black">
        <div id="Ford" className="carousel-item max-w-md">
          <img
            src={FordImage}
            alt="Ford E"
            className="w-full h-auto min-h-80"
          />
        </div>
        <div id="Audi" className="carousel-item max-w-md">
          <img
            src={AudiImage}
            alt="Audi A4"
            className="w-full h-auto max-h-72"
          />
        </div>
        <div id="Tesla" className="carousel-item max-w-md">
          <img
            src={TeslaImage}
            alt="Tesla Model 3"
            className="w-full h-auto max-h-72"
          />
        </div>
        <div id="BMW" className="carousel-item max-w-md">
          <img
            src={BMWImage}
            alt="BMW X5"
            className="w-full h-auto max-h-72"
          />
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        <a href="#Ford" className="btn btn-xs">1</a>
        <a href="#Audi" className="btn btn-xs">2</a>
        <a href="#Tesla" className="btn btn-xs">3</a>
        <a href="#BMW" className="btn btn-xs">4</a>
      </div>
    </>
  );
};

export default Vehicles;
