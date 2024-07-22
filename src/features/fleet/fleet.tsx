import React, { useState } from 'react';
import { useGetFleetsQuery, useCreateFleetMutation, useUpdateFleetMutation, useDeleteFleetMutation } from './fleetApi';
import { Toaster, toast } from 'sonner';

export interface TFleet {
  fleet_id: number;
  vehicle_id: number;
  acquisition_date: string;
  depreciation_rate: number;
  current_value: number;
  maintenance_cost: number;
  status: string;
  created_at: string;
  updated_at: string;
}

const FleetManagement: React.FC = () => {
  const { data,  isLoading } = useGetFleetsQuery();
  const [createFleet] = useCreateFleetMutation();
  const [updateFleet] = useUpdateFleetMutation();
  const [deleteFleet, { data: deleteMsg }] = useDeleteFleetMutation();

  const [newFleet, setNewFleet] = useState<Partial<TFleet>>({
    vehicle_id: 0,
    acquisition_date: '',
    depreciation_rate: 0,
    current_value: 0,
    maintenance_cost: 0,
    status: '',
  });

  const [selectedFleet, setSelectedFleet] = useState<TFleet | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewFleet({
      ...newFleet,
      [name]: value,
    });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createFleet(newFleet);
    setNewFleet({
      vehicle_id: 0,
      acquisition_date: '',
      depreciation_rate: 0,
      current_value: 0,
      maintenance_cost: 0,
      status: '',
    });
  };

  const handleUpdate = (fleet_id: number) => {
    const updateFleetData = {
      status: 'updated',
    };
    updateFleet({ fleet_id, ...updateFleetData });
  };

  const handleDelete = async (fleet_id: number) => {
    await deleteFleet(fleet_id);
    toast.success(deleteMsg?.msg || 'Fleet deleted successfully');
  };

  const handleViewMore = (fleet_id: number) => {
    const fleet = data?.find((f: TFleet) => f.fleet_id === fleet_id) || null;
    setSelectedFleet(fleet);
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
      <div className="overflow-x-auto bg-gray-800 text-white p-4 h-screen overflow-y-auto">
        <h1 className="text-xl my-4">Fleet Management</h1>
        <form onSubmit={handleCreate} className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="vehicle_id"
              value={newFleet.vehicle_id}
              onChange={handleInputChange}
              placeholder="Vehicle ID"
              className="input input-bordered w-full"
            />
            <input
              type="date"
              name="acquisition_date"
              value={newFleet.acquisition_date}
              onChange={handleInputChange}
              placeholder="Acquisition Date"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              name="depreciation_rate"
              value={newFleet.depreciation_rate}
              onChange={handleInputChange}
              placeholder="Depreciation Rate"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              name="current_value"
              value={newFleet.current_value}
              onChange={handleInputChange}
              placeholder="Current Value"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              name="maintenance_cost"
              value={newFleet.maintenance_cost}
              onChange={handleInputChange}
              placeholder="Maintenance Cost"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="status"
              value={newFleet.status}
              onChange={handleInputChange}
              placeholder="Status"
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-sm btn-outline btn-success mt-4">Add Fleet</button>
        </form>
        <table className="table table-xs">
          <thead>
            <tr>
              <th className="text-white">Fleet ID</th>
              <th className="text-white">Vehicle ID</th>
              <th className="text-white">Acquisition Date</th>
              <th className="text-white">Depreciation Rate</th>
              <th className="text-white">Current Value</th>
              <th className="text-white">Maintenance Cost</th>
              <th className="text-white">Status</th>
              <th className="text-white">Created At</th>
              <th className="text-white">Updated At</th>
              <th className="text-white">Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={10}>Loading...</td></tr>
            ) : (
              data && data.map((fleet: TFleet, index: number) => (
                <tr key={index}>
                  <th>{fleet.fleet_id}</th>
                  <td>{fleet.vehicle_id}</td>
                  <td>{fleet.acquisition_date}</td>
                  <td>{fleet.depreciation_rate}</td>
                  <td>{fleet.current_value}</td>
                  <td>{fleet.maintenance_cost}</td>
                  <td>{fleet.status}</td>
                  <td>{fleet.created_at}</td>
                  <td>{fleet.updated_at}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-outline btn-info" onClick={() => handleUpdate(fleet.fleet_id)}>Update</button>
                    <button className="btn btn-sm btn-outline btn-warning" onClick={() => handleDelete(fleet.fleet_id)}>Delete</button>
                    <button className="btn btn-sm btn-outline btn-primary" onClick={() => handleViewMore(fleet.fleet_id)}>View More</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr><td colSpan={10}>{data ? `${data.length} records` : '0 records'}</td></tr>
          </tfoot>
        </table>

        {selectedFleet && (
          <div className="modal">
            <div className="modal-box">
              <h2 className="font-bold text-lg">Fleet Details</h2>
              <p><strong>Fleet ID:</strong> {selectedFleet.fleet_id}</p>
              <p><strong>Vehicle ID:</strong> {selectedFleet.vehicle_id}</p>
              <p><strong>Acquisition Date:</strong> {selectedFleet.acquisition_date}</p>
              <p><strong>Depreciation Rate:</strong> {selectedFleet.depreciation_rate}</p>
              <p><strong>Current Value:</strong> {selectedFleet.current_value}</p>
              <p><strong>Maintenance Cost:</strong> {selectedFleet.maintenance_cost}</p>
              <p><strong>Status:</strong> {selectedFleet.status}</p>
              <p><strong>Created At:</strong> {selectedFleet.created_at}</p>
              <p><strong>Updated At:</strong> {selectedFleet.updated_at}</p>
              <div className="modal-action">
                <button className="btn btn-sm btn-outline btn-primary" onClick={() => setSelectedFleet(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FleetManagement;