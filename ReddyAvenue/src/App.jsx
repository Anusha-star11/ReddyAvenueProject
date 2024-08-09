import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './Pages/Home';
import About from './Pages/About';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import ComplaintDetails from './Pages/ComplaintDetails';
import ComplaintsPage from './Pages/AllComplaints';
import EditComplaint from './Pages/EditComplaint';
import { signoutSuccess } from './redux/user/userSlice'; // Import the signoutSuccess action

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleUnload = () => {
      // Only when the window or tab is being closed, not on navigation
      dispatch(signoutSuccess());
      sessionStorage.removeItem('isAuthenticated');
      navigator.sendBeacon('/logout');
    };

    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route element={<OnlyAdminPrivateRoute/>}>
        <Route path="/sign-up" element={<SignUp />} />
        </Route>
        {/* Public Routes */}
        <Route path="/sign-in" element={<SignIn />} />
       

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/complaint/new" element={<ComplaintDetails />} />
          <Route path="/complaint/:id" element={<ComplaintDetails />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="/editcomplaint/:id" element={<EditComplaint />} />
        </Route>

        {/* Redirect to Home if no route matches */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
