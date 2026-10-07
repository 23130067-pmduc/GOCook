import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiRequest, unwrap } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    try {
      const data = await apiRequest('/api/v1/users/profile');
      const next = unwrap(data) || null;
      setProfile(next);
      return next;
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        setProfile(null);
        return null;
      }
      setProfile(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refreshProfile(); }, [refreshProfile]);

  const login = useCallback(async (email, password) => {
    await apiRequest('/api/v2/users/login', {
      method: 'POST', body: JSON.stringify({ email, password })
    });
    return refreshProfile();
  }, [refreshProfile]);

  const logout = useCallback(async () => {
    try { await apiRequest('/api/v1/users/logout', { method: 'POST' }); }
    finally { setProfile(null); }
  }, []);

  const roles = profile?.roles || [];
  const value = useMemo(() => ({
    profile, loading, roles,
    isAdmin: roles.includes('ROLE_SYSTEM_ADMIN'),
    isSeller: roles.includes('ROLE_INSTRUCTOR'),
    isAuthenticated: !!profile,
    login, logout, refreshProfile
  }), [profile, loading, roles, login, logout, refreshProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
