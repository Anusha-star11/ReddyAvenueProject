import React, { useState, useEffect } from 'react';
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
    complaintSearch: '',
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-100 text-gray-800 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-8">
        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">All Complaints</h2>
        {loading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-1 sm:py-2 px-2 sm:px-4 border border-gray-300 text-left w-24 sm:w-32">
                    Date
                    <input 
                      type="date" 
                      name="date"
                      value={filters.date}
                      onChange={handleFilterChange}
                      className="block mt-1 w-full border border-gray-300 rounded-md text-xs sm:text-sm"
                    />
                  </th>
                  <th className="py-1 sm:py-2 px-2 sm:px-4 border border-gray-300 text-left w-40 sm:w-64">
                    Complaint
                    <input 
                      type="text" 
                      name="complaintSearch"
                      placeholder="Search"
                      value={filters.complaintSearch}
                      onChange={handleFilterChange}
                      className="block mt-1 w-full border border-gray-300 rounded-md text-xs sm:text-sm"
                    />
                  </th>
                  <th className="py-1 sm:py-2 px-2 sm:px-4 border border-gray-300 text-left">
                    Raised By
                    <select 
                      name="raisedByOrder" 
                      value={filters.raisedByOrder} 
                      onChange={handleFilterChange}
                      className="block mt-1 w-full border border-gray-300 rounded-md text-xs sm:text-sm"
                    >
                      <option value="">Sort</option>
                      <option value="A-Z">A-Z</option>
                      <option value="Z-A">Z-A</option>
                    </select>
                  </th>
                  <th className="py-1 sm:py-2 px-2 sm:px-4 border border-gray-300 text-left">
                    Status
                    <select 
                      name="status" 
                      value={filters.status} 
                      onChange={handleFilterChange}
                      className="block mt-1 w-full border border-gray-300 rounded-md text-xs sm:text-sm"
                    >
                      <option value="">Filter</option>
                      <option value="pending">Pending</option>
                      <option value="inprogress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </th>
                  <th className="py-1 sm:py-2 px-2 sm:px-4 border border-gray-300 text-left">Comment</th>
                  <th className="py-1 sm:py-2 px-2 sm:px-4 border border-gray-300 text-left">Image</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint) => (
                  <tr key={complaint._id} className="odd:bg-white even:bg-gray-50">
                    <td className="border px-2 sm:px-4 py-1 sm:py-2 w-24 sm:w-32">{formatDate(complaint.date)}</td>
                    <td className="border px-2 sm:px-4 py-1 sm:py-2 max-w-xs w-40 sm:w-64">
                      <span className="truncate block">{complaint.complaint}</span>
                    </td>
                    <td className="border px-2 sm:px-4 py-1 sm:py-2">{complaint.raisedBy}</td>
                    <td className="border px-2 sm:px-4 py-1 sm:py-2">{complaint.status}</td>
                    <td className="border px-2 sm:px-4 py-1 sm:py-2">{complaint.comment}</td>
                    <td className="border px-2 sm:px-4 py-1 sm:py-2">
                      {complaint.images && complaint.images.length > 0 ? (
                        <img
                          src={`http://localhost:3147/${complaint.images[0]}`}
                          alt="Complaint"
                          className="w-10 h-10 sm:w-16 sm:h-16 object-cover rounded-md cursor-pointer"
                          onClick={() => handleImageClick(complaint.images)}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4 sm:p-8">
          <div className="bg-white py-8 px-6 rounded-lg max-w-full sm:max-w-3xl w-full relative">
            <button 
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
              onClick={closeModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center justify-between space-x-2">
              <button 
                className="text-gray-700 hover:text-gray-900 focus:outline-none px-3 py-2 bg-white rounded-full shadow-lg"
                onClick={handlePrevImage}
              >
                &lt; {/* Left Arrow */}
              </button>
              <div className="w-full flex justify-center">
                <img
                  src={`http://localhost:3147/${selectedImages[currentImageIndex]}`}
                  alt={`Complaint ${currentImageIndex + 1}`}
                  className="max-h-[250px] sm:max-h-[450px] object-cover rounded-lg"
                />
              </div>
              <button 
                className="text-gray-700 hover:text-gray-900 focus:outline-none px-3 py-2 bg-white rounded-full shadow-lg"
                onClick={handleNextImage}
              >
                &gt; {/* Right Arrow */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllComplaints;