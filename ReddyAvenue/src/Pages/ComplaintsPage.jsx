import React from 'react';

function ComplaintsPage({ complaints }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">All Complaints</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-gray-800 rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Complaint</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Raised By</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-gray-200">
                  <td className="py-2 px-4 border-b">{complaint.id}</td>
                  <td className="py-2 px-4 border-b">{complaint.complaint}</td>
                  <td className="py-2 px-4 border-b">{complaint.date}</td>
                  <td className="py-2 px-4 border-b">{complaint.raisedBy}</td>
                  <td className="py-2 px-4 border-b">{complaint.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ComplaintsPage;
