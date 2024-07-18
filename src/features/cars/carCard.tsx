import React, { useEffect } from "react";
import carApi from "./carsApi";
import { ScaleLoader } from "react-spinners";

const Car: React.FC = () => {
  const [ data, error, isLoading ] = carApi.useGetVehiclesQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ScaleLoader color="#0000ff" loading={true} height={20} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Failed to fetch vehicle data.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center">
      {data?.map((vehicle: any) => (
        <div key={vehicle.id} className="card w-80 bg-base-100 shadow-xl m-4">
          <figure>
            <img src={vehicle.image} alt={vehicle.model} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{vehicle.model}</h2>
            <p>{vehicle.specifications}</p>
            <p>{vehicle.location}</p>
            <p>{vehicle.availability ? "Available" : "Not Available"}</p>
            <p>Engine: {vehicle.engine}</p>
            <p>Transmission: {vehicle.transmission}</p>
            <p>Fuel Type: {vehicle.fuelType}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Car;
