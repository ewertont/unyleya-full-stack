import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Página não encontrada!</p>
      <Link to="/" className="btn">Voltar para o Início</Link>
    </div>
  );
};

export default NotFound;
