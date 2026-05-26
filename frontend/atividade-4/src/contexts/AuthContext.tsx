/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { supabase } from '../supabaseClient';

export interface User {
  id?: number;
  username: string;
  password?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, pass: string) => Promise<void>;
  register: (username: string, pass: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('unyleya_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading] = useState(false);

  const login = async (username: string, pass: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', pass)
      .maybeSingle();

    if (error || !data) throw new Error('Credenciais inválidas');
    setUser(data);
    localStorage.setItem('unyleya_user', JSON.stringify(data));
  };

  const register = async (username: string, pass: string) => {
    const { data: existing } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .maybeSingle();
    
    if (existing) throw new Error('Usuário já existe');

    const { data, error } = await supabase
      .from('users')
      .insert([{ username, password: pass }])
      .select()
      .single();

    if (error || !data) throw new Error('Erro ao criar usuário');
    setUser(data);
    localStorage.setItem('unyleya_user', JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('unyleya_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
};
