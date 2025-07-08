import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';
import { useRequest } from '../hooks/useRequest';
import { toast } from 'react-toastify';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => User;
  logout: () => void;
  switchUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(JSON.parse(localStorage?.getItem("authTokenSorte"))); // Admin por padrão

  const { request, data, error } = useRequest();

  const login = async (email: string, password: string) => {
    // Chama a API para autenticação
    await request("POST", "/api/auth/login", { email, password });
    // Se a resposta vier com sucesso e contiver o usuário:
    if (data && !error) {
      toast.success("Logado com sucesso")
      setUser(data?.dados);
      return data;
    }
    return null;
  };

  const logout = () => {
    localStorage.clear()
    setUser(null);
  };

  const switchUser = (userId: string) => {
    const foundUser = mockUsers.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, switchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}