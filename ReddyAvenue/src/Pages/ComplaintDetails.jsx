import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ComplaintDetails() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    date: '',
    complaint: '',
    raisedBy: '',
    status: ''
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.complaint || !formData.raisedBy || !formData.status) {
      setSuccessMessage(null);
      return setErrorMessage("Please fill all fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const baseURL = "http://localhost:3147";
      const res = await fetch(`${baseURL}/api/complaint/createcomplaint`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setSuccessMessage(null);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        setErrorMessage(null);
        setSuccessMessage("Complaint added successfully");
        setFormData({
          date: '',
          complaint: '',
          raisedBy: '',
          status: ''
        });

        // Set timeout to clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage(null);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
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
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <button
            type="submit"
            className="bg-green-500 hover:bg-blue-500 p-2"
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
