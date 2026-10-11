import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { authClient } from '../clients/authClient';
import { ApiError } from '../clients/httpClient';
import { ROLES } from '../constants/roles';
import type { UserProfile } from '../types/user';

export interface AuthContextValue {
  profile: UserProfile | null;
  loading: boolean;
  roles: string[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSeller: boolean;
  login: (email: string, password: string) => Promise<UserProfile | null>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<UserProfile | null>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    try {
      const next = await authClient.profile();
      setProfile(next);
      return next;
    } catch (error) {
      if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
        setProfile(null);
        return null;
      }
      setProfile(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshProfile();
  }, [refreshProfile]);

  const login = useCallback(async (email: string, password: string) => {
    await authClient.login({ email, password });
    return refreshProfile();
  }, [refreshProfile]);

  const logout = useCallback(async () => {
    try {
      await authClient.logout();
    } finally {
      setProfile(null);
    }
  }, []);

  const roles = profile?.roles ?? [];
  const value = useMemo<AuthContextValue>(() => ({
    profile,
    loading,
    roles,
    isAuthenticated: Boolean(profile),
    isAdmin: roles.includes(ROLES.ADMIN),
    isSeller: roles.includes(ROLES.SELLER),
    login,
    logout,
    refreshProfile,
  }), [profile, loading, roles, login, logout, refreshProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
