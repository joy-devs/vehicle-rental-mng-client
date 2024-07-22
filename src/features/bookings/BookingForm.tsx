import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateBookingsMutation } from './BookingApi';
import { TBookedVehicles } from './BookingApi';

const BookingForm: React.FC = () => {
  const { register, handleSubmit } = useForm<TBookedVehicles>();
  const [createBooking, { isLoading, error }] = useCreateBookingsMutation();

  const onSubmit = async (data: TBookedVehicles) => {
    console.log('Payload:', data);
    try {
      await createBooking(data).unwrap();
      alert('Booking created successfully');
    } catch (err) {
      console.error('Failed to create booking:', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Booking</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_id">
            User ID
          </label>
          <input 
            type="text" 
            id="user_id"
            {...register('user_id', { required: true })} 
            placeholder="User ID" 
            className="input input-bordered w-full" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicle_id">
            Vehicle ID
          </label>
          <input 
            type="text" 
            id="vehicle_id"
            {...register('vehicle_id', { required: true })} 
            placeholder="Vehicle ID" 
            className="input input-bordered w-full" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location_id">
            Location ID
          </label>
          <input 
            type="text" 
            id="location_id"
            {...register('location_id', { required: true })} 
            placeholder="Location ID" 
            className="input input-bordered w-full" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="booking_date">
            Booking Date
          </label>
          <input 
            type="date" 
            id="booking_date"
            {...register('booking_date', { required: true })} 
            placeholder="Booking Date" 
            className="input input-bordered w-full" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="return_date">
            Return Date
          </label>
          <input 
            type="date" 
            id="return_date"
            {...register('return_date', { required: true })} 
            placeholder="Return Date" 
            className="input input-bordered w-full" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="total_amount">
            Total Amount
          </label>
          <input 
            type="number" 
            id="total_amount"
            {...register('total_amount', { required: true })} 
            placeholder="Total Amount" 
            className="input input-bordered w-full" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="booking_status">
            Booking Status
          </label>
          <input 
            type="text" 
            id="booking_status"
            {...register('booking_status', { required: true })} 
            placeholder="Booking Status" 
            className="input input-bordered w-full" 
          />
        </div>

        <div className="flex items-center justify-between">
          <button 
            type="submit" 
            disabled={isLoading} 
            className="btn btn-primary w-full"
          >
            {isLoading ? 'Creating...' : 'Create Booking'}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-xs italic mt-4">
            Failed to create booking: {JSON.stringify(error)}
          </p>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
