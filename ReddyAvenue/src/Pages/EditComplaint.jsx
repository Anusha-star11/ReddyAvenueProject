import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import baseURL from '../url';

function EditComplaint() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    complaint: '',
    raisedBy: '',
    status: '',
    images: [],
    comment: '',
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
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
            date: data.date.split('T')[0],
            complaint: data.complaint,
            raisedBy: data.raisedBy,
            status: data.status,
            images: data.images || [],
            comment: data.comment || '',
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
      const formDataToSend = new FormData();
      formDataToSend.append('date', formData.date);
      formDataToSend.append('complaint', formData.complaint);
      formDataToSend.append('raisedBy', formData.raisedBy);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('comment', formData.comment);
  
      formData.images.forEach((image) => {
        if (image instanceof File) {
          formDataToSend.append('images', image);
        } else {
          formDataToSend.append('existingImages', image);
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
    <div className="min-h-screen bg-gray-300 text-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Edit Complaint</h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : errorMessage ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
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
            <div>
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
              {formData.images.length > 0 && (
                <div className="mt-4">
                  <h3 className="block text-sm font-bold mb-2">Current Images:</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <li key={index} className="flex flex-col items-center bg-gray-100 p-2 rounded-md">
                        {!(image instanceof File) ? (
                          <img
                            src={`${baseURL}/${image}`}
                            alt={`Complaint ${index}`}
                            className="w-full h-32 object-cover rounded-md mb-2"
                          />
                        ) : (
                          <span className="mb-2 text-sm">{image.name}</span>
                        )}
                        <button
                          type="button"
                          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
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

            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
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