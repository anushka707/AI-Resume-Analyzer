import { useCallback, useEffect, useMemo, useState } from 'react';

import { getCurrentUser, login as loginRequest, signup as signupRequest } from '../services/authService';
import { clearToken, getToken, setToken } from '../utils/storage';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(getToken()));

  const hydrateUser = useCallback(async () => {
    if (!getToken()) {
      setIsLoading(false);
      return;
    }
    try {
      const profile = await getCurrentUser();
      setUser(profile);
    } catch {
      clearToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]);

  const authenticate = useCallback(async (request, payload) => {
    const tokenResponse = await request(payload);
    setToken(tokenResponse.access_token);
    const profile = await getCurrentUser();
    setUser(profile);
    return profile;
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login: (payload) => authenticate(loginRequest, payload),
      signup: (payload) => authenticate(signupRequest, payload),
      logout: () => {
        clearToken();
        setUser(null);
      },
    }),
    [authenticate, isLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
