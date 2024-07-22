import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TLocation {
  location_id: number;
  name: string;
  address: string;
  contact_phone: string;
  created_at: string;
  updated_at: string;
}

export const LocationsApi = createApi({
  reducerPath: 'locationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://vehicle-mng-backend.onrender.com',
    prepareHeaders: (headers) => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
      const token = userDetails?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Locations'],
  endpoints: (builder) => ({
    getLocations: builder.query<TLocation[], void>({
      query: () => 'location',
      providesTags: ['Locations'],
    }),
    createLocation: builder.mutation<TLocation, Partial<TLocation>>({
      query: (newLocation) => ({
        url: 'location',
        method: 'POST',
        body: newLocation,
      }),
      invalidatesTags: ['Locations'],
    }),
    updateLocation: builder.mutation<TLocation, Partial<TLocation>>({
      query: ({ location_id, ...rest }) => ({
        url: `location/${location_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Locations'],
    }),
    deleteLocation: builder.mutation<{ success: boolean; location_id: number }, number>({
      query: (location_id) => ({
        url: `location/${location_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Locations'],
    }),
  }),
});

export const {
  useGetLocationsQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
}:any = LocationsApi;
