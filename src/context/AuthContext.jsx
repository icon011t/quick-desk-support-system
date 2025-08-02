// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

// Exported so you can do: import { AuthContext } from '...'
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('quickdesk_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Error parsing user from localStorage:', err);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('quickdesk_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quickdesk_user');
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use context
export function useAuth() {
  return useContext(AuthContext);
}

// Optionally export default (ONLY if you're using default import elsewhere)
export default AuthContext;
