// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// interface Vehicle {
//   id: number;
//   model: string;
//   image: string;
//   available: boolean;
//   engine: string;
//   transmission: string;
//   fuelType: string;
// }

// const Profile: React.FC = () => {
//   const [bookedVehicles, setBookedVehicles] = useState<Vehicle[]>([]);
//   const [error, setError] = useState<string>('');

//   useEffect(() => {
//     const fetchBookedVehicles = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//           throw new Error('No token found');
//         }
//         const id =localStorage.getItem('userId')
//         const response = await axios.get<Vehicle[]>(`http://localhost:8000/api/users/${id}`, {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: ` ${token}`,
//           },

//         });
//         console.log(response.data)
//         setBookedVehicles(response.data);
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//           if (error.response?.status === 401) {
//             setError('Unauthorized access. Please login again.');
//             localStorage.removeItem('authToken'); // Clear invalid token
//           } else {
//             setError('Error fetching booked vehicles');
//           }
//         } else {
//           setError('An unexpected error occurred');
//         }
//         console.error('Error fetching booked vehicles:', error);
//       }
//     };

//     fetchBookedVehicles();
//   }, []);

//   return (
//     <section id="vehicle-profile" className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4 text-center">Your Bookings</h1>
//       {error && <p className="text-red-500 text-center">{error}</p>}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {bookedVehicles.map((vehicle,index) => (
//           <div key={index} className="card bg-base-100 shadow-xl">
//             <figure>
//               <img src={vehicle.image} alt={vehicle.model} className="rounded-t-lg" />
//             </figure>
//             <div className="card-body">
//               <h2 className="card-title">{vehicle.model}</h2>
//               <p>
//                 <strong>Engine:</strong> {vehicle.engine} <br />
//                 <strong>Transmission:</strong> {vehicle.transmission} <br />
//                 <strong>Fuel Type:</strong> {vehicle.fuelType}
//               </p>
//               <div className="card-actions justify-end">
//                 {vehicle.available ? (
//                   <span className="badge badge-success">Available</span>
//                 ) : (
//                   <span className="badge badge-error">Not Available</span>
//                 )}
//                 <Link to="/book" className="btn btn-primary btn-sm ml-2">
//                   Book Now
//                 </Link>
//               </div>
//               <Link to="/" className="btn btn-secondary btn-sm mt-2">
//                 Close Profile
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Profile;
