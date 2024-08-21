import { useEffect, useCallback } from 'react';
import { isTokenExpired } from '../hooks/isTokenExpired';
import { useDispatch } from 'react-redux';
import { setFalse } from '../slices/gameDoneSlice';
import { setQuestionnaireDoneFalse } from '../slices/questionnaireDoneSlice';
import { reset } from '../slices/questionnaireSlice';

export const useTokenExpiration = (onTokenExpired) => {
  let dispatch = useDispatch()
  const checkTokenExpiration = useCallback(() => {
    
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
      // Token is expired, log out the user
      localStorage.removeItem('token');
      dispatch(setFalse())
      dispatch(setQuestionnaireDoneFalse())
      dispatch(reset())
      onTokenExpired();
    }
  }, [onTokenExpired, dispatch]);

  useEffect(() => {
    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [checkTokenExpiration]);

  return checkTokenExpiration;
};