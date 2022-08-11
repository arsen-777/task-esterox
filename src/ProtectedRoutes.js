import React from 'react';
import { Navigate } from 'react-router';

export default function ProtectedRoutes({ children, user }) {
  if (!user) {
    return <Navigate replace to="/login" />;
  }
  return children;
}
