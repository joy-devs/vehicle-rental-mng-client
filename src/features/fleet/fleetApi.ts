import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

export const FleetManagementApi = createApi({
  reducerPath: 'fleetManagementApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://vehicle-mng-backend.onrender.com/api',
    // prepareHeaders: (headers) => {
    //   const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    //   const token = userDetails?.token;
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ['Fleet'],
  endpoints: (builder) => ({
    getFleets: builder.query<TFleet[], void>({
      query: () => 'Fleets',
      providesTags: ['Fleet'],
    }),
    createFleet: builder.mutation<TFleet, Partial<TFleet>>({
      query: (newFleet) => ({
        url: 'Fleets',
        method: 'POST',
        body: newFleet,
      }),
      invalidatesTags: ['Fleet'],
    }),
    updateFleet: builder.mutation<TFleet, Partial<TFleet>>({
      query: ({ fleet_id, ...rest }) => ({
        url: `Fleets/${fleet_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Fleet'],
    }),
    deleteFleet: builder.mutation<{ success: boolean; fleet_id: number }, number>({
      query: (fleet_id) => ({
        url: `Fleets/${fleet_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Fleet'],
    }),
  }),
});

export const {
  useGetFleetsQuery,
  useCreateFleetMutation,
  useUpdateFleetMutation,
  useDeleteFleetMutation,
}:any = FleetManagementApi;