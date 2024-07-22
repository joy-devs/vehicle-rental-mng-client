import React, { useEffect, useState } from 'react';
import { TPayment, useGetPaymentsQuery } from '../../features/Payments/paymentsApi';
import { useGetBookingsQuery } from '../../features/Bookings/BookingApi';
import { useFetchUsersQuery } from '../users/UserAPi';
import { useGetTicketsQuery } from '../../features/customer Tickets/ticketsApi';
import { useGetVehicleSpecificationsQuery } from '../../features/VehiclesSpecifications/vSpecificationsApi';
// import { useGetLocationsQuery } from '../../features/Locations and Branches/locationApi';
// import IncomeBookingsChart from '../../Components/IncomeBookingCharts';

const AdminDashboard: React.FC = () => {
  const { data: paymentsData, isLoading: paymentsLoading } = useGetPaymentsQuery();
  const { data: bookingsData, isLoading: bookingsLoading } = useGetBookingsQuery();
  const { data: usersData, isLoading: usersLoading } = useFetchUsersQuery();
  const { data: ticketsData, isLoading: ticketsLoading } = useGetTicketsQuery();
  const { data: vehicleSpecsData, isLoading: vehicleSpecsLoading } = useGetVehicleSpecificationsQuery();
  const { data: locationsData, isLoading: locationsLoading } = useGetLocationsQuery();
  
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [previousIncome, setPreviousIncome] = useState<number>(0);
  const [incomeChange, setIncomeChange] = useState<number>(0);
  
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [previousBookings, setPreviousBookings] = useState<number>(0);
  const [bookingsChange, setBookingsChange] = useState<number>(0);

  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [previousUsers, setPreviousUsers] = useState<number>(0);
  const [usersChange, setUsersChange] = useState<number>(0);

  const [totalTickets, setTotalTickets] = useState<number>(0);
  const [previousTickets, setPreviousTickets] = useState<number>(0);
  const [ticketsChange, setTicketsChange] = useState<number>(0);

  const [totalVehicleSpecs, setTotalVehicleSpecs] = useState<number>(0);
  const [previousVehicleSpecs, setPreviousVehicleSpecs] = useState<number>(0);
  const [vehicleSpecsChange, setVehicleSpecsChange] = useState<number>(0);

  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartIncomeData, setChartIncomeData] = useState<number[]>([]);
  const [chartBookingsData, setChartBookingsData] = useState<number[]>([]);

  useEffect(() => {
    if (paymentsData) {
      const income = paymentsData.reduce((sum: number, payment: TPayment) => sum + payment.amount, 0);
      const prevIncome = localStorage.getItem('previousIncome');
      if (prevIncome) {
        setPreviousIncome(Number(prevIncome));
        setIncomeChange(((income - Number(prevIncome)) / Number(prevIncome)) * 100);
      }
      setTotalIncome(income);
      localStorage.setItem('previousIncome', income.toString());

      // Prepare data for the chart
      const labels = paymentsData.map((payment: { payment_date: any; }) => payment.payment_date); // Adjust this as necessary
      const incomeData = paymentsData.map((payment: { amount: any; }) => payment.amount);
      setChartLabels(labels);
      setChartIncomeData(incomeData);
    }
  }, [paymentsData]);

  useEffect(() => {
    if (bookingsData) {
      const bookings = bookingsData.length;
      const prevBookings = localStorage.getItem('previousBookings');
      if (prevBookings) {
        setPreviousBookings(Number(prevBookings));
        setBookingsChange(((bookings - Number(prevBookings)) / Number(prevBookings)) * 100);
      }
      setTotalBookings(bookings);
      localStorage.setItem('previousBookings', bookings.toString());
  
      // Prepare data for the chart
      const bookingsDataArray = bookingsData.map((booking: { booking_date: any; }) => booking.booking_date); // Adjust this as necessary
      setChartBookingsData(bookingsDataArray);
    }
  }, [bookingsData]);

  useEffect(() => {
    if (usersData) {
      const users = usersData.length;
      const prevUsers = localStorage.getItem('previousUsers');
      if (prevUsers) {
        setPreviousUsers(Number(prevUsers));
        setUsersChange(((users - Number(prevUsers)) / Number(prevUsers)) * 100);
      }
      setTotalUsers(users);
      localStorage.setItem('previousUsers', users.toString());
    }
  }, [usersData]);

  useEffect(() => {
    if (ticketsData) {
      const tickets = ticketsData.length;
      const prevTickets = localStorage.getItem('previousTickets');
      if (prevTickets) {
        setPreviousTickets(Number(prevTickets));
        setTicketsChange(((tickets - Number(prevTickets)) / Number(prevTickets)) * 100);
      }
      setTotalTickets(tickets);
      localStorage.setItem('previousTickets', tickets.toString());
    }
  }, [ticketsData]);

  useEffect(() => {
    if (vehicleSpecsData) {
      const vehicleSpecs = vehicleSpecsData.length;
      const prevVehicleSpecs = localStorage.getItem('previousVehicleSpecs');
      if (prevVehicleSpecs) {
        setPreviousVehicleSpecs(Number(prevVehicleSpecs));
        setVehicleSpecsChange(((vehicleSpecs - Number(prevVehicleSpecs)) / Number(prevVehicleSpecs)) * 100);
      }
      setTotalVehicleSpecs(vehicleSpecs);
      localStorage.setItem('previousVehicleSpecs', vehicleSpecs.toString());
    }
  }, [vehicleSpecsData]);

  if (paymentsLoading || bookingsLoading || usersLoading || ticketsLoading || vehicleSpecsLoading || locationsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-6 h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Today's Statistics</h1>
          <p className="text-gray-600">Tue, 14 May, 2022 11:30 AM</p>
        </div>
        {/* <input
          type="text"
          placeholder="Search here"
          className="p-2 border rounded-md"
        /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-xl font-semibold mb-4">Income</h2>
          <p className="text-3xl font-semibold">${totalIncome.toFixed(2)}</p>
          <p className={`text-${incomeChange >= 0 ? 'green' : 'red'}-600`}>
            {incomeChange.toFixed(1)}% {incomeChange >= 0 ? 'up' : 'down'} from yesterday
          </p>
          <p className="text-gray-600 mt-2">Previous income ${previousIncome.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-xl font-semibold mb-4">Bookings</h2>
          <p className="text-3xl font-semibold">{totalBookings}</p>
          <p className={`text-${bookingsChange >= 0 ? 'green' : 'red'}-600`}>
            {bookingsChange.toFixed(1)}% {bookingsChange >= 0 ? 'up' : 'down'} from yesterday
          </p>
          <p className="text-gray-600 mt-2">Previous bookings {previousBookings}</p>
        </div>

        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <p className="text-3xl font-semibold">{totalUsers}</p>
          <p className={`text-${usersChange >= 0 ? 'green' : 'red'}-600`}>
            {usersChange.toFixed(1)}% {usersChange >= 0 ? 'up' : 'down'} from yesterday
          </p>
          <p className="text-gray-600 mt-2">Previous users {previousUsers}</p>
        </div>
        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-xl font-semibold mb-4">Customer Tickets</h2>
          <p className="text-3xl font-semibold">{totalTickets}</p>
          <p className={`text-${ticketsChange >= 0 ? 'green' : 'red'}-600`}>
            {ticketsChange.toFixed(1)}% {ticketsChange >= 0 ? 'up' : 'down'} from yesterday
          </p>
          <p className="text-gray-600 mt-2">Previous tickets {previousTickets}</p>
        </div>
        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-xl font-semibold mb-4">Vehicle Specifications</h2>
          <p className="text-3xl font-semibold">{totalVehicleSpecs}</p>
          <p className={`text-${vehicleSpecsChange >= 0 ? 'green' : 'red'}-600`}>
            {vehicleSpecsChange.toFixed(1)}% {vehicleSpecsChange >= 0 ? 'up' : 'down'} from yesterday
          </p>
          <p className="text-gray-600 mt-2">Previous vehicle specifications {previousVehicleSpecs}</p>
        </div>
        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-xl font-semibold mb-4">Locations</h2>
          <p className="text-3xl font-semibold">{locationsData?.length}</p>
          <p className="text-gray-600 mt-2">Total number of locations</p>
        </div>
      </div>

      {/* Include the chart component */}
      <IncomeBookingsChart
        labels={chartLabels}
        incomeData={chartIncomeData}
        bookingsData={chartBookingsData}
      />

      {/* Other components remain unchanged */}
      <div className="bg-white p-6 shadow rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Hire vs Cancel</h2>
        <div className="flex justify-center items-center">
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 32 32" className="w-full h-full">
              <circle cx="16" cy="16" r="16" fill="white" />
              <path
                d="M16 0a16 16 0 110 32A16 16 0 0116 0zm0 3a13 13 0 100 26A13 13 0 0016 3z"
                fill="#4C51BF"
              />
              <path
                d="M16 0a16 16 0 010 32V16z"
                fill="#E53E3E"
              />
              <path
                d="M16 16a16 16 0 01-11.31-4.69L16 16z"
                fill="#DD6B20"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-2xl font-semibold">54%</p>
            </div>
          </div>
          <div className="ml-6">
            <p className="text-gray-600">Total Hired: 54%</p>
            <p className="text-gray-600">Total Canceled: 20%</p>
            <p className="text-gray-600">Total Pending: 26%</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 shadow rounded-md">
        <h2 className="text-xl font-semibold mb-4">Live Car Status</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">No.</th>
                <th className="px-4 py-2 text-left">Car No.</th>
                <th className="px-4 py-2 text-left">Driver</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Earning</th>
                <th className="px-4 py-2 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">01</td>
                <td className="border px-4 py-2">6465</td>
                <td className="border px-4 py-2">Alex Noman</td>
                <td className="border px-4 py-2">Completed</td>
                <td className="border px-4 py-2">$35.44</td>
                <td className="border px-4 py-2">
                  <button className="text-blue-600">Details</button>
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">02</td>
                <td className="border px-4 py-2">5665</td>
                <td className="border px-4 py-2">Razib Rahman</td>
                <td className="border px-4 py-2">Pending</td>
                <td className="border px-4 py-2">$0.00</td>
                <td className="border px-4 py-2">
                  <button className="text-blue-600">Details</button>
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">03</td>
                <td className="border px-4 py-2">1755</td>
                <td className="border px-4 py-2">Luke Norton</td>
                <td className="border px-4 py-2">In route</td>
                <td className="border px-4 py-2">$23.50</td>
                <td className="border px-4 py-2">
                  <button className="text-blue-600">Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 shadow rounded-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Earning Summary</h2>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="mb-6 lg:mb-0">
            <p className="text-gray-600">Total Income</p>
            <p className="text-2xl font-semibold">${totalIncome.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-600">Total Bookings</p>
            <p className="text-2xl font-semibold">{totalBookings}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;