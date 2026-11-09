import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('stemsage_admin_token'));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('stemsage_admin_user'));
    } catch {
      return null;
    }
  });
  const [loading] = useState(false);

  const login = (newToken, newUser) => {
    localStorage.setItem('stemsage_admin_token', newToken);
    localStorage.setItem('stemsage_admin_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('stemsage_admin_token');
    localStorage.removeItem('stemsage_admin_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
