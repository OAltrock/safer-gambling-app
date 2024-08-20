import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTokenExpiration } from '../hooks/useTokenExpiration';

function AuthWrapper() {
  const navigate = useNavigate();

  const handleTokenExpired = () => {
    navigate('/Login');
  };

  useTokenExpiration(handleTokenExpired);

  return <Outlet />;
}

export default AuthWrapper;