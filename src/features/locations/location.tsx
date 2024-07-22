import React from 'react';
import { useGetLocationsQuery, useCreateLocationMutation, useUpdateLocationMutation, useDeleteLocationMutation } from './locationApi';
import { Toaster, toast } from 'sonner';
import LocationForm from './locationForm';

export interface TLocation {
  location_id: number;
  name: string;
  address: string;
  contact_phone: string;
  created_at: string;
  updated_at: string;
}

const Locations: React.FC = () => {
  const { data, isLoading } = useGetLocationsQuery();
  const [createLocation] = useCreateLocationMutation();
  const [updateLocation] = useUpdateLocationMutation();
  const [deleteLocation, { data: deleteMsg }] = useDeleteLocationMutation();

  const handleCreate = (newLocation: Partial<TLocation>) => {
    createLocation(newLocation);
  };

  const handleUpdate = (location_id: number) => {
    const updateLocationData = {
      name: 'Updated Name',
    };
    updateLocation({ location_id, ...updateLocationData });
  };

  const handleDelete = async (location_id: number) => {
    await deleteLocation(location_id);
    toast.success(deleteMsg?.msg || 'Location deleted successfully');
  };

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
      <div className="overflow-x-auto bg-gray-800 text-white p-4 h-screen overflow-y-auto w-full">
        <h1 className="text-xl my-4">Locations</h1>
        <LocationForm onCreate={handleCreate} />
        <table className="table table-xs">
          <thead>
            <tr>
              <th className="text-white">Location ID</th>
              <th className="text-white">Name</th>
              <th className="text-white">Address</th>
              <th className="text-white">Contact Phone</th>
              <th className="text-white">Created At</th>
              <th className="text-white">Updated At</th>
              <th className="text-white">Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={7}>Loading...</td></tr>
            ) : (
              data && data.map((location: TLocation, index: number) => (
                <tr key={index}>
                  <th>{location.location_id}</th>
                  <td>{location.name}</td>
                  <td>{location.address}</td>
                  <td>{location.contact_phone}</td>
                  <td>{location.created_at}</td>
                  <td>{location.updated_at}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-outline btn-info" onClick={() => handleUpdate(location.location_id)}>Update</button>
                    <button className="btn btn-sm btn-outline btn-warning" onClick={() => handleDelete(location.location_id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr><td colSpan={7}>{data ? `${data.length} records` : '0 records'}</td></tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Locations;