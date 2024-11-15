import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

function ProtectedRoute({ children }) {
  // The ProtectedRoute component will render the children (protected route) if the user is authenticated
  // Otherwise, it redirects the user to the login page
  return isAuthenticated() ? (
    // If user is authenticated, render the children components
    children
  ) : (
    // If the user is not authenticated, redirect to the login page
    <Navigate to="/login" />
  );
}

export default ProtectedRoute; // Exporting the ProtectedRoute component for use in other parts of the app
