import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center mt-10 text-primary font-bold text-2xl">Verificando autenticação...</p>;

  return user ? <>{children}</> : <Navigate to="/auth" />;
};

export default PrivateRoute;
