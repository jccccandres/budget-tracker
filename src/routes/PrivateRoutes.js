import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from '../includes/Layout';
import { useLogInStore, useTokenStore } from '../stores/AuthenticateStore';

const PrivateRoutes = () => {
  const isLoggedIn = useLogInStore(state => state.isLoggedIn);
  const token = useTokenStore(state => state.token);

  return (isLoggedIn && token !== '') ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/" />
  );
  
};

export default PrivateRoutes;