import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import baseURL from '../url';

function ComplaintDetails() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    date: '',
    complaint: '',
    raisedBy: '',
    status: 'pending',
    images: [],
    comment: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector(state => state.user);

  const handleChange = (e) => {
    if (e.target.name === 'images') {
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
      const formDataToSend = new FormData();
  
      formDataToSend.append('date', formData.date);
      formDataToSend.append('complaint', formData.complaint);
      formDataToSend.append('raisedBy', formData.raisedBy);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('comment', formData.comment);
  
      formData.images.forEach((image) => {
        formDataToSend.append('images', image);
      });
  
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

      const message = `New complaint raised: ${formData.complaint} by ${formData.raisedBy}.`;
      const notifyRes = await fetch(`${baseURL}/api/notify-whatsapp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "+918125353350",
          message: message,
        }),
      });

      const notifyData = await notifyRes.json();
      if (!notifyRes.ok) {
        console.error('WhatsApp API Error:', notifyData);
        setLoading(false);
        return setErrorMessage('Complaint added, but failed to send WhatsApp notification.');
      }
  
      setLoading(false);
      setSuccessMessage(`Complaint added successfully with ${formData.images.length} image(s) and WhatsApp notification sent.`);

      setFormData({
        date: '',
        complaint: '',
        raisedBy: '',
        status: 'pending',
        images: [],
        comment: '',
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
    <div className="min-h-screen bg-gray-300 text-gray-800 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Complaint Details</h2>
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div>
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
          <div>
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
          <div>
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
            <div>
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
          <div>
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
          <div>
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

          {formData.images.length > 0 && (
            <div>
              <h3 className="block text-sm font-bold mb-2">Selected Images:</h3>
              <ul className="list-disc pl-5">
                {formData.images.map((image, index) => (
                  <li key={index} className="text-sm">{image.name}</li>
                ))}
              </ul>
            </div>
          )}

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
          <button
            type="submit"
            className="w-full sm:w-auto bg-orange-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
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