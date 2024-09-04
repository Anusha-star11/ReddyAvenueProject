import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ComplaintDetails() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    date: '',
    complaint: '',
    raisedBy: '',
    status: 'pending', // Default status
    images: [], // Initialize images as an array
    comment: '', // Added comment field
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector(state => state.user);

  const handleChange = (e) => {
    if (e.target.name === 'images') {
      // Append new files to the existing files in formData.images
      const selectedFiles = Array.from(e.target.files);
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: [...prevFormData.images, ...selectedFiles],
      }));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.complaint || !formData.raisedBy || !formData.date) {
      setSuccessMessage(null);
      return setErrorMessage("Please fill all fields");
    }
  
    try {
      setLoading(true);
      setErrorMessage(null);
      const baseURL = "http://localhost:3147";
      const formDataToSend = new FormData();
  
      formDataToSend.append('date', formData.date);
      formDataToSend.append('complaint', formData.complaint);
      formDataToSend.append('raisedBy', formData.raisedBy);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('comment', formData.comment); // Append comment field
  
      formData.images.forEach((image) => {
        formDataToSend.append('images', image);
      });
  
      // Step 1: Submit the complaint
      const res = await fetch(`${baseURL}/api/complaint/createcomplaint`, {
        method: "POST",
        body: formDataToSend,
        credentials: 'include',
      });
  
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      // Step 2: Send WhatsApp notification after complaint is successfully added
      const message = `New complaint raised: ${formData.complaint} by ${formData.raisedBy}.`;
      await fetch(`${baseURL}/api/notify-whatsapp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "whatsapp:+1234567890", // Replace with the WhatsApp group number
          message: message,
        }),
      });
  
      setLoading(false);
      setSuccessMessage(`Complaint added successfully with ${formData.images.length} image(s) and WhatsApp notification sent.`);

      // Reset form data
      setFormData({
        date: '',
        complaint: '',
        raisedBy: '',
        status: 'pending',
        images: [],
        comment: '', // Reset comment field
      });
  
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage(null);
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-300 text-gray-800 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4">Complaint Details</h2>
        <form onSubmit={handleSubmit} className="mb-8">
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
          {currentUser.user.isAdmin && (
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="comment">
              Comment
            </label>
            <input
              type="text"
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="images">
              Upload Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              accept="image/*"
              multiple
            />
          </div>

          {/* Display the list of selected images */}
          {formData.images.length > 0 && (
            <div className="mb-4">
              <h3 className="block text-sm font-bold mb-2">Selected Images:</h3>
              <ul>
                {formData.images.map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
            </div>
          )}

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-blue-500 p-2 rounded-lg"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Complaint'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ComplaintDetails;
