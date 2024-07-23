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
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Support</h1>
      {success && <p className="text-green-600 text-center mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-blue-600">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full border-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-blue-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full border-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-blue-600">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="textarea textarea-bordered w-full border-blue-600"
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300">
            Submit
          </button>
        </div>
      </form>

      <div className="my-8">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Frequently Asked Questions</h2>
        <div className="collapse collapse-arrow border border-blue-300 bg-blue-100 rounded-box mb-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium text-blue-700">
            How do I reset my password?
          </div>
          <div className="collapse-content">
            <p className="text-blue-600">
              To reset your password, go to the login page and click on "Forgot Password". Follow the instructions to reset your password.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow border border-blue-300 bg-blue-100 rounded-box mb-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium text-blue-700">
            How can I contact customer support?
          </div>
          <div className="collapse-content">
            <p className="text-blue-600">
              You can contact customer support via the support form on this page, or you can email us directly at lilian@gmail.com.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow border border-blue-300 bg-blue-100 rounded-box mb-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium text-blue-700">
            Where can I find your privacy policy?
          </div>
          <div className="collapse-content">
            <p className="text-blue-600">
              Our privacy policy is available on our website. You can find it in the footer section under "Privacy Policy".
            </p>
          </div>
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Contact Information</h2>
        <p className="text-lg text-blue-700">
          <strong>Phone:</strong> (+254) 767546387
        </p>
        <p className="text-lg text-blue-700">
          <strong>Email:</strong> lilian@gmail.com
        </p>
        <p className="text-lg text-blue-700">
          <strong>Address:</strong> Elite Rides, ED 12345
        </p>
      </div>
    </div>
  );
};

export default Support;
