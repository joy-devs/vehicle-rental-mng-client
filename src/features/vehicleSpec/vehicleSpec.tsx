import React, { useState } from 'react';
import {
  useFetchVehicleSpecificationsQuery,
  useAddVehicleSpecificationMutation,
  useUpdateVehicleSpecificationMutation,
  useDeleteVehicleSpecificationMutation,
} from './vehicleSpecApi';
import { Toaster, toast } from 'sonner';
import VehicleSpecificationForm from '../../components/specificationForm';
import ActionButton from '../../components/ActionButton';
import { getRandomImage } from '../../components/images';

export interface TVehicleSpecification {
  vehicleSpec_id: number;
  vehicle_id: number;
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;
}

const VehicleSpecifications: React.FC = () => {
  const { data, error, isLoading, refetch } = useFetchVehicleSpecificationsQuery();
  const [addVehicleSpecification] = useAddVehicleSpecificationMutation();
  const [updateVehicleSpecification] = useUpdateVehicleSpecificationMutation();
  const [deleteVehicleSpecification] = useDeleteVehicleSpecificationMutation();

  const [formState, setFormState] = useState<Partial<TVehicleSpecification>>({
    vehicle_id: 0,
    manufacturer: '',
    model: '',
    year: 0,
    fuel_type: '',
    engine_capacity: '',
    transmission: '',
    seating_capacity: 0,
    color: '',
    features: '',
  });

  const [selectedSpec, setSelectedSpec] = useState<null | TVehicleSpecification>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async () => {
    try {
      await addVehicleSpecification(formState).unwrap();
      toast.success('Vehicle specification added successfully');
      setFormState({
        vehicle_id: 0,
        manufacturer: '',
        model: '',
        year: 0,
        fuel_type: '',
        engine_capacity: '',
        transmission: '',
        seating_capacity: 0,
        color: '',
        features: '',
      });
      refetch();
    } catch (error) {
      toast.error('Failed to add vehicle specification');
    }
  };

  const handleUpdate = async (vehicleSpec_id: number) => {
    try {
      const updateVehicleData = {
        ...formState,
        vehicleSpec_id,
      };
      await updateVehicleSpecification(updateVehicleData).unwrap();
      toast.success('Vehicle specification updated successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to update vehicle specification');
    }
  };

  const handleDelete = async (vehicleSpec_id: number) => {
    try {
      await deleteVehicleSpecification(vehicleSpec_id).unwrap();
      toast.success('Vehicle specification deleted successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to delete vehicle specification');
    }
  };

  const handleCardClick = (spec: TVehicleSpecification) => {
    setSelectedSpec(spec);
  };

  const handleBackToList = () => {
    setSelectedSpec(null);
  };

  // const getImageForSpec = (model: string) => {
  //   if (model.toLowerCase() === 'tesla') {
  //     return TeslaImage;
  //   }
  //   // Add more images here if needed
  //   return `https://via.placeholder.com/300x200?text=${encodeURIComponent(model)}`;
  // };

  // const getRandomImage = () => {
  //   // Replace with the actual logic to get a random image URL
  //   return 'https://via.placeholder.com/350x250';
  // };

  console.log('Data:', data);
  console.log('Error:', error);
  console.log('Is Loading:', isLoading);

  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
      <div className="min-h-screen bg-gray-800 text-white p-6 h-screen overflow-y-auto">
        <h1 className="text-2xl mb-6">Vehicle Specifications</h1>
        <VehicleSpecificationForm formState={formState} handleChange={handleChange} handleCreate={handleCreate} />
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading data</p>
        ) : selectedSpec ? (
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <button
              onClick={handleBackToList}
              className="mb-4 px-4 py-2 bg-orange-400 text-white font-semibold rounded shadow hover:bg-blue-600 transition duration-300"
            >
              Back to List
            </button>
            {/* <img
              src={getRandomImage()}
              alt={`${selectedSpec.manufacturer} ${selectedSpec.model}`}
              className="w-full h-96 object-cover mb-4 rounded transition-transform duration-300 ease-in-out"
            /> */}
            <img
              height="250px"
              width="350px"
              src={getRandomImage()}
              alt={`${selectedSpec.model} image`}
              className="w-full h-96 object-cover mb-4 rounded transition-transform duration-300 ease-in-out"
            />
            <h2 className="text-xl font-bold mb-4 text-center">
              {selectedSpec.manufacturer} {selectedSpec.model}
            </h2>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between mb-1">
                <span className="font-semibold">Vehicle ID:</span>
                <span className="text-blue-300">{selectedSpec.vehicle_id}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold">Year:</span>
                <span className="text-blue-300">{selectedSpec.year}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold">Fuel Type:</span>
                <span className="text-blue-300">{selectedSpec.fuel_type}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold">Engine Capacity:</span>
                <span className="text-blue-300">{selectedSpec.engine_capacity}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold">Transmission:</span>
                <span className="text-blue-300">{selectedSpec.transmission}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold">Seating Capacity:</span>
                <span className="text-blue-300">{selectedSpec.seating_capacity}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold">Color:</span>
                <span className="text-blue-300">{selectedSpec.color}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold">Features:</span>
                <span className="text-blue-300">{selectedSpec.features}</span>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <ActionButton label="Update" onClick={() => handleUpdate(selectedSpec.vehicleSpec_id)} color="blue" />
              <ActionButton label="Delete" onClick={() => handleDelete(selectedSpec.vehicleSpec_id)} color="red" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data &&
              data.map((spec: TVehicleSpecification) => {
                const imageUrl = getRandomImage();

                return (
                  <div
                    key={spec.vehicleSpec_id}
                    className="bg-gray-700 p-6 rounded-lg shadow-lg cursor-pointer"
                    onClick={() => handleCardClick(spec)}
                  >
                    <img
                      src={imageUrl}
                      alt={`${spec.manufacturer} ${spec.model}`}
                      className="w-full h-40 object-cover mb-4 rounded transition-transform duration-300 ease-in-out"
                    />
                    <h2 className="text-lg font-bold mb-2">
                      {spec.manufacturer} {spec.model}
                    </h2>
                    <p className="text-gray-400">Year: {spec.year}</p>
                    <p className="text-gray-400">Fuel Type: {spec.fuel_type}</p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default VehicleSpecifications;
