import React from 'react';
import { Navigate } from 'react-router';

export default function ProtectedRoutes({ children, user,url }) {
  console.log(user,"user ------------------");
  if (!user && user?.role !== 'admin') {
    console.log("mtnumaaaaaaa")
    return <Navigate replace to={url} />;
  }
  return children;
}
