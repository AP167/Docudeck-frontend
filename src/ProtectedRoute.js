// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth from your AuthContext

const ProtectedRoute = ({ allowedRoles, element }) => {
  const { currentUserRole } = useAuth(); // Get the current user's role from the context
  console.log('ProtectedRoute ---> ', currentUserRole);

  if (!currentUserRole || !allowedRoles.includes(currentUserRole)) {
    // Redirect to home or sign-in page if not authorized
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
