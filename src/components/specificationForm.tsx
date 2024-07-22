import React from 'react';
import { VehicleSpecification } from '../features/vehicleSpec/vehicleSpecApi';

interface VehicleSpecificationFormProps {
  formState: Partial<VehicleSpecification>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleCreate: () => void;
}

const VehicleSpecificationForm: React.FC<VehicleSpecificationFormProps> = ({ formState, handleChange, handleCreate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <input
        type="number"
        name="vehicle_id"
        placeholder="Vehicle ID"
        value={formState.vehicle_id}
        onChange={handleChange}
        className="p-2 rounded border border-gray-400"
      />
      <input
        type="text"
        name="manufacturer"
        placeholder="Manufacturer"
        value={formState.manufacturer}
        onChange={handleChange}
        className="p-2 rounded border border-gray-400"
      />
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={formState.model}
        onChange={handleChange}
        className="p-2 rounded border border-gray-400"
      />
      <input
        type="number"
        name="year"
        placeholder="Year"
        value={formState.year}
        onChange={handleChange}
        className="p-2 rounded border border-gray-400"
      />
      <input
        type="text"
        name="fuel_type"
        placeholder="Fuel Type"
        value={formState.fuel_type}
        onChange={handleChange}
        className="p-2 rounded border border-gray-400"
      />
      <input
        type="text"
        name="engine_capacity"
        placeholder="Engine Capacity"
        value={formState.engine_capacity}
        onChange={handleChange}
        className="p-2 rounded border border-gray-400"
      />
      <input
        type="text"
        name="transmission"
        placeholder="Transmission"
        value={formState.transmission}
        onChange={handleChange}
        className="p-2 rounded border border-gray-400"
      />
      <input
        type="number"
        name="seating_capacity"
        placeholder="Seating Capacity"
        value={formState.seating_capacity}
        onChange={handleChange}
        className="p-2 rounded border border-gray-400"
      />
      <input
        type="text"
        name="color"
        placeholder="Color"
        value={formState.color}
        onChange={handleChange}
        className="p-2 rounded border border-gray-400"
      />
      <input
        type="text"
        name="features"
        placeholder="Features"
        value={formState.features}
        onChange={handleChange}
        className="p-2 rounded border border-gray-400"
      />
      <button
        onClick={handleCreate}
        className="p-2 rounded bg-green-500 hover:bg-green-600 transition duration-300"
      >
        Add Specification
      </button>
    </div>
  );
};

export default VehicleSpecificationForm;