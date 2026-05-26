import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePersons } from '../contexts/PersonsContext';

const Home: React.FC = () => {
  const { persons, loading, deletePerson } = usePersons();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredPersons = persons.filter((p) => `${p.firstname} ${p.lastname}`.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = async (id: number) => {
    if (window.confirm('Deseja realmente excluir esta pessoa?')) {
      await deletePerson(id);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/60 p-8 rounded-[2rem] shadow-xl border border-white/50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-dark">Lista de Pessoas</h2>
          <p className="text-dark/60 font-medium mt-1">Gerencie os registros do banco de dados</p>
        </div>
        <Link
          to="/person/new"
          className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-secondary/30 flex items-center gap-2">
          <span className="text-xl leading-none">+</span> Nova Pessoa
        </Link>
      </div>

      <div className="relative mb-8 group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-dark/40 group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Buscar pelo nome..."
          className="w-full pl-14 pr-4 py-4 bg-white/70 border-2 border-white focus:border-secondary rounded-2xl shadow-sm focus:shadow-md outline-none transition-all text-dark font-medium placeholder:text-dark/40"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin"></div>
          <p className="text-secondary font-bold text-lg animate-pulse">Carregando dados...</p>
        </div>
      ) : persons.length === 0 ? (
        <div className="py-20 text-center bg-white/40 rounded-2xl border border-white/50 border-dashed">
          <p className="text-dark/50 font-bold text-lg mb-2">Nenhuma pessoa encontrada.</p>
          <p className="text-dark/40 text-sm">Adicione o primeiro registro para começar!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/50 shadow-sm bg-white/40 backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/60 border-b border-dark/5">
              <tr>
                <th className="p-5 font-bold text-dark/70 uppercase text-xs tracking-wider">Nome</th>
                <th className="p-5 font-bold text-dark/70 uppercase text-xs tracking-wider">E-mail</th>
                <th className="p-5 font-bold text-dark/70 uppercase text-xs tracking-wider">Gênero</th>
                <th className="p-5 font-bold text-dark/70 uppercase text-xs tracking-wider text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark/5">
              {filteredPersons.map((p) => (
                <tr key={p.id} className="hover:bg-white/60 transition-colors group">
                  <td className="p-5 text-dark font-bold flex items-center gap-3">
                    {p.image ? (
                      <img
                        src={p.image}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm group-hover:scale-110 transition-transform"
                        alt=""
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-highlight to-accent flex items-center justify-center border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                        <span className="text-primary font-black text-xs">
                          {p.firstname.charAt(0)}
                          {p.lastname.charAt(0)}
                        </span>
                      </div>
                    )}
                    {p.firstname} {p.lastname}
                  </td>
                  <td className="p-5 text-dark/60 font-medium">{p.email}</td>
                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${p.gender === 'male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                      {p.gender === 'male' ? 'Masculino' : 'Feminino'}
                    </span>
                  </td>
                  <td className="p-5 flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/person/details/${p.id}`, { state: { person: p } })}
                      className="px-4 py-2 bg-white border border-dark/5 text-dark font-bold rounded-xl hover:bg-highlight/30 transition-colors shadow-sm cursor-pointer">
                      Detalhes
                    </button>
                    <Link
                      to={`/person/edit/${p.id}`}
                      className="px-4 py-2 bg-secondary/10 text-secondary font-bold rounded-xl hover:bg-secondary hover:text-white transition-colors shadow-sm cursor-pointer">
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id!)}
                      className="px-4 py-2 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-colors shadow-sm cursor-pointer ">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
