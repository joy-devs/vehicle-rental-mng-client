
import React, { useEffect, useState } from 'react';
import {
  useFetchVehiclesQuery,
  useFetchVehicleByIdQuery,
  useAddVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation
} from './vehicleApi'
 
const VehicleList: React.FC = () => {
  const { data: vehicles = [], isLoading, error, refetch } = useFetchVehiclesQuery();
  const [addVehicle] = useAddVehicleMutation();
  const [updateVehicle] = useUpdateVehicleMutation();
  const [deleteVehicle] = useDeleteVehicleMutation();
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);
  const { data: selectedVehicle, error: vehicleError, isLoading: vehicleLoading } = useFetchVehicleByIdQuery(selectedVehicleId!, {
    skip: selectedVehicleId === null, 
  });
 
  const initialVehicleState = { vehicle_id: 0, rental_rent: 0, availability: 'available' };
  const [newVehicle, setNewVehicle] = useState(initialVehicleState);
  const [editMode, setEditMode] = useState(false);
 
  
  const fetchVehiclesAndUpdateStorage = async () => {
    try {
      await refetch();
      localStorage.setItem('vehicles', JSON.stringify(vehicles));
    } catch (error) {
      console.error('Failed to refetch vehicles:', error);
    }
  };
 
  useEffect(() => {
    fetchVehiclesAndUpdateStorage();
  }, []); 
 
  const handleAddVehicle = async () => {
    try {
      await addVehicle(newVehicle).unwrap();
      setNewVehicle(initialVehicleState); // Reset the form after adding vehicle
      fetchVehiclesAndUpdateStorage(); // Fetch vehicles after adding new vehicle
    } catch (err) {
      console.error('Failed to add vehicle:', err);
    }
  };
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewVehicle((prevVehicle) => ({ ...prevVehicle, [name]: value }));
  };
 
  const handleUpdateVehicle = async () => {
    try {
      if (!newVehicle.vehicle_id) {
        console.error('No vehicle ID found for update.');
        return;
      }
      await updateVehicle(newVehicle).unwrap();
      setNewVehicle(initialVehicleState);
      setEditMode(false);
      fetchVehiclesAndUpdateStorage(); // Fetch vehicles after updating vehicle
    } catch (error) {
      console.error('Failed to update vehicle:', error);
    }
  };
 
  const handleEditVehicle = (vehicle: any) => {
    setNewVehicle(vehicle);
    setEditMode(true);
  };
 
  const handleDeleteVehicle = async (id: number) => {
    try {
      await deleteVehicle(id).unwrap();
      fetchVehiclesAndUpdateStorage(); // Fetch vehicles after deleting vehicle
    } catch (error) {
      console.error('Failed to delete vehicle', error);
    }
  };
 
  const handleViewVehicle = (id: number) => {
    setSelectedVehicleId(id);
  };
 
  if (isLoading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div>Error: {error.message}</div>;
  }
 
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vehicles List</h1>
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="number"
          name="rental_rent"
          placeholder="Rental Rent"
          value={newVehicle.rental_rent}
          onChange={handleInputChange}
          className="input input-bordered w-full mb-2"
        />
        <select
          name="availability"
          value={newVehicle.availability}
          onChange={handleInputChange}
          className="input input-bordered w-full mb-2"
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
 
        {editMode ? (
          <button onClick={handleUpdateVehicle} className="btn btn-primary w-full">Update Vehicle</button>
        ) : (
          <button onClick={handleAddVehicle} className="btn btn-primary w-full">Add Vehicle</button>
        )}
      </div>
     
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Rental Rent</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle:any, index:any) => (
            <tr key={vehicle.vehicle_id}>
              <td>{index + 1}</td>
              <td>{vehicle.rental_rent}</td>
              <td>{vehicle.availability}</td>
              <td>
                <button onClick={() => handleEditVehicle(vehicle)} className="btn btn-sm btn-warning mr-2">Edit</button>
                <button onClick={() => handleDeleteVehicle(vehicle.vehicle_id)} className="btn btn-sm btn-danger">Delete</button>
                <button onClick={() => handleViewVehicle(vehicle.vehicle_id)} className="btn btn-sm btn-info ml-2">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 
      {selectedVehicleId !== null && selectedVehicle && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Vehicle Details</h2>
          {vehicleLoading ? (
            <div>Loading vehicle details...</div>
          ) : vehicleError ? (
            <div>Error loading vehicle details: {vehicleError.message}</div>
          ) : (
            <div>
              <p><strong>ID:</strong> {selectedVehicle.vehicle_id}</p>
              <p><strong>Rental Rent:</strong> {selectedVehicle.rental_rent}</p>
              <p><strong>Availability:</strong> {selectedVehicle.availability}</p>
              <button onClick={() => setSelectedVehicleId(null)} className="btn btn-sm btn-secondary mt-2">Close</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
 
export default VehicleList;
 
 
