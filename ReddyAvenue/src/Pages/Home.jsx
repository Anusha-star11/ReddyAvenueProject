import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegListAlt, FaRegEdit } from 'react-icons/fa';

function HomePage() {
  const navigate = useNavigate();

  const handleRaiseComplaint = () => {
    navigate('/complaint/new');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
      <div className="flex flex-grow">
        {/* Sidebarrr */}
        <div className="w-1/4 bg-gray-600 p-4">
          <h2 className="text-2xl font-bold mb-4 text-yellow-500">Menu</h2>
          <ul>
            <li className="mb-4 flex items-center">
              <FaRegListAlt className="mr-3 text-yellow-500 text-xl" />
              <a href="/complaints" className="text-lg font-semibold text-gray-100 hover:text-yellow-500">View All Complaints</a>
            </li>
            <li className="mb-4 flex items-center">
              <FaRegEdit className="mr-3 text-yellow-500 text-xl" />
              <a href="#posts" className="text-lg font-semibold text-gray-100 hover:text-yellow-500">Posts</a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome to Our Society</h1>
            <p className="text-lg">Manage and raise your complaints easily</p>
            <button 
              onClick={handleRaiseComplaint}
              className="mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Raise a Complaint
            </button>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-center py-2 w-full">
        <p>© 2024 Reddy Avenue Colony. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
