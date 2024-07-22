// src/features/Booking/Bookings.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetBookingsQuery, useDeleteBookingsMutation, useUpdateBookingsMutation } from './ABookingApi';
import { Toaster, toast } from 'sonner';
import BookingFormAdmin from '../../components/BookingForm admin';
import { useCreatePaymentsMutation } from '../../features/PaymentWithStripe/stripeApi';
import { TBookedVehicles } from '../ABookings/ABookingApi';
 


// import Bookings from './Booking';

export interface TBookings {
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

const ABookings: React.FC = () => {
  const { data, isLoading } = useGetBookingsQuery();
  const [updateBooking] = useUpdateBookingsMutation();
  const [deleteBooking, { data: deleteMsg }] = useDeleteBookingsMutation();
  const [createCheckout] = useCreatePaymentsMutation();

  const handleUpdate = (booking_id: number) => {
    const updateBookingData = {
      booking_status: 'booking updated',
    };
    updateBooking({ booking_id, ...updateBookingData });
  };

  const handleDelete = async (booking_id: number) => {
    await deleteBooking(booking_id);
    toast.success(deleteMsg?.msg || 'Booking deleted successfully');
  };
//payment with stripe
  const handleUpdatePay = async (booking: TBookedVehicles) => {
    try {
      const { data } = await createCheckout({ booking_id: booking.booking_id, amount: Number(booking.total_amount) });
      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        console.error('Checkout url is not given');
        toast.error('provide checkout url');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Error creating checkout session');
    }
  };


  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
      <div className="overflow-x-auto bg-gray-800 text-white  p-4 h-screen overflow-y-auto">
        <h1 className="text-xl my-4">My Bookings</h1>
        <BookingFormAdmin />
        <table className="table table-xs">
          <thead>
            <tr>
              <th className="text-white">Booking_id</th>
              <th className="text-white">user_id</th>
              <th className="text-white">vehicle_id</th>
              <th className="text-white">location_id</th>
              <th className="text-white">booking_date</th>
              <th className="text-white">return_date</th>
              <th className="text-white">total_amount</th>
              <th className="text-white">booking_status</th>
              <th className="text-white">created_at</th>
              <th className="text-white">updated_at</th>
              <th className="text-white">Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={11}>Loading...</td></tr>
            ) :  (
                data && data.map((bookings: TBookings, index: number) => (
                  <tr key={index}>
                    <th>{bookings.booking_id}</th>
                    <td>{bookings.user_id}</td>
                    <td>{bookings.vehicle_id}</td>
                    <td>{bookings.location_id}</td>
                    <td>{bookings.booking_date}</td>
                    <td>{bookings.return_date}</td>
                    <td>{bookings.total_amount}</td>
                    <td>{bookings.booking_status}</td>
                    <td>{bookings.created_at}</td>
                    <td>{bookings.updated_at}</td>
                    <td className="flex gap-2">
                      <button className="btn btn-sm btn-outline btn-info" onClick={() => handleUpdate(bookings.booking_id)}>Update</button>
                      <button className="btn btn-sm btn-outline btn-warning" onClick={() => handleDelete(bookings.booking_id)}>Delete</button>
                      <Link to={`/bookings/${bookings.booking_id}`} className="btn btn-sm btn-outline btn-primary">View</Link>
                    </td>
                    <td>  <button className="btn btn-sm btn-outline btn-info" onClick={() => handleUpdatePay(bookings)}>
                      Pay
                    </button>
</td>
                  </tr>
                ))
              
            )}
          </tbody>
          <tfoot>
            <tr><td colSpan={11}>{data ? `${data.length} records` : '0 records'}</td></tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default ABookings;