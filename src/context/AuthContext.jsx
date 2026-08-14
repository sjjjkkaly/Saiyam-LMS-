import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_BASE = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('saiyam_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('saiyam_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setUser(data.user);
            localStorage.setItem('saiyam_user', JSON.stringify(data.user));
          } else {
            logout();
          }
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = (tokenData, userData) => {
    setToken(tokenData);
    setUser(userData);
    localStorage.setItem('saiyam_token', tokenData);
    localStorage.setItem('saiyam_user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('saiyam_token');
    localStorage.removeItem('saiyam_user');
  };

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem('saiyam_user', JSON.stringify(updatedUserData));
  };

  // Helper roles
  const isAdmin = user && (user.role === 'Admin' || user.role === 'Super Admin');
  const isInstructor = user && (user.role === 'Instructor' || user.role === 'Admin' || user.role === 'Super Admin');
  const isStudent = user && user.role === 'Student';

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      logout,
      updateUser,
      isAdmin,
      isInstructor,
      isStudent,
      API_BASE
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
