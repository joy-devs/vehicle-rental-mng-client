import React, { useState } from "react";
import { useCreateBookingsMutation } from "../features/ABookings/ABookingApi";
import { Toaster, toast } from "sonner";


const BookingFormAdmin: React.FC = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    vehicle_id: "",
    location_id: "",
    booking_date: "",
    return_date: "",
    total_amount: "",
    booking_status: "",
  });
  const [createBooking, { isLoading }] = useCreateBookingsMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBooking(formData).unwrap();
      toast.success("Booking created successfully!");
      setFormData({
        user_id: "",
        vehicle_id: "",
        location_id: "",
        booking_date: "",
        return_date: "",
        total_amount: "",
        booking_status: "",
      });
    } catch (error) {
      toast.error("Failed to create booking!");
      console.error("Failed to create booking:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg mb-4">
      <Toaster
        toastOptions={{
          classNames: {
            error: "bg-red-400",
            success: "text-green-400",
            warning: "text-yellow-400",
            info: "bg-blue-400",
          },
        }}
      />
      <h2 className="text-xl mb-4">Create Booking</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <input
          type="text"
          name="user_id"
          placeholder="User ID"
          value={formData.user_id}
          onChange={handleChange}
          required
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          name="vehicle_id"
          placeholder="Vehicle ID"
          value={formData.vehicle_id}
          onChange={handleChange}
          required
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          name="location_id"
          placeholder="Location ID"
          value={formData.location_id}
          onChange={handleChange}
          required
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="date"
          name="booking_date"
          placeholder="Booking Date"
          value={formData.booking_date}
          onChange={handleChange}
          required
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="date"
          name="return_date"
          placeholder="Return Date"
          value={formData.return_date}
          onChange={handleChange}
          required
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="number"
          name="total_amount"
          placeholder="Total Amount"
          value={formData.total_amount}
          onChange={handleChange}
          required
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          name="booking_status"
          placeholder="Booking Status"
          value={formData.booking_status}
          onChange={handleChange}
          required
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold transition duration-300"
          >
            {isLoading ? "Creating..." : "Create Booking"}
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default BookingFormAdmin;