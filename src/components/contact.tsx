import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-900">Contact Us</h2>
        <form className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input 
              type="text" 
              placeholder="Your name" 
              className="input input-bordered w-full" 
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input 
              type="email" 
              placeholder="Your email" 
              className="input input-bordered w-full" 
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea 
              placeholder="Your message" 
              className="textarea textarea-bordered w-full" 
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Send Message</button>
          </div>
        </form>
      </div>
      <footer className="mt-8 text-center text-gray-600">
        <p>Contact Information:</p>
        <p>Email: contact@example.com</p>
        <p>Phone: +1234567890</p>
        <p>Address: 123 Main St, City, Country</p>
      </footer>
    </div>
  );
};

export default ContactUs;
