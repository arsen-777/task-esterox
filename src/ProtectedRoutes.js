import React from 'react';
import { Navigate } from 'react-router';

export default function ProtectedRoutes({ children, user,url }) {
  if (!user) {
    return <Navigate replace to={url} />;
  }
  return children;
}
