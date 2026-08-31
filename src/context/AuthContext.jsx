import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { getDemoUserById, getDemoUserByEmail } from '../data/demoUsers';
import { GraduationCap, Loader2 } from 'lucide-react';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'edutwin-auth-user';

/**
 * Validates a stored user session object.
 * Returns valid user object or null if corrupted/stale.
 */
function getValidatedStoredUser() {
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw || raw.trim() === '') {
      return null;
    }
    if (raw === 'null' || raw === 'undefined') {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    // Must have valid string properties
    if (!parsed.name || typeof parsed.name !== 'string' || !parsed.name.trim()) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    if (!parsed.email || typeof parsed.email !== 'string' || !parsed.email.trim()) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    // If it is marked as a demo account, ensure it exists in our demo database
    if (parsed.demoKey) {
      const demoUser = getDemoUserById(parsed.demoKey) || getDemoUserByEmail(parsed.email);
      if (!demoUser) {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        return null;
      }
    }

    return parsed;
  } catch (error) {
    console.warn('Corrupted or invalid auth session in localStorage, clearing:', error);
    try {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      window.localStorage.removeItem('edutwin-current-user');
    } catch {}
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(() => getValidatedStoredUser());
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize and validate auth on initial mount
  useEffect(() => {
    const validatedUser = getValidatedStoredUser();
    setUserState(validatedUser);
    setIsAuthInitialized(true);
  }, []);

  const persistUser = useCallback((userData) => {
    if (userData && userData.name && userData.email) {
      try {
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
        window.localStorage.removeItem('edutwin-current-user'); // clean legacy alias if any
      } catch (err) {
        console.warn('Failed to write auth session to localStorage:', err);
      }
      setUserState(userData);
    } else {
      try {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        window.localStorage.removeItem('edutwin-current-user');
      } catch (err) {
        console.warn('Failed to remove auth session from localStorage:', err);
      }
      setUserState(null);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate brief network delay
      await new Promise(resolve => setTimeout(resolve, 350));

      if (!email || !password) {
        throw new Error('Please fill in all fields.');
      }
      if (password.length < 4) {
        throw new Error('Password must be at least 4 characters.');
      }

      const normalizedEmail = email.trim().toLowerCase();
      const demoUser = getDemoUserByEmail(normalizedEmail);
      let userData;

      if (demoUser) {
        userData = {
          id: demoUser.id,
          email: demoUser.email,
          name: demoUser.name,
          avatar: demoUser.profile?.avatar || null,
          demoKey: demoUser.id,
          loginAt: new Date().toISOString(),
        };
      } else {
        // Standard user credentials
        userData = {
          id: `user_${Date.now()}`,
          email: email.trim(),
          name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          avatar: null,
          loginAt: new Date().toISOString(),
        };
      }

      persistUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [persistUser]);

  const loginAsDemoUser = useCallback(async (demoId) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 250));
      const demoUser = getDemoUserById(demoId) || getDemoUserByEmail(demoId);
      if (!demoUser) {
        throw new Error('Demo account not found.');
      }

      const userData = {
        id: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
        avatar: demoUser.profile?.avatar || null,
        demoKey: demoUser.id,
        loginAt: new Date().toISOString(),
      };

      persistUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [persistUser]);

  const signup = useCallback(async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 400));

      if (!name || !email || !password) {
        throw new Error('Please fill in all fields.');
      }
      if (password.length < 4) {
        throw new Error('Password must be at least 4 characters.');
      }
      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address.');
      }

      const userData = {
        id: `user_${Date.now()}`,
        email: email.trim(),
        name: name.trim(),
        avatar: null,
        loginAt: new Date().toISOString(),
      };

      persistUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [persistUser]);

  const logout = useCallback(() => {
    persistUser(null);
    setError(null);
  }, [persistUser]);

  const clearError = useCallback(() => setError(null), []);

  const isAuthenticated = Boolean(isAuthInitialized && user && user.name && user.email);

  const value = {
    user,
    currentUser: user,
    isAuthenticated,
    isAuthInitialized,
    isLoading,
    error,
    login,
    loginAsDemoUser,
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
  const { isAuthenticated, isAuthInitialized } = useAuth();

  // If auth is still initializing on first load/refresh, render loading indicator
  // Do NOT prematurely redirect to /login
  if (!isAuthInitialized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-100">
        <div className="flex items-center gap-3 mb-4 animate-pulse">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-md">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-surface-900 dark:text-surface-100">EduTwin</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
          <Loader2 className="w-4 h-4 animate-spin text-primary-600 dark:text-primary-400" />
          <span>Loading session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AuthContext;
