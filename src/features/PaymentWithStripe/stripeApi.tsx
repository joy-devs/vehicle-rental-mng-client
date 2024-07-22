import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface TPayments{
    checkouturl:string;

}
export const PaymentsAPI = createApi({
  reducerPath: 'paymentsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: ' https://vehicle-renting-service-api.onrender.com/',
  }),
  endpoints: (builder) => ({
    createPayments: builder.mutation<TPayments,{booking_id:number;amount:number}>({
      query: ({booking_id,amount}) => ({
        url: 'create-checkout-session',
        method: 'POST',
        body: {booking_id,amount,success_url:'http://localhost:5173/paymentsuccess',cancel_url:'http://localhost:5173/paymentcancel'},
      }),
    }), 
  }),
});
export const {
 
  useCreatePaymentsMutation

}:any = PaymentsAPI;