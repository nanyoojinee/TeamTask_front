// hooks/useAuth.ts
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 인증 확인 로직...
    setIsAuthenticated(true);
  }, []);

  return isAuthenticated;
};
