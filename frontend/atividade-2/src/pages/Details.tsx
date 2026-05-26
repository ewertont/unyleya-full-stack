import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Person, ApiResponse } from '../types';

const Details: React.FC = () => {
  const { seed, id } = useParams<{ seed: string; id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakerapi.it/api/v2/persons?_locale=pt_BR&_seed=${seed}`)
      .then(res => res.json())
      .then((data: ApiResponse) => {
        const found = data.data.find(p => p.id === Number(id));
        setPerson(found || null);
      })
      .finally(() => setLoading(false));
  }, [id, seed]);

  if (loading) return <p>Carregando detalhes...</p>;
  if (!person) return <p>Pessoa não encontrada.</p>;

  return (
    <div className="details-container">
      <h2>{person.firstname} {person.lastname}</h2>
      <div className="details-info">
        <p><strong>E-mail:</strong> {person.email}</p>
        <p><strong>Telefone:</strong> {person.phone}</p>
        <p><strong>Data de Nascimento:</strong> {person.birthday}</p>
        <p><strong>Cidade:</strong> {person.address.city} - {person.address.country}</p>
      </div>
      <Link to="/" className="btn" style={{ marginTop: '20px' }}>Voltar</Link>
    </div>
  );
};

export default Details;
