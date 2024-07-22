import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchUserByIdQuery } from './userapi';

interface UserDetailsProps {
  userId?: number;
}

const UserDetails: React.FC<UserDetailsProps> = ({ userId }) => {
  const { user_id } = useParams<{ user_id: string }>();
  const navigate = useNavigate();
  
  const id = userId || parseInt(user_id!);
  const { data: user, isLoading, error } = useFetchUserByIdQuery(id, {
    skip: !id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user details</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      {user && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p><strong>Full Name:</strong> {user.full_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Contact Phone:</strong> {user.contact_phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Created At:</strong> {user.created_at}</p>
          <p><strong>Updated At:</strong> {user.updated_at}</p>
          <button onClick={() => navigate(-1)} className="btn btn-secondary mt-4">Go Back</button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;