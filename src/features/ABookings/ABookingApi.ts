import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TBookedVehicles {
  booking_id: number;
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: string;
  return_date: string;
  total_amount: number;
  booking_status: string;
  created_at: string;
  updated_at: string;
  user?: User;
  vehicle?: Vehicle;
  payments?: Payment[];
}

export interface User {
  user_id: number;
  full_name: string;
  email: string;
  contact_phone?: string;
  address?: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  vehicle_id: number;
  model: string;
  make: string;
  year: number;
  price_per_day: number;
  availability: boolean;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  payment_id: number;
  user_id: number;
  booking_id: number;
  payment_date: string;
  amount: number;
  payment_status: string;
  created_at: string;
  updated_at: string;
}

// Define the API slice
export const BookingsAPI = createApi({
  reducerPath: 'bookingsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
    // prepareHeaders: (headers) => {
    //   const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    //   const token = userDetails?.token;
    //   console.log('Token:', token);
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ['bookings'],
  endpoints: (builder) => ({
    getBookings: builder.query<TBookedVehicles[], void>({
      query: () => 'bookings',
      providesTags: ['bookings'],
    }),
    getBookingById: builder.query<TBookedVehicles, number>({
      query: (booking_id) => `bookings/${booking_id}`,
      providesTags: ['bookings'],
    }),
    getBookingsByUserId: builder.query<TBookedVehicles[], number>({
      query: (user_id) => `users/withBookings/${user_id}`,
      providesTags: ['bookings'],
    }),
    getBookingsWithVehicleAndUserAndPayments: builder.query<TBookedVehicles[], void>({
      query: () => 'bookingsWith-vehicle-and-user-and-payments',
      providesTags: ['bookings'],
    }),
    getSingleBookingWithVehicleAndUserAndPayments: builder.query<TBookedVehicles, number>({
      query: (booking_id) => `bookingsWith-vehicle-and-user-and-payments/${booking_id}`,
      providesTags: ['bookings'],
    }),
    createBookings: builder.mutation<TBookedVehicles, Partial<TBookedVehicles>>({
      query: (newBookings) => ({
        url: 'bookings',
        method: 'POST',
        body: newBookings,
      }),
      invalidatesTags: ['bookings'],
    }),
    updateBookings: builder.mutation<TBookedVehicles, Partial<TBookedVehicles>>({
      query: ({ booking_id, ...rest }) => ({
        url: `bookings/${booking_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['bookings'],
    }),
    deleteBookings: builder.mutation<{ success: boolean; booking_id: number }, number>({
      query: (booking_id) => ({
        url: `bookings/${booking_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['bookings'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useGetBookingsByUserIdQuery,
  useGetBookingsWithVehicleAndUserAndPaymentsQuery,
  useGetSingleBookingWithVehicleAndUserAndPaymentsQuery,
  useCreateBookingsMutation,
  useUpdateBookingsMutation,
  useDeleteBookingsMutation,
}: any = BookingsAPI;