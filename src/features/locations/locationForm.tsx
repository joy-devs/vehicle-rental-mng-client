import React, { useState } from 'react';
import { TLocation } from './locationApi';

interface LocationFormProps {
  onCreate: (location: Partial<TLocation>) => void;
}

const LocationForm: React.FC<LocationFormProps> = ({ onCreate }) => {
  const [newLocation, setNewLocation] = useState<Partial<TLocation>>({
    name: '',
    address: '',
    contact_phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewLocation({
      ...newLocation,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(newLocation);
    setNewLocation({
      name: '',
      address: '',
      contact_phone: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={newLocation.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="address"
          value={newLocation.address}
          onChange={handleInputChange}
          placeholder="Address"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="contact_phone"
          value={newLocation.contact_phone}
          onChange={handleInputChange}
          placeholder="Contact Phone"
          className="input input-bordered w-full"
        />
      </div>
      <button type="submit" className="btn btn-sm btn-outline btn-success mt-4">Add Location</button>
    </form>
  );
};

export default LocationForm;