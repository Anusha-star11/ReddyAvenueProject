import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({ complaints }) {
  const navigate = useNavigate();

  const handleRaiseComplaint = () => {
    navigate('/complaint/new');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-200 p-4">
          {/* <h2 className="text-2xl font-bold mb-4 text-gray-800">Menu</h2> */}
          <ul>
            <li className="mb-2">
              <a href="/complaints" className="text-gray-800 hover:text-yellow-500">View All Complaints</a>
            </li>
            <li className="mb-2">
              <a href="#posts" className="text-gray-800 hover:text-yellow-500">Posts</a>
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

          {/* Complaints Section */}
          {/* <section id="complaints" className="bg-white text-gray-800 rounded-lg shadow-lg p-4 max-h-64 overflow-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Complaints</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {complaints.map(complaint => (
                <a key={complaint.id} href={`/complaint/${complaint.id}`} className="bg-gradient-to-r from-red-400 to-pink-500 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-1">{complaint.complaint}</h3>
                  <p>{complaint.date}</p>
                  <p>{complaint.raisedBy}</p>
                  <p>{complaint.status}</p>
                </a>
              ))}
            </div>
          </section> */}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-center py-2 w-full">
        <p>© 2024 Reddy Avenue Colony. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
