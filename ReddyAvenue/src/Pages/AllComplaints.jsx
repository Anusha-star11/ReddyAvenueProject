import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import baseURL from '../url';

function AllComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [filters, setFilters] = useState({
    date: '',
    raisedByOrder: '',
    status: '',
    complaintSearch: '',
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
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

    if (appliedFilters.status && appliedFilters.status !== "") {
      filteredData = filteredData.filter(complaint => 
        complaint.status.toLowerCase() === appliedFilters.status.toLowerCase()
      );
    }

    if (appliedFilters.complaintSearch) {
      filteredData = filteredData.filter(complaint =>
        complaint.complaint.toLowerCase().includes(appliedFilters.complaintSearch.toLowerCase())
      );
    }

    setFilteredComplaints(filteredData);
  };

  const formatDate = (dateString) => {
    return dateString.split('T')[0];
  };

  const handleImageClick = (images) => {
    setSelectedImages(images);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImages([]);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4 sm:p-8">
      <div className="max-w-full sm:max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">All Complaints</h2>
        {loading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-2 sm:px-4 border border-gray-300 text-left">
                    <span className="block text-sm sm:text-base font-semibold">Date</span>
                    <input 
                      type="date" 
                      name="date"
                      value={filters.date}
                      onChange={handleFilterChange}
                      className="block mt-1 w-full border border-gray-300 rounded-md text-sm"
                    />
                  </th>
                  <th className="py-2 px-2 sm:px-4 border border-gray-300 text-left">
                    <span className="block text-sm sm:text-base font-semibold">Complaint</span>
                    <input 
                      type="text" 
                      name="complaintSearch"
                      placeholder="Search"
                      value={filters.complaintSearch}
                      onChange={handleFilterChange}
                      className="block mt-1 w-full border border-gray-300 rounded-md text-sm"
                    />
                  </th>
                  <th className="py-2 px-2 sm:px-4 border border-gray-300 text-left">
                    <span className="block text-sm sm:text-base font-semibold">Raised By</span>
                    <select 
                      name="raisedByOrder" 
                      value={filters.raisedByOrder} 
                      onChange={handleFilterChange}
                      className="block mt-1 w-full border border-gray-300 rounded-md text-sm"
                    >
                      <option value="">Sort</option>
                      <option value="A-Z">A-Z</option>
                      <option value="Z-A">Z-A</option>
                    </select>
                  </th>
                  <th className="py-2 px-2 sm:px-4 border border-gray-300 text-left">
                    <span className="block text-sm sm:text-base font-semibold">Status</span>
                    <select 
                      name="status" 
                      value={filters.status} 
                      onChange={handleFilterChange}
                      className="block mt-1 w-full border border-gray-300 rounded-md text-sm"
                    >
                      <option value="">All</option>
                      <option value="pending">Pending</option>
                      <option value="inprogress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </th>
                  <th className="py-2 px-2 sm:px-4 border border-gray-300 text-left">
                    <span className="block text-sm sm:text-base font-semibold">Comment</span>
                  </th>
                  <th className="py-2 px-2 sm:px-4 border border-gray-300 text-left">
                    <span className="block text-sm sm:text-base font-semibold">Image</span>
                  </th>
                  {currentUser.user.isAdmin && (
                    <th className="py-2 px-2 sm:px-4 border border-gray-300 text-left">
                      <span className="block text-sm sm:text-base font-semibold">Actions</span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint) => (
                  <tr key={complaint._id} className="odd:bg-white even:bg-gray-50">
                    <td className="border px-2 sm:px-4 py-2 text-sm">{formatDate(complaint.date)}</td>
                    <td className="border px-2 sm:px-4 py-2 max-w-xs text-sm">
                      <span className="truncate block">{complaint.complaint}</span>
                    </td>
                    <td className="border px-2 sm:px-4 py-2 text-sm">{complaint.raisedBy}</td>
                    <td className="border px-2 sm:px-4 py-2 text-sm">{complaint.status}</td>
                    <td className="border px-2 sm:px-4 py-2 text-sm">{complaint.comment}</td>
                    <td className="border px-2 sm:px-4 py-2 text-sm">
                      {complaint.images && complaint.images.length > 0 ? (
                        <img
                          src={`${complaint.images[0]}`}
                          alt="Complaint"
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md cursor-pointer"
                          onClick={() => handleImageClick(complaint.images)}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    {currentUser.user.isAdmin && (
                      <td className="border px-2 sm:px-4 py-2 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <button 
                          onClick={() => handleEdit(complaint._id)} 
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm w-full sm:w-auto"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(complaint._id)} 
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm w-full sm:w-auto"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
          <div className="bg-white py-6 px-4 sm:py-8 sm:px-6 rounded-lg max-w-3xl w-full relative">
            <button 
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-700 hover:text-gray-900"
              onClick={closeModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center justify-between space-x-2">
              <button 
                className="text-gray-700 hover:text-gray-900 focus:outline-none px-2 py-1 sm:px-3 sm:py-2 bg-white rounded-full shadow-lg"
                onClick={handlePrevImage}
              >
                &lt;
              </button>
              <div className="w-full flex justify-center">
                <img
                  src={`${baseURL}/${selectedImages[currentImageIndex]}`}
                  alt={`Complaint ${currentImageIndex + 1}`}
                  className="max-h-[300px] sm:max-h-[450px] object-cover rounded-lg"
                />
              </div>
              <button 
                className="text-gray-700 hover:text-gray-900 focus:outline-none px-2 py-1 sm:px-3 sm:py-2 bg-white rounded-full shadow-lg"
                onClick={handleNextImage}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllComplaints;