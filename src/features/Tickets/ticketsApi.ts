import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Ticket {
  ticket_id: number;
  user_id: number;
  subject: string;
  description: string;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

// Define the API slice
export const TicketsAPI = createApi({
  reducerPath: 'ticketsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
    prepareHeaders: (headers) => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
      const token = userDetails?.token;
      console.log('Token:', token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['tickets'],
  endpoints: (builder) => ({
    getTickets: builder.query<Ticket[], void>({
      query: () => 'ticket',
      
      providesTags: ['tickets'],
    }),
    createTicket: builder.mutation<Ticket, Partial<Ticket>>({
      query: (newTicket) => ({
        url: 'ticket',
        method: 'POST',
        body: newTicket,
      }),
      invalidatesTags: ['tickets'],
    }),
    updateTicket: builder.mutation<Ticket, Partial<Ticket>>({
      query: ({ ticket_id, ...rest }) => ({
        url: `ticket/${ticket_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['tickets'],
    }),
    deleteTicket: builder.mutation<{ success: boolean; ticket_id: number }, number>({
      query: (ticket_id) => ({
        url: `ticket/${ticket_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['tickets'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetTicketsQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
}:any = TicketsAPI;