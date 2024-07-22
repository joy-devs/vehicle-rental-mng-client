import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Ticket } from '../Tickets/ticketsApi'; 

export interface User {
  user_id: number;
  full_name: string;
  email: string;
  contact_phone?: string;
  address?: string;
  role: string;
  created_at: string;
  updated_at: string;
  supportTickets: Ticket;
  bookings?: TBookedVehicles[];
}

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
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://vehicle-mng-backend.onrender.com',
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.token;
    //   console.log('Token:', token);
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    fetchUsers: builder.query<User[], void>({
      query: () => ({
        url: 'users',
        method: 'GET',
      }),
    }),
    fetchUserById: builder.query<User, number>({
      query: (user_id) => ({
        url: `users/${user_id}`,
        method: 'GET',
      }),
    }),
    fetchUserWithBookings: builder.query<User, number>({
      query: (user_id) => {
        console.log(`Fetching user with bookings for user_id: ${user_id}`);
        return {
          url: `users/withBookings/${user_id}`,
          method: 'GET',
        };
      },
    }),
    fetchUserWithTickets: builder.query<User, number>({
      query: (user_id) => {
        console.log(`Fetching user with bookings for user_id: ${user_id}`);
        return {
          url: `users/singleUserWithTickets/${user_id}`,
          method: 'GET',
        };
      },
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: ({ user_id, ...user }) => ({
        url: `users/${user_id}`,
        method: 'PUT',
        body: user,
      }),
    }),
    deleteUser: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { 
  useFetchUsersQuery, 
  useFetchUserByIdQuery,
  useFetchUserWithTicketsQuery,
  useFetchUserWithBookingsQuery,
  useAddUserMutation, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
}:any = usersApi;