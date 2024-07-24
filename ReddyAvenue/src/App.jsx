import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import Dashboard from "./Pages/Dashboard"
import Header from "./components/Header"
import ComplaintDetails from "./Pages/ComplaintDetails"
import ComplaintsPage from './Pages/ComplaintsPage';

function App() {
  const [complaints, setComplaints] = useState([
    { id: 1, date: '2024-07-01', complaint: 'Broken Elevator', raisedBy: 'John Doe', status: 'Pending' }
  ]);

  const addComplaint = (newComplaint) => {
    setComplaints([...complaints, { ...newComplaint, id: complaints.length + 1 }]);
  };

  const updateComplaint = (updatedComplaint) => {
    setComplaints(
      complaints.map(complaint => (complaint.id === updatedComplaint.id ? updatedComplaint : complaint))
    );
  };

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home complaints={complaints}/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/complaint/new" element={<ComplaintDetails addComplaint={addComplaint} updateComplaint={updateComplaint} complaints={complaints} />} />
      <Route path="/complaint/:id" element={<ComplaintDetails addComplaint={addComplaint} updateComplaint={updateComplaint} complaints={complaints} />} />
      <Route path="/complaints" element={<ComplaintsPage complaints={complaints} />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
