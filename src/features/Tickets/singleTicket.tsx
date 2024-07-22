import React, { useEffect, useState } from 'react';
import { useFetchUserWithTicketsQuery } from '../users/UserAPi'; // Adjust the import according to your project structure
import { Toaster, toast } from 'sonner';
import { useCreateTicketMutation} from './ticketsApi'

export interface Ticket {
  ticket_id: number;
  user_id: number;
  subject: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const SingleUserTickets: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');
  const [addTicket] = useCreateTicketMutation();

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(Number(storedUserId));
      console.log(`User ID from localStorage is: ${storedUserId}`);
    } else {
      toast.error('User ID not found in local storage');
      console.log('User ID not found in local storage');
    }
  }, []);

  const { data, isLoading, isError, error,refetch } = useFetchUserWithTicketsQuery(userId, {
    skip: userId === null, // Only fetch when userId is set
  });

  const user = data ? data[0] : null;

  useEffect(() => {
    if (userId) {
      console.log(`Fetching tickets for user ID: ${userId}`);
    }
  }, [userId]);

  useEffect(() => {
    if (isError) {
      console.error('Error fetching user tickets:', error);
    } else if (user) {
      console.log('Fetched user with tickets:', user);
    }
  }, [isError, error, user]);

  const handleAddTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId) {
      try {
        await addTicket({ user_id: userId, subject, description, status }).unwrap();
        toast.success('Ticket added successfully');
        setSubject('');
        setDescription('');
        setStatus('open');
        refetch();
      } catch (error) {
        toast.error('Failed to add ticket');
        console.error('Failed to add ticket:', error);
      }
    } else {
      toast.error('User ID not found');
    }
  };

  

  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
      <div className="overflow-x-auto bg-gray-800 text-white rounded-lg p-4">
        <h1 className="text-xl my-4">My Tickets</h1>
        <form onSubmit={handleAddTicket} className="mb-4">
          <div className="mb-2">
            <label className="block text-white">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-white">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded"
              required
            ></textarea>
          </div>
          <div className="mb-2">
            <label className="block text-white">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 rounded"
              required
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 p-2 rounded text-white">
            Add Ticket
          </button>
        </form>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error: {error?.data?.message || 'An error occurred'}</p>
        ) : user && user.supportTickets ? (
          <table className="table table-xs">
            <thead>
              <tr>
                <th className="text-white">Ticket ID</th>
                <th className="text-white">User ID</th>
                <th className="text-white">SUBJECT</th>
                <th className="text-white">DESCRIPTION</th>
                <th className="text-white">STATUS</th>
                <th className="text-white">Created At</th>
                <th className="text-white">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {user.supportTickets.map((ticket: Ticket, index: number) => (
                <tr key={index}>
                  <th>{ticket.ticket_id}</th>
                  <td>{ticket.user_id}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.description}</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.created_at}</td>
                  <td>{ticket.updated_at}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr><td colSpan={7}>{user.supportTickets.length} records</td></tr>
            </tfoot>
          </table>
        ) : (
          <p>No tickets found for this user</p>
        )}
      </div>
    </>
  );
};

export default SingleUserTickets;