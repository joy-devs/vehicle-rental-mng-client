import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-lg flex justify-between items-center">
      <div className="flex-1 flex justify-center">
        <a className="btn btn-ghost normal-case text-xl">Elite Rides</a>
      </div>
      <div className="flex-1 flex justify-end lg:hidden">
        <button className="btn btn-square btn-ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
