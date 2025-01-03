import React, { createContext, useState, useContext } from 'react';
import api from '../services/api';

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: UserData | null;
  login: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const login = async (userData: any) => {
    try {
      const response = await api.post('/auth/login', userData);
      if (response.status === 200) {
        setUser(response.data.user);
      } else {
        console.error('Login failed with status:', response.status, response.data);
        setUser(null);
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      setUser(null);
    }
  };

  const register = async (userData: any) => {
      try {
        const response = await api.post('/auth/register', userData);
        if (response.status === 201) {
          setUser(response.data.user);
        } else {
          console.error('Registration failed with status:', response.status, response.data);
            setUser(null);
        }
      } catch (error: any) {
          console.error('Registration failed:', error);
          setUser(null);
      }
  };

  const logout = async () => {
    try {
        await api.post('/auth/logout');
      setUser(null);
    } catch (error: any) {
      console.error('Logout failed:', error);
        setUser(null);
    }
  };

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


export default AuthProvider;
export { AuthContext };