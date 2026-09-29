import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('stemsage_user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error('Failed to parse stored user profile:', e);
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('stemsage_token') || null;
  });

  const login = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('stemsage_token', newToken);
    localStorage.setItem('stemsage_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('stemsage_token');
    localStorage.removeItem('stemsage_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token && user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
