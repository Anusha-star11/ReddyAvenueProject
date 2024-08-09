import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditComplaint() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    complaint: '',
    raisedBy: '',
    status: '',
    image: null, // New field for image
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const baseURL = "http://localhost:3147";
        const res = await fetch(`${baseURL}/api/complaint/${id}`, {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          credentials: 'include', 
        });
        const data = await res.json();
        if (res.ok) {
          setFormData({
            date: data.date.split('T')[0], // Format the date for the input field
            complaint: data.complaint,
            raisedBy: data.raisedBy,
            status: data.status,
            image: data.image,
          });
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] }); // Handle file input
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseURL = "http://localhost:3147";
      const formDataToSend = new FormData(); // Use FormData for file upload
      formDataToSend.append('date', formData.date);
      formDataToSend.append('complaint', formData.complaint);
      formDataToSend.append('raisedBy', formData.raisedBy);
      formDataToSend.append('status', formData.status);
      if (formData.image instanceof File) { // Check if a new image is uploaded
        formDataToSend.append('image', formData.image);
      }

      const res = await fetch(`${baseURL}/api/complaint/updatecomplaint/${id}`, {
        method: "PUT",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend,
        credentials: 'include', 
      });
      const data = await res.json();
      if (res.ok) {
        navigate('/complaints');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 text-gray-800 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4">Edit Complaint</h2>
        {loading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <form onSubmit={handleSubmit} className="mb-8" encType="multipart/form-data">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="complaint">
                Complaint
              </label>
              <input
                type="text"
                id="complaint"
                name="complaint"
                value={formData.complaint}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="raisedBy">
                Raised By
              </label>
              <input
                type="text"
                id="raisedBy"
                name="raisedBy"
                value={formData.raisedBy}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="status">
                Status
              </label>
              <input
                type="text"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="image">
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                accept="image/*"
              />
              {formData.image && !(formData.image instanceof File) && (
                <img
                  src={`http://localhost:3147/${formData.image}`}
                  alt="Complaint"
                  className="w-16 h-16 object-cover rounded-md mt-2"
                />
              )}
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
              type="submit"
              className="bg-green-500 hover:bg-blue-500 p-2"
            >
              Update Complaint
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditComplaint;
