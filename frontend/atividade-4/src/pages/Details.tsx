import React from 'react';
import { useLocation, useNavigate, Link, Navigate } from 'react-router-dom';
import type { Person } from '../types';

const Details: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const person = state?.person as Person;

  if (!person) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-2xl mx-auto backdrop-blur-xl bg-white/60 p-10 rounded-[2rem] shadow-2xl border border-white/50 flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary to-secondary opacity-90"></div>
      
      <div className="relative z-10 flex flex-col items-center mt-8">
        {person.image ? (
          <img src={person.image} alt={person.firstname} className="w-40 h-40 object-cover rounded-[2rem] border-4 border-white shadow-2xl mb-6 transform -rotate-3 hover:rotate-0 transition-transform duration-500" />
        ) : (
          <div className="w-40 h-40 bg-gradient-to-br from-highlight to-accent rounded-[2rem] border-4 border-white shadow-2xl mb-6 flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <span className="text-primary text-5xl font-black">{person.firstname.charAt(0)}{person.lastname.charAt(0)}</span>
          </div>
        )}
        <h2 className="text-4xl font-black text-dark mb-8 text-center">{person.firstname} {person.lastname}</h2>
      </div>
      
      <div className="w-full bg-white/80 p-8 rounded-2xl border border-white/50 shadow-sm space-y-4 relative z-10">
        <div className="flex justify-between items-center border-b border-dark/5 pb-4">
          <span className="text-dark/50 font-bold uppercase text-xs tracking-widest">E-mail</span>
          <span className="text-dark font-bold text-lg">{person.email}</span>
        </div>
        <div className="flex justify-between items-center border-b border-dark/5 pb-4">
          <span className="text-dark/50 font-bold uppercase text-xs tracking-widest">Telefone</span>
          <span className="text-dark font-bold text-lg">{person.phone}</span>
        </div>
        <div className="flex justify-between items-center pb-2">
          <span className="text-dark/50 font-bold uppercase text-xs tracking-widest">Gênero</span>
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${person.gender === 'male' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-pink-100 text-pink-700 border border-pink-200'}`}>
            {person.gender === 'male' ? 'Masculino' : 'Feminino'}
          </span>
        </div>
      </div>

      <div className="mt-8 flex gap-4 w-full relative z-10">
        <button onClick={() => navigate(-1)} className="w-1/2 py-4 text-center bg-white border border-dark/10 text-dark font-bold text-lg rounded-xl shadow-sm hover:bg-dark hover:text-white transition-all">
          Voltar
        </button>
        <Link to={`/person/edit/${person.id}`} className="w-1/2 py-4 text-center bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg rounded-xl shadow-lg shadow-secondary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all">
          Editar Registro
        </Link>
      </div>
    </div>
  );
};

export default Details;
