// import React, { useEffect, useState } from 'react';

// interface Booking {
//   booking_id: number;
//   user_id: number;
//   vehicle_id: number;
//   booking_date: string;
//   return_date: string;
// }

// const Dashboard: React.FC = () => {
//   const [bookings, setBookings] = useState<Booking[]>([
//     // Example bookings for demonstration purposes
//     {
//       booking_id: 1,
//       user_id: 101,
//       vehicle_id: 201,
//       booking_date: '2024-07-01',
//       return_date: '2024-07-10'
//     },
//     {
//       booking_id: 2,
//       user_id: 102,
//       vehicle_id: 202,
//       booking_date: '2024-06-15',
//       return_date: '2024-06-20'
//     }
//   ]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const currentBookings = bookings.filter(booking => new Date(booking.return_date) > new Date());
//   const pastBookings = bookings.filter(booking => new Date(booking.return_date) <= new Date());

//   if (loading) {
//     return <div className="text-center p-4">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center p-4 text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Current Bookings</h2>
//         {currentBookings.length === 0 ? (
//           <p className="text-gray-500">No current bookings.</p>
//         ) : (
//           <table className="min-w-full bg-white border border-blue-300">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b border-blue-300 bg-blue-200 text-left">Booking ID</th>
//                 <th className="py-2 px-4 border-b border-blue-300 bg-blue-200 text-left">User ID</th>
//                 <th className="py-2 px-4 border-b border-blue-300 bg-blue-200 text-left">Vehicle ID</th>
//                 <th className="py-2 px-4 border-b border-blue-300 bg-blue-200 text-left">Booking Date</th>
//                 <th className="py-2 px-4 border-b border-blue-300 bg-blue-200 text-left">Return Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentBookings.map((booking, index) => (
//                 <tr key={index} className="hover:bg-blue-100">
//                   <td className="py-2 px-4 border-b border-blue-300">{booking.booking_id}</td>
//                   <td className="py-2 px-4 border-b border-blue-300">{booking.user_id}</td>
//                   <td className="py-2 px-4 border-b border-blue-300">{booking.vehicle_id}</td>
//                   <td className="py-2 px-4 border-b border-blue-300">{booking.booking_date}</td>
//                   <td className="py-2 px-4 border-b border-blue-300">{booking.return_date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </section>

//       <section className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Booking History</h2>
//         {pastBookings.length === 0 ? (
//           <p className="text-gray-500">No past bookings.</p>
//         ) : (
//           <table className="min-w-full bg-white border border-blue-300">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b border-blue-300 bg-blue-200 text-left">Booking ID</th>
//                 <th className="py-2 px-4 border-b border-blue-300 bg-blue-200 text-left">User ID</th>
//                 <th className="py-2 px-4 border-b border-blue-300 bg-blue-200 text-left">Vehicle ID</th>
//                 <th className="py-2 px-4 border-b border-blue-300 bg-blue-200 text-left">Booking Date</th>
//                 <th className="py-2 px-4 border-b border-blue-300 bg-blue-200 text-left">Return Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pastBookings.map((booking, index) => (
//                 <tr key={index} className="hover:bg-blue-100">
//                   <td className="py-2 px-4 border-b border-blue-300">{booking.booking_id}</td>
//                   <td className="py-2 px-4 border-b border-blue-300">{booking.user_id}</td>
//                   <td className="py-2 px-4 border-b border-blue-300">{booking.vehicle_id}</td>
//                   <td className="py-2 px-4 border-b border-blue-300">{booking.booking_date}</td>
//                   <td className="py-2 px-4 border-b border-blue-300">{booking.return_date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </section>

//       <section>
//         <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
//         <p className="text-gray-500">Account settings management will be here.</p>
//       </section>
//     </div>
//   );
// };

// export default Dashboard;
