import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookingByIdQuery } from './ABookingApi';


const BookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetBookingByIdQuery(parseInt(id || '0', 10));
  

 

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.toString()}</div>
      ) : (
        data && (
          <div className="bg-gray-800 text-white p-4 rounded">
            <h1 className="text-xl mb-4">Booking Details</h1>
            <p><strong>Booking ID:</strong> {data.booking_id}</p>
            <p><strong>User ID:</strong> {data.user_id}</p>
            <p><strong>Vehicle ID:</strong> {data.vehicle_id}</p>
            <p><strong>Location ID:</strong> {data.location_id}</p>
            <p><strong>Booking Date:</strong> {data.booking_date}</p>
            <p><strong>Return Date:</strong> {data.return_date}</p>
            <p><strong>Total Amount:</strong> {data.total_amount}</p>
            <p><strong>Booking Status:</strong> {data.booking_status}</p>
            <p><strong>Created At:</strong> {data.created_at}</p>
            <p><strong>Updated At:</strong> {data.updated_at}</p>
            
            <button className="btn btn-secondary mt-4" onClick={() => navigate(-1)}>Go Back</button>
          </div>
        )
      )}
    </div>
  );
};

export default BookingDetails;