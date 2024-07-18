import React, { useState } from 'react';

const Support: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('Your message has been sent successfully.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container mx-auto  p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Support</h1>
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            How do I reset my password?
          </div>
          <div className="collapse-content">
            <p>
              To reset your password, go to the login page and click on "Forgot
              Password". Follow the instructions to reset your password.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            How can I contact customer support?
          </div>
          <div className="collapse-content">
            <p>
              You can contact customer support via the support form on this
              page, or you can email us directly at lilian@gmail.com.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Where can I find your privacy policy?
          </div>
          <div className="collapse-content">
            <p>
              Our privacy policy is available on our website. You can find it
              in the footer section under "Privacy Policy".
            </p>
          </div>
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <p className="text-lg">
          <strong>Phone:</strong> (+254) 767546387
        </p>
        <p className="text-lg">
          <strong>Email:</strong> lilian@gmail.com
        </p>
        <p className="text-lg">
          <strong>Address:</strong> (+254) 767546387 Elite Rides, ED 12345
        </p>
      </div>
    </div>
  );
};

export default Support;
