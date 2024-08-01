// import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Header from './components/Header';
// import ComplaintDetails from './Pages/ComplaintDetails';
// import ComplaintsPage from './Pages/ComplaintsPage';
import PrivateRoute from './components/PrivateRoute';
import ComplaintDetails from './Pages/ComplaintDetails';
import ComplaintsPage from './Pages/AllComplaints';
import EditComplaint from './Pages/EditComplaint';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [complaints, setComplaints] = useState([
//     { id: 1, date: '2024-07-01', complaint: 'Broken Elevator', raisedBy: 'John Doe', status: 'Pending' }
//   ]);

//   const addComplaint = (newComplaint) => {
//     setComplaints([...complaints, { ...newComplaint, id: complaints.length + 1 }]);
//   };

//   const updateComplaint = (updatedComplaint) => {
//     setComplaints(
//       complaints.map(complaint => (complaint.id === updatedComplaint.id ? updatedComplaint : complaint))
//     );
//   };

//   return (
//     <BrowserRouter>
//       <Header />
//       <Routes>
//         <Route path="/sign-in" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
//         <Route path="/sign-up" element={<SignUp />} />
//         <Route 
//           path="/" 
//           element={<PrivateRoute element={Home} isAuthenticated={isAuthenticated} complaints={complaints} />} 
//         />
//         <Route 
//           path="/about" 
//           element={<PrivateRoute element={About} isAuthenticated={isAuthenticated} />} 
//         />
//         <Route 
//           path="/complaint/new" 
//           element={<PrivateRoute element={ComplaintDetails} isAuthenticated={isAuthenticated} addComplaint={addComplaint} updateComplaint={updateComplaint} complaints={complaints} />} 
//         />
//         <Route 
//           path="/complaint/:id" 
//           element={<PrivateRoute element={ComplaintDetails} isAuthenticated={isAuthenticated} addComplaint={addComplaint} updateComplaint={updateComplaint} complaints={complaints} />} 
//         />
//         <Route 
//           path="/complaints" 
//           element={<PrivateRoute element={ComplaintsPage} isAuthenticated={isAuthenticated} complaints={complaints} />} 
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import SignIn from "./Pages/SignIn"
// import About from "./Pages/About"
// import Home from "./Pages/Home"
// import SignUp from "./Pages/SignUp"
// import Dashboard from "./Pages/Dashboard"
// import Projects from "./Pages/Projects"
// import Header from './components/Header'
// import Footer from './components/Footer'
// import PrivateRoute from './components/PrivateRoute'
// import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
// import CreatePost from './Pages/CreatePost'
// import UpdatePost from './Pages/UpdatePost'
// import PostPage from './Pages/PostPage'
// import Search from './Pages/Search'



function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/complaint/new" element={<ComplaintDetails/>} />
        <Route 
          path="/complaint/:id" element={<ComplaintDetails/>}/>
        <Route 
          path="/complaints" 
          element={<ComplaintsPage/>} 
        />
        <Route path="/editcomplaint/:id" element={<EditComplaint />} />
      </Route>
       
      </Routes>
      

      </BrowserRouter>
  )
}

export default App

