import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ComplaintDetails() {
  const { id } = useParams();

  const [complaints, setComplaints] = useState([
    { id: 1, date: '2024-07-01', complaint: 'Broken Elevator', raisedBy: 'John Doe', status: 'Pending' },
    { id: 2, date: '2024-07-02', complaint: 'Water Leakage', raisedBy: 'Jane Smith', status: 'Resolved' },
    { id: 3, date: '2024-07-03', complaint: 'Power Outage', raisedBy: 'Alice Johnson', status: 'In Progress' }
  ]);

  const [newComplaint, setNewComplaint] = useState({
    date: '',
    complaint: '',
    raisedBy: '',
    status: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComplaint({ ...newComplaint, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setComplaints(complaints.map(comp => (comp.id === currentComplaint.id ? { ...newComplaint, id: currentComplaint.id } : comp)));
      setIsEditing(false);
      setCurrentComplaint(null);
    } else {
      setComplaints([...complaints, { ...newComplaint, id: complaints.length + 1 }]);
    }
    setNewComplaint({ date: '', complaint: '', raisedBy: '', status: '' });
  };

  const handleEdit = (complaint) => {
    setIsEditing(true);
    setCurrentComplaint(complaint);
    setNewComplaint(complaint);
  };

  const handleDelete = (id) => {
    setComplaints(complaints.filter(complaint => complaint.id !== id));
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
              name="date"
              value={newComplaint.date}
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
              name="complaint"
              value={newComplaint.complaint}
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
              name="raisedBy"
              value={newComplaint.raisedBy}
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
              name="status"
              value={newComplaint.status}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className={`bg-${isEditing ? 'green' : 'blue'}-500 hover:bg-${isEditing ? 'green' : 'blue'}-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {isEditing ? 'Update Complaint' : 'Add Complaint'}
          </button>
        </form>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 py-2">Date</th>
              <th className="border-b-2 py-2">Complaint</th>
              <th className="border-b-2 py-2">Raised By</th>
              <th className="border-b-2 py-2">Status</th>
              <th className="border-b-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'}>
                <td className="border-b py-2">{complaint.date}</td>
                <td className="border-b py-2">{complaint.complaint}</td>
                <td className="border-b py-2">{complaint.raisedBy}</td>
                <td className="border-b py-2">{complaint.status}</td>
                <td className="border-b py-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(complaint)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(complaint.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComplaintDetails;
