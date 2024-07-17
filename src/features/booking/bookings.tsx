import React, { useState, useEffect } from 'react';
import axios from 'axios';


interface Booking {
  id: number;
  vehicleModel: string;
  startDate: string;
  endDate: string;
  location: string;
}

const BookingDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [newBooking, setNewBooking] = useState<Partial<Booking>>({});
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get<Booking[]>('http://localhost:8000/api/bookings', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setBookings(response.data);
    } catch (error) {
      setError('Error fetching bookings');
      console.error('Error fetching bookings:', error);
    }
  };

  const handleCreateBooking = async () => {
    try {
      const response = await axios.post<Booking>('http://localhost:8000/api/bookings', newBooking, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setBookings([...bookings, response.data]);
      setNewBooking({});
    } catch (error) {
      setError('Error creating booking');
      console.error('Error creating booking:', error);
    }
  };

  const handleUpdateBooking = async () => {
    try {
      if (editBooking) {
        const response = await axios.put<Booking>(`http://localhost:8000/api/bookings/${editBooking.id}`, editBooking, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setBookings(bookings.map(b => (b.id === editBooking.id ? response.data : b)));
        setEditBooking(null);
      }
    } catch (error) {
      setError('Error updating booking');
      console.error('Error updating booking:', error);
    }
  };

  const handleDeleteBooking = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/bookings/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setBookings(bookings.filter(b => b.id !== id));
    } catch (error) {
      setError('Error deleting booking');
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Booking Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Create Booking</h2>
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="Vehicle Model"
            value={newBooking.vehicleModel || ''}
            onChange={(e) => setNewBooking({ ...newBooking, vehicleModel: e.target.value })}
            className="input input-bordered flex-1"
          />
          <input
            type="date"
            placeholder="Start Date"
            value={newBooking.startDate || ''}
            onChange={(e) => setNewBooking({ ...newBooking, startDate: e.target.value })}
            className="input input-bordered w-1/3"
          />
          <input
            type="date"
            placeholder="End Date"
            value={newBooking.endDate || ''}
            onChange={(e) => setNewBooking({ ...newBooking, endDate: e.target.value })}
            className="input input-bordered w-1/3"
          />
          <input
            type="text"
            placeholder="Location"
            value={newBooking.location || ''}
            onChange={(e) => setNewBooking({ ...newBooking, location: e.target.value })}
            className="input input-bordered w-1/3"
          />
          <button className="btn btn-primary" onClick={handleCreateBooking}>
            Create Booking
          </button>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Edit Booking</h2>
        {editBooking && (
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              placeholder="Vehicle Model"
              value={editBooking.vehicleModel}
              onChange={(e) => setEditBooking({ ...editBooking, vehicleModel: e.target.value })}
              className="input input-bordered flex-1"
            />
            <input
              type="date"
              placeholder="Start Date"
              value={editBooking.startDate}
              onChange={(e) => setEditBooking({ ...editBooking, startDate: e.target.value })}
              className="input input-bordered w-1/3"
            />
            <input
              type="date"
              placeholder="End Date"
              value={editBooking.endDate}
              onChange={(e) => setEditBooking({ ...editBooking, endDate: e.target.value })}
              className="input input-bordered w-1/3"
            />
            <input
              type="text"
              placeholder="Location"
              value={editBooking.location}
              onChange={(e) => setEditBooking({ ...editBooking, location: e.target.value })}
              className="input input-bordered w-1/3"
            />
            <button className="btn btn-primary" onClick={handleUpdateBooking}>
              Update Booking
            </button>
            <button className="btn btn-secondary ml-2" onClick={() => setEditBooking(null)}>
              Cancel
            </button>
          </div>
        )}
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Bookings</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Vehicle Model</th>
                <th className="px-4 py-2">Start Date</th>
                <th className="px-4 py-2">End Date</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id} className="bg-gray-100 hover:bg-gray-200">
                  <td className="px-4 py-2">{booking.vehicleModel}</td>
                  <td className="px-4 py-2">{booking.startDate}</td>
                  <td className="px-4 py-2">{booking.endDate}</td>
                  <td className="px-4 py-2">{booking.location}</td>
                  <td className="px-4 py-2">
                    <button className="btn btn-info mr-2" onClick={() => setEditBooking(booking)}>
                      Edit
                    </button>
                    <button className="btn btn-error" onClick={() => handleDeleteBooking(booking.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingDashboard;
