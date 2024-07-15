// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import { Bar, Scatter } from 'react-chartjs-2';

// const DashboardOverview: React.FC = () => {
//   const [metrics, setMetrics] = useState({ totalBookings: 0, revenue: 0 });

//   useEffect(() => {
//     const fetchMetrics = async () => {
//       const response = await axios.get('http://localhost:8000/api/metrics');
//       setMetrics(response.data);
//     };

//     fetchMetrics();
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
//       <div className="mb-4">
        
//           data={{
//             labels: ['Total Bookings', 'Revenue'],
//             datasets: [
//               {
//                 label: 'Metrics',
//                 data: [metrics.totalBookings, metrics.revenue],
//                 backgroundColor: ['rgba(75, 192, 192, 0.2)'],
//                 borderColor: ['rgba(75, 192, 192, 1)'],
//                 borderWidth: 1,
//               },
//             ],
//           }}
        
//       </div>
//     </div>
//   );
// };

// export default DashboardOverview;
