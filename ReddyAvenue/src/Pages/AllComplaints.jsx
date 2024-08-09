import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AllComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [filters, setFilters] = useState({
    date: '',
    raisedByOrder: '',
    status: '',
  });
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const baseURL = "http://localhost:3147";
        const res = await fetch(`${baseURL}/api/complaint/allcomplaints`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          setComplaints(data);
          setFilteredComplaints(data);
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      try {
        const baseURL = "http://localhost:3147";
        const res = await fetch(`${baseURL}/api/complaint/deletecomplaint/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          credentials: 'include',
        });
        if (res.ok) {
          const updatedComplaints = complaints.filter(complaint => complaint._id !== id);
          setComplaints(updatedComplaints);
          setFilteredComplaints(updatedComplaints);
        } else {
          const data = await res.json();
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/editcomplaint/${id}`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });

    applyFilters({ ...filters, [name]: value });
  };

  const applyFilters = (appliedFilters) => {
    let filteredData = [...complaints];

    if (appliedFilters.date) {
      filteredData = filteredData.filter(complaint => complaint.date.split('T')[0] === appliedFilters.date);
    }

    if (appliedFilters.raisedByOrder) {
      filteredData = filteredData.sort((a, b) => {
        if (appliedFilters.raisedByOrder === 'A-Z') {
          return a.raisedBy.localeCompare(b.raisedBy);
        } else if (appliedFilters.raisedByOrder === 'Z-A') {
          return b.raisedBy.localeCompare(a.raisedBy);
        }
        return 0;
      });
    }

    if (appliedFilters.status) {
      filteredData = filteredData.filter(complaint => complaint.status.toLowerCase() === appliedFilters.status.toLowerCase());
    }

    setFilteredComplaints(filteredData);
  };

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
                <th className="py-2 px-4 border border-gray-300 text-left">Image</th> {/* New Image Column */}
                {currentUser.user.isAdmin && <th className="py-2 px-4 border border-gray-300 text-left">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => (
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
 {/* Display the Image */}
                  {currentUser.user.isAdmin && <td className="border px-4 py-2 flex items-center">
                    <button 
                      onClick={() => handleEdit(complaint._id)} 
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(complaint._id)} 
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AllComplaints;
