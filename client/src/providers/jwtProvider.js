import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

export default function JwtProvider({ children }) {
  const { initializeAuth } = useAuth();
  useEffect(() => {
    initializeAuth();
  }, []);

  return <>{children}</>;
}
