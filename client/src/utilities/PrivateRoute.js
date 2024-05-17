import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext'; // Replace with your context path

function PrivateRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />; // Redirect to login on unauthorized access
  }

  return children;
}

export default PrivateRoute;