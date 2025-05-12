import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// ProtectedRoute checks if the user is logged in
const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token'); 
  
  return (
    <Route
      {...rest}
      element={token ? element : <Navigate to="/login" />} 
    />
  );
};

export default ProtectedRoute;
