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
    images: [], // Updated to handle multiple images
    comment: '', // Added comment field
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
            images: data.images || [], // Ensure images is an array
            comment: data.comment || '', // Ensure comment is handled
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

  const handleDeleteImage = (index) => {
    setFormData((prevFormData) => {
      const updatedImages = prevFormData.images.filter((_, i) => i !== index);
      return { ...prevFormData, images: updatedImages };
    });
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
      formDataToSend.append('comment', formData.comment); // Append comment to the formData
  
      // Append existing images' paths if they are not new files
      formData.images.forEach((image) => {
        if (image instanceof File) {
          formDataToSend.append('images', image); // New files to upload
        } else {
          formDataToSend.append('existingImages', image); // Existing images
        }
      });
  
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
              {/* Display currently stored images with delete option */}
              {formData.images.length > 0 && (
                <div className="mb-4">
                  <h3 className="block text-sm font-bold mb-2">Current Images:</h3>
                  <ul>
                    {formData.images.map((image, index) => (
                      <li key={index} className="flex items-center">
                        {!(image instanceof File) ? (
                          <img
                            src={`http://localhost:3147/${image}`}
                            alt={`Complaint ${index}`}
                            className="w-16 h-16 object-cover rounded-md mr-4"
                          />
                        ) : (
                          <span className="mr-4">{image.name}</span>
                        )}
                        <button
                          type="button"
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handleDeleteImage(index)}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
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
