import React from 'react';
import { useGetBookingsWithVehicleAndUserAndPaymentsQuery } from './ABookingApi';
import { TBookedVehicles } from './ABookingApi';

const UserBookings: React.FC = () => {
  const { data: bookings, error, isLoading } = useGetBookingsWithVehicleAndUserAndPaymentsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full mx-auto bg-gray-800  shadow-md h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold mx-7 margin-left: 0.25rem">Detailed Bookings</h1>
      {bookings && bookings.length > 0 ? (
        <ul className="mt-2">
          {bookings.map((booking: TBookedVehicles) => (
            <li key={booking.booking_id} className="border-b border-gray-200 py-4 mx-10 margin-left: 0.25rem">
              <h2 className="text-xl font-semibold">Booking ID: {booking.booking_id}</h2>
              <p><strong>User:</strong> {booking.user?.full_name} ({booking.user?.email})</p>
              <p><strong>Vehicle:</strong> {booking.vehicle?.make} {booking.vehicle?.model} ({booking.vehicle?.year})</p>
              <p><strong>Booking Date:</strong> {booking.booking_date}</p>
              <p><strong>Return Date:</strong> {booking.return_date}</p>
              <p><strong>Total Amount:</strong> ${booking.total_amount}</p>
              <p><strong>Status:</strong> {booking.booking_status}</p>
              
              <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md">Cancel Booking</button>
              <h3 className="text-lg font-semibold mt-2">Payments</h3>
              {booking.payments && booking.payments.length > 0 ? (
                <ul className="mt-2">
                  {booking.payments.map((payment) => (
                    <li key={payment.payment_id} className="border-b border-gray-200 py-2">
                      <p><strong>Payment ID:</strong> {payment.payment_id}</p>
                      <p><strong>Payment Date:</strong> {payment.payment_date}</p>
                      <p><strong>Amount:</strong> ${payment.amount}</p>
                      <p><strong>Status:</strong> {payment.payment_status}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No payments found</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
};

export default UserBookings;