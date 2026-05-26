import React from 'react';

const About: React.FC = () => {
  return (
    <div className="details-container">
      <h2>Sobre a Aplicação</h2>
      <p>Esta é a Atividade 3, desenvolvida em React com React Router.</p>
      <br />
      <p>Ela contém:</p>
      <ul>
        <li>Rotas e parâmetros (uso do useParams)</li>
        <li>Filtros e estados (useState)</li>
        <li>Estilização</li>
        <li>Página de Erro 404 para rotas não configuradas</li>
      </ul>
    </div>
  );
};

export default About;
