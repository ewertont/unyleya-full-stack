import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Person, ApiResponse } from '../types';

const Home: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://fakerapi.it/api/v2/persons?_locale=pt_BR&_seed=${page}`)
      .then(res => res.json())
      .then((data: ApiResponse) => {
        setPersons(data.data);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const filteredPersons = persons.filter(p =>
    `${p.firstname} ${p.lastname}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Lista de Pessoas</h2>
      <input
        type="text"
        placeholder="Buscar pelo nome..."
        className="filter-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Gênero</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPersons.map(p => (
                <tr key={p.id}>
                  <td>{p.firstname} {p.lastname}</td>
                  <td>{p.gender === 'male' ? 'Masculino' : 'Feminino'}</td>
                  <td>
                    <Link to={`/person/${page}/${p.id}`} className="btn">
                      Ver Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button 
              className="btn" 
              disabled={page === 1} 
              onClick={() => { setLoading(true); setPage(p => p - 1); }}
            >
              Anterior
            </button>
            <span className="page-info">Página {page}</span>
            <button 
              className="btn" 
              onClick={() => { setLoading(true); setPage(p => p + 1); }}
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
