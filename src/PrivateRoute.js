// src/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}