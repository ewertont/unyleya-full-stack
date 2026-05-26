import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-lg border-2 border-secondary">
      <h2 className="text-3xl font-bold text-dark mb-6 border-b-2 border-accent pb-4">Sobre a Aplicação</h2>
      <p className="text-lg text-gray-700 mb-6">Esta é a Atividade 4, desenvolvida em React com React Router e Tailwind CSS.</p>

      <ul className="list-disc pl-8 space-y-3 text-gray-700 text-lg">
        <li>Autenticação com Supabase e Rotas Privadas</li>
        <li>CRUD completo(GET, POST, PUT, DELETE)</li>
        <li>
          Integração com endpoints via <span className="font-bold text-primary">Axios</span>
        </li>
        <li>Troca de dados entre rotas via props do React Router</li>
        <li>
          Uso de Contextos Globais (<span className="font-bold text-primary">useContext</span>)
        </li>
        <li>Estilização 100% Tailwind</li>
      </ul>
    </div>
  );
};

export default About;
