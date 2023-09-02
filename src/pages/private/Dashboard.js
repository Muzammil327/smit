import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthContext";

export const DashboardProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export const LoginProtectedRoute = ({ children }) => {
  const { user } = UserAuth(); // Make sure UserAuth provides user data

  if (user) {
    return <Navigate to="/notes/dashboard" />;
  } else {
    return <Navigate to="/auth/register" />;
  }

  // eslint-disable-next-line no-unreachable
  return children;
};
