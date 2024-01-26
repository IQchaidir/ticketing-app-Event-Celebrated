'use client';
import { useState } from 'react';

const UserDropdown = ({ userEmail, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button
        className="p-2 hover:bg-black hover:text-white rounded-md"
        onClick={handleDropdownToggle}
      >
        <span className="mr-1">{userEmail}</span>
      </button>

      {isDropdownOpen && (
        <div className="absolute top-11 right-0 bg-white border  shadow-md w-full">
          <button className="block px-4 py-2 text-black hover:bg-gray-200 w-full text-left">
            Manage My Event
          </button>
          <button className="block px-4 py-2 text-black hover:bg-gray-200 w-full text-left">
            Ticket
          </button>
          <button className="block px-4 py-2 text-black hover:bg-gray-200 w-full text-left">
            Credit
          </button>
          <button
            className="block px-4 py-2 text-black hover:bg-gray-200 w-full text-left"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
