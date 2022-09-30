import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLogInStore, useTokenStore } from '../stores/AuthenticateStore';

const PrivateRoutes = () => {
  const isLoggedIn = useLogInStore(state => state.isLoggedIn);
  const token = useTokenStore(state => state.token);

  return (isLoggedIn && token !== '') ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
  
};

export default PrivateRoutes;