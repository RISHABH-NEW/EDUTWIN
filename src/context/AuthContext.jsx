import { createContext, useContext, useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('edutwin-auth-user', null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Demo validation — accept any valid-looking credentials
      if (!email || !password) {
        throw new Error('Please fill in all fields.');
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters.');
      }

      const userData = {
        id: Date.now(),
        email,
        name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        avatar: null,
        loginAt: new Date().toISOString(),
      };
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  const signup = useCallback(async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!name || !email || !password) {
        throw new Error('Please fill in all fields.');
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters.');
      }
      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address.');
      }

      const userData = {
        id: Date.now(),
        email,
        name,
        avatar: null,
        loginAt: new Date().toISOString(),
      };
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
  }, [setUser]);

  const clearError = useCallback(() => setError(null), []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    signup,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

// Route guard component
export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default AuthContext;
