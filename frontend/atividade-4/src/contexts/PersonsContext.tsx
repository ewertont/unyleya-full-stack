/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import type { Person } from '../types';

interface PersonsContextType {
  persons: Person[];
  loading: boolean;
  error: string | null;
  fetchPersons: () => Promise<void>;
  createPerson: (person: Person) => Promise<void>;
  updatePerson: (id: number, person: Partial<Person>) => Promise<void>;
  deletePerson: (id: number) => Promise<void>;
}

const PersonsContext = createContext<PersonsContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_SUPABASE_URL + '/rest/v1/persons';
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const PersonsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getHeaders = () => ({
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  });

  const fetchPersons = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.get<Person[]>(`${API_URL}?select=*`, { headers: getHeaders() });
      setPersons(res.data);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPerson = async (person: Person) => {
    try {
      const res = await axios.post<Person[]>(API_URL, person, { headers: getHeaders() });
      setPersons((prev) => [...prev, ...res.data]);
    } catch (err: unknown) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao criar');
    }
  };

  const updatePerson = async (id: number, person: Partial<Person>) => {
    try {
      const res = await axios.patch<Person[]>(`${API_URL}?id=eq.${id}`, person, { headers: getHeaders() });
      if (res.data && res.data.length > 0) {
        setPersons((prev) => prev.map((p) => (p.id === id ? res.data[0] : p)));
      }
    } catch (err: unknown) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao atualizar');
    }
  };

  const deletePerson = async (id: number) => {
    try {
      await axios.delete(`${API_URL}?id=eq.${id}`, { headers: getHeaders() });
      setPersons((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao deletar');
    }
  };

  useEffect(() => {
    if (user) fetchPersons();
  }, [user]);

  return (
    <PersonsContext.Provider value={{ persons, loading, error, fetchPersons, createPerson, updatePerson, deletePerson }}>{children}</PersonsContext.Provider>
  );
};

export const usePersons = () => {
  const context = useContext(PersonsContext);
  if (!context) throw new Error('usePersons deve ser usado dentro do PersonsProvider');
  return context;
};
