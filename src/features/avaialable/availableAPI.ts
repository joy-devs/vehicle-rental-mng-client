import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface VehicleSpecification {
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

export const vehicleSpecApi = createApi({
  reducerPath: 'vehicleSpecApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://vehicle-mng-backend.onrender.com/api' }),
  endpoints: (builder) => ({
    fetchVehicleSpecifications: builder.query<VehicleSpecification[], void>({
      query: () => 'specifications',
    }),
    fetchVehicleSpecificationById: builder.query<VehicleSpecification, number>({
      query: (id) => `specifications/${id}`,
    }),
    addVehicleSpecification: builder.mutation<VehicleSpecification, Partial<VehicleSpecification>>({
      query: (vehicleSpecification) => ({
        url: 'specifications',
        method: 'POST',
        body: vehicleSpecification,
      }),
    }),
    updateVehicleSpecification: builder.mutation<VehicleSpecification, Partial<VehicleSpecification>>({
      query: ({ vehicleSpec_id, ...patch }) => ({
        url: `specifications/${vehicleSpec_id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
    deleteVehicleSpecification: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `specifications/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { 
  useFetchVehicleSpecificationsQuery, 
  useFetchVehicleSpecificationByIdQuery, 
  useAddVehicleSpecificationMutation, 
  useUpdateVehicleSpecificationMutation, 
  useDeleteVehicleSpecificationMutation 
}: any = vehicleSpecApi;
