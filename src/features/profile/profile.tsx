import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface Booking {
  id: number;
  vehicleModel: string;
  startDate: string;
  endDate: string;
  location: string;
}

const Profile: React.FC = () => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId'); 

        if (!token || !userId) {
          throw new Error('No token or userId found');
        }

        // Fetch user details
        const userResponse = await axios.get<User>(`http://localhost:8000/api/users/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });
        setUserDetails(userResponse.data);

        // Fetch bookings for the user
        const bookingsResponse = await axios.get<Booking[]>('http://localhost:8000/api/bookings', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });
        setBookings(bookingsResponse.data);

        // Log bookings to console for debugging
        console.log(bookingsResponse.data); // <-- Add this console.log

      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            setError('Unauthorized access. Please login again.');
            localStorage.removeItem('authToken'); // Clear invalid token
          } else {
            setError('Error fetching user details or bookings');
          }
        } else {
          setError('An unexpected error occurred');
        }
        console.error('Error fetching user details or bookings:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <section id="user-profile" className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Profile</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {userDetails && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{userDetails.username}</h2>
            <p>
              <strong>Email:</strong> {userDetails.email} <br />
              <strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}
            </p>
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Your Booked Cars</h3>
              <ul>
                {bookings.map((booking, index) => (
                  <li key={index}>
                    {booking.vehicleModel}  {booking.startDate}  {booking.endDate} ({booking.location})
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-actions justify-end">
              <Link to="/" className="btn btn-secondary btn-sm mt-2">
                Close Profile
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
