import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const currentDate = new Date().toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center p-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Drilling Management System</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-gray-500 text-sm">
            {currentDate}
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <FaBell size={20} />
          </button>
          <div className="flex items-center">
            <FaUserCircle size={30} className="text-[#3C50E0] mr-2" />
            <span className="font-medium">Kruluz Utsman</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;