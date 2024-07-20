// Profile.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ProfileFormValues {
  name: string;
  email: string;
  bio: string;
}

interface ProfileData {
  id: number;
  name: string;
  email: string;
  bio: string;
}

const UserProfile: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormValues>();
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [nextId, setNextId] = useState(1);

  const onSubmit: SubmitHandler<ProfileFormValues> = data => {
    const newProfile = { id: nextId, ...data };
    setProfiles([...profiles, newProfile]);
    setNextId(nextId + 1);
    reset();
  };

  const deleteProfile = (id: number) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="input input-bordered w-full"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address'
                }
              })}
              className="input input-bordered w-full"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Bio</label>
            <textarea
              {...register('bio', { required: 'Bio is required' })}
              className="textarea textarea-bordered w-full"
            />
            {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-full">Create Profile</button>
        </form>
        
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Created Profiles</h3>
          {profiles.length === 0 ? (
            <p className="text-gray-500">No profiles created.</p>
          ) : (
            <ul className="space-y-4">
              {profiles.map(profile => (
                <li key={profile.id} className="p-4 border rounded-md shadow-sm">
                  <h4 className="text-lg font-semibold">{profile.name}</h4>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Bio:</strong> {profile.bio}</p>
                  <button
                    onClick={() => deleteProfile(profile.id)}
                    className="btn btn-error mt-2"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
