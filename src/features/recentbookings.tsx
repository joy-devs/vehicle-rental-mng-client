import React from 'react';

const RecentBookings: React.FC = () =>{
  const bookings = [
    { booking: 'EN1501488', subject: 'BMW 3', status: 'Done', date: '26 sep 2019', amount: '$1000.00' },
    { booking: 'EN1501438', subject: 'Brand new ferrari', status: 'Progress', date: '26 sep 2019', amount: '$500.00' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent car bookings</h2>
      <table className="table-auto w-full bg-white shadow rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-4">BOOKING</th>
            <th className="p-4">SUBJECT</th>
            <th className="p-4">STATUS</th>
            <th className="p-4">DATE</th>
            <th className="p-4">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index} className="border-b">
              <td className="p-4">{booking.booking}</td>
              <td className="p-4">{booking.subject}</td>
              <td className="p-4">
                <span className={`badge ${booking.status === 'Done' ? 'badge-success' : 'badge-warning'}`}>
                  {booking.status}
                </span>
              </td>
              <td className="p-4">{booking.date}</td>
              <td className="p-4">{booking.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentBookings;
