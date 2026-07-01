'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  token: string;
};

type AuthContextType = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  isAdmin: boolean;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => ({ ok: false }),
  logout: () => {},
  isAdmin: false,
  isLoggedIn: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('sivili_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        localStorage.setItem('sivili_user', JSON.stringify(data.user));
        return { ok: true };
      }
      return { ok: false, error: data.error || 'Login failed' };
    } catch {
      return { ok: false, error: 'Network error' };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('sivili_user');
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAdmin: user?.role === 'admin',
      isLoggedIn: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
