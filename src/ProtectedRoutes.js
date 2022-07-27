import React from 'react';
import { Navigate } from 'react-router';

export default function ProtectedRoutes({ children, state }) {
  console.log(state.username);
  if (!state.username) {
    return <Navigate replace to="/login" />;
  }
  return children;
}
