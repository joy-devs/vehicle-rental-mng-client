import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
 
export interface Vehicle {
  vehicle_id: number;
  rental_rate: number;
  availability: string;
}
 
export const vehiclesApi = createApi({
  reducerPath: 'vehiclesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
  endpoints: (builder) => ({
    fetchVehicles: builder.query<Vehicle[], void>({
      query: () => 'Vehicles',
    }),
    fetchVehicleById: builder.query<Vehicle, number>({
      query: (id) => `vehicles/${id}`,
    }),
    addVehicle: builder.mutation<Vehicle, Partial<Vehicle>>({
      query: (vehicle) => ({
        url: 'Vehicles',
        method: 'POST',
        body: vehicle,
      }),
    }),
    updateVehicle: builder.mutation<Vehicle, Partial<Vehicle>>({
      query: ({ vehicle_id, ...patch }) => ({
        url: `Vehicles/${vehicle_id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
    deleteVehicle: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `Vehicles/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});
 
export const {
  useFetchVehiclesQuery,
  useFetchVehicleByIdQuery,
  useAddVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation
}:any = vehiclesApi;