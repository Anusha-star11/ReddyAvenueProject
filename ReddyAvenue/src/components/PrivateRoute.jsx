// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ element: Component, isAuthenticated, ...rest }) => {
//   return isAuthenticated ? <Component {...rest} /> : <Navigate to="/sign-in" />;
// };

// export default PrivateRoute;

import { useSelector } from "react-redux"
import { Outlet,Navigate } from "react-router-dom";

export default function PrivateRoute() {
    const {currentUser}=useSelector(state=>state.user);
  return currentUser ? <Outlet/> : <Navigate to='/sign-in'/>;
  
}
