import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 text-center">
      <h1 className="text-8xl font-bold text-dark mb-4 drop-shadow-md">404</h1>
      <p className="text-2xl text-gray-600 mb-8 font-medium">Página não encontrada!</p>
      <Link to="/" className="px-8 py-4 bg-secondary text-white font-bold rounded-xl hover:bg-primary transition shadow-md">
        Voltar para o Início
      </Link>
    </div>
  );
};

export default NotFound;
