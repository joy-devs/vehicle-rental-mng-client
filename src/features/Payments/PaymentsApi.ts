import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TPayment {
  payment_id: number;
  booking_id: number;
  amount: number;
  payment_status: string;
  payment_date: string;
  payment_method: string;
  transaction_id: string;
  created_at: string;
  updated_at: string;
}

export const PaymentsApi = createApi({
  reducerPath: 'paymentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://vehicle-mng-backend.onrender.com/api',
    prepareHeaders: (headers) => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
      const token = userDetails?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Payments'],
  endpoints: (builder) => ({
    getPayments: builder.query<TPayment[], void>({
      query: () => 'payments',
      providesTags: ['Payments'],
    }),
    createPayment: builder.mutation<TPayment, Partial<TPayment>>({
      query: (newPayment) => ({
        url: 'payments',
        method: 'POST',
        body: newPayment,
      }),
      invalidatesTags: ['Payments'],
    }),
    updatePayment: builder.mutation<TPayment, Partial<TPayment>>({
      query: ({ payment_id, ...rest }) => ({
        url: `payments/${payment_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Payments'],
    }),
    deletePayment: builder.mutation<{ success: boolean; payment_id: number }, number>({
      query: (payment_id) => ({
        url: `payments/${payment_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Payments'],
    }),
    createCheckoutSession: builder.mutation<any, { booking_id: number; amount: number }>({
      query: (data) => ({
        url: 'payments/create-checkout-session',
        method: 'POST',
        body: data,
      }),
    }),
    handleWebhook: builder.mutation<any, { payload: any }>({
      query: (data) => ({
        url: 'payments/webhook',
        method: 'POST',
        body: data,
      }),
    }),
    testCreateCheckoutSession: builder.query<any, void>({
      query: () => 'payments/test-checkout-session',
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  useCreateCheckoutSessionMutation,
  useHandleWebhookMutation,
  useTestCreateCheckoutSessionQuery,
}: any = PaymentsApi;