import React, { useState, useEffect } from 'react';

function FrontPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const baseURL = "http://localhost:3147";
        const res = await fetch(`${baseURL}/api/complaint/allcomplaints`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok) {
          setComplaints(data);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const formatDate = (dateString) => {
    return dateString.split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gray-300 text-gray-800 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4">All Complaints</h2>
        {loading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border border-gray-300 text-left">Date</th>
                <th className="py-2 px-4 border border-gray-300 text-left">Complaint</th>
                <th className="py-2 px-4 border border-gray-300 text-left">Raised By</th>
                <th className="py-2 px-4 border border-gray-300 text-left">Status</th>
                <th className="py-2 px-4 border border-gray-300 text-left">Image</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id} className="odd:bg-white even:bg-gray-50">
                  <td className="border px-4 py-2">{formatDate(complaint.date)}</td>
                  <td className="border px-4 py-2 max-w-xs">
                    <span className="truncate block">{complaint.complaint}</span>
                  </td>
                  <td className="border px-4 py-2">{complaint.raisedBy}</td>
                  <td className="border px-4 py-2">{complaint.status}</td>
                  <td className="border px-4 py-2">
                    {complaint.image ? (
                      <img
                        src={`http://localhost:3147/${complaint.image}`}
                        alt="Complaint"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default FrontPage;
