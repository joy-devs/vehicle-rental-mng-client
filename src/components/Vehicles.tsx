import React from 'react';
import FordImage from '../assets/Ford E2.jpg';
import AudiImage from '../assets/Audi A42.jpg';
import TeslaImage from '../assets/Tesla img2.jpg';
import BMWImage from '../assets/BMW x5 2.jpg';
import ToyotaImage from '../assets/Toyota model4 2.jpg';
import ToyotacamryImage from '../assets/Toyota camry.jpg';

interface Vehicle {
  id: number;
  name: string;
  image: string;
  specifications: string; // Add specifications property
}

const Vehicles: React.FC = () => {
  const vehicles: Vehicle[] = [
    { id: 1, name: 'Ford Explorer', image: FordImage, specifications: 'Tow-package, Third-row-sitting' },
    { id: 2, name: 'Audi A4', image: AudiImage, specifications: 'Ambient-lighting, Wireless charging' },
    { id: 3, name: 'Tesla Model 3', image: TeslaImage, specifications: 'Autopilot, self-driving' },
    { id: 4, name: 'BMW X5', image: BMWImage, specifications: 'Leather-seats, panoramic-roofs' },
    { id: 5, name: 'Toyota Model 4 ', image: ToyotaImage, specifications: 'Ambient-lighting,' },
    { id: 6, name: 'Toyota Camry', image: ToyotacamryImage, specifications: 'power- steering, air conditioner' },
    // Add more vehicles as needed
    // { id: 7, name: 'New Vehicle Name', image: NewVehicleImage, specifications: 'Specifications about New Vehicle' },
  ];

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="card  shadow-xl">
            <figure className="px-10 pt-10">
              <img src={vehicle.image} alt={vehicle.name} className="rounded-xl h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-blue-950">{vehicle.name}</h2>
              <p className="text-sm text-black">{vehicle.specifications}</p> {/* Display specifications */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
