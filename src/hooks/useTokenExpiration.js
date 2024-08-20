import { useEffect, useCallback } from 'react';
import { isTokenExpired } from '../hooks/isTokenExpired';

export const useTokenExpiration = (onTokenExpired) => {
  const checkTokenExpiration = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
      // Token is expired, log out the user
      localStorage.removeItem('token');
      onTokenExpired();
    }
  }, [onTokenExpired]);

  useEffect(() => {
    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [checkTokenExpiration]);

  return checkTokenExpiration;
};