// import React from 'react';
// import { useGetSingleBookingWithVehicleAndUserAndPaymentsQuery, useDeleteBookingsMutation } from '../ABookings/ABookingApi';
// import { useCreatePaymentsMutation } from '../PaymentWithStripe/stripeApi';
// import { Toaster, toast } from 'sonner';

// const SingleBookingDetails: React.FC<{ bookingId: number }> = ({ bookingId }) => {
//   const { data: booking, error, isLoading } = useGetSingleBookingWithVehicleAndUserAndPaymentsQuery(bookingId);
//   const [createCheckout] = useCreatePaymentsMutation();
//   const [deleteBooking, { data: deleteMsg }] = useDeleteBookingsMutation();

//   const handleUpdatePay = async () => {
//     if (!booking) return;
//     try {
//       const { data } = await createCheckout({ booking_id: booking.booking_id, amount: Number(booking.total_amount) });
//       if (data?.checkoutUrl) {
//         window.location.href = data.checkoutUrl;
//       } else {
//         console.error('Checkout url is not provided');
//         toast.error('Provide checkout url');
//       }
//     } catch (error) {
//       console.error('Error creating checkout session:', error);
//       toast.error('Error creating checkout session');
//     }
//   };

//   const handleCancelBooking = async () => {
//     if (!booking) return;
//     try {
//       await deleteBooking(booking.booking_id).unwrap();
//       toast.success(deleteMsg?.msg || 'Booking cancelled successfully');
//     } catch (error) {
//       console.error('Failed to cancel booking:', error);
//       toast.error('Failed to cancel booking');
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div className="max-w-screen mx-auto bg-gray-700 p-10 rounded-lg shadow-md">
//       <Toaster
//         toastOptions={{
//           classNames: {
//             error: 'bg-red-400',
//             success: 'text-green-400',
//             warning: 'text-yellow-400',
//             info: 'bg-blue-400',
//           },
//         }}
//       />
//       <h1 className="text-2xl font-bold mb-4 ">Booking Details</h1>
//       {booking && (
//         <div>
//           <p><strong>Booking ID:</strong> {booking.booking_id}</p>
//           <p><strong>Vehicle:</strong> {booking.vehicle?.make} {booking.vehicle?.model}</p>
//           <p><strong>User:</strong> {booking.user?.full_name} ({booking.user?.email})</p>
//           <p><strong>Total Amount:</strong> {booking.total_amount}</p>
//           <p><strong>Status:</strong> {booking.booking_status}</p>
//           <div className="flex gap-4">
//             <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-green-400" onClick={handleUpdatePay}>Pay</button>
//             <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-red-400" onClick={handleCancelBooking}>Cancel Booking</button>
//           </div>
//           <p className="mt-6 text-2xl	font-size: 1.875rem"><strong>Payments:</strong></p>
//           {booking.payments?.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {booking.payments.map((payment: any) => (
//                 <div key={payment.payment_id} className="p-4 bg-gray-500 rounded-lg shadow-md text-white	color: rgb(255 255 255)">
//                   <p><strong>Amount:</strong> {payment.amount}</p>
//                   <p><strong>Status:</strong> {payment.payment_status}</p>
//                   <p><strong>Method:</strong> {payment.payment_method}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>No payments found</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SingleBookingDetails;