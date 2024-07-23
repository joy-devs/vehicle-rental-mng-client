import React, { useEffect, useState } from 'react';
import { TPayment, useGetPaymentsQuery } from '../../features/Payments/PaymentsApi';
import { useGetBookingsQuery } from '../../features/ABookings/ABookingApi';
import { useFetchUsersQuery } from '../users/UserAPi';
import { useGetTicketsQuery } from '../../features/Tickets/ticketsApi';
import { useFetchVehicleSpecificationsQuery } from '../../features/vehicleSpec/vehicleSpecApi';
import { useGetLocationsQuery } from '../../features/locations/locationApi';

const AdminDashboard: React.FC = () => {
  const { data: paymentsData, isLoading: paymentsLoading } = useGetPaymentsQuery();
  const { data: bookingsData, isLoading: bookingsLoading } = useGetBookingsQuery();
  const { data: usersData, isLoading: usersLoading } = useFetchUsersQuery();
  const { data: ticketsData, isLoading: ticketsLoading } = useGetTicketsQuery();
  const { data: vehicleSpecsData, isLoading: vehicleSpecsLoading } = useFetchVehicleSpecificationsQuery();
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

      <div className="bg-white p-6 shadow rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Hire vs Cancel</h2>
        <div className="flex justify-center items-center">
          <div className="w-40 h-40 bg-blue-200 flex justify-center items-center">
            {/* Placeholder for Hire vs Cancel chart */}
            Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
