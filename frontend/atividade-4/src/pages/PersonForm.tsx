import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { usePersons } from '../contexts/PersonsContext';
import type { Person } from '../types';

const PersonForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { persons, createPerson, updatePerson } = usePersons();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Person>(() => {
    if (id) {
      const personToEdit = persons.find((p) => p.id === Number(id));
      if (personToEdit) return personToEdit;
    }
    return {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      gender: 'male',
      image: '',
    };
  });
  const [loading, setLoading] = useState(false);

  const [prevId, setPrevId] = useState<string | undefined>(id);
  const [prevPersons, setPrevPersons] = useState<Person[]>(persons);

  if (id !== prevId || persons !== prevPersons) {
    setPrevId(id);
    setPrevPersons(persons);
    if (id) {
      const personToEdit = persons.find((p) => p.id === Number(id));
      if (personToEdit) setFormData(personToEdit);
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        gender: 'male',
        image: '',
      });
    }
  }

  const formatPhone = (value: string) => {
    let v = value.replace(/\D/g, '');
    v = v.substring(0, 11);
    
    if (v.length > 2) {
      v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
    }
    if (v.length > 9) {
      v = v.replace(/(\d{5})(\d)/, '$1-$2');
    } else if (v.length > 8) {
      v = v.replace(/(\d{4})(\d)/, '$1-$2');
    }
    
    return v;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = e.target.value;
    
    if (e.target.name === 'phone') {
      value = formatPhone(value);
    }
    
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updatePerson(Number(id), formData);
      } else {
        await createPerson(formData);
      }
      navigate('/');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Erro na requisição');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto backdrop-blur-xl bg-white/60 p-10 rounded-[2rem] shadow-2xl border border-white/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>
      <h2 className="text-3xl font-black text-dark text-center mb-8">{id ? 'Editar Pessoa' : 'Nova Pessoa'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-dark/70 font-bold mb-2 ml-1 text-sm">Nome</label>
            <input
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="w-full p-4 bg-white/70 border-2 border-white focus:border-secondary rounded-xl shadow-sm outline-none transition-all font-medium"
            />
          </div>
          <div>
            <label className="block text-dark/70 font-bold mb-2 ml-1 text-sm">Sobrenome</label>
            <input
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="w-full p-4 bg-white/70 border-2 border-white focus:border-secondary rounded-xl shadow-sm outline-none transition-all font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-dark/70 font-bold mb-2 ml-1 text-sm">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 bg-white/70 border-2 border-white focus:border-secondary rounded-xl shadow-sm outline-none transition-all font-medium"
          />
        </div>

        <div>
          <label className="block text-dark/70 font-bold mb-2 ml-1 text-sm">Telefone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-4 bg-white/70 border-2 border-white focus:border-secondary rounded-xl shadow-sm outline-none transition-all font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-dark/70 font-bold mb-2 ml-1 text-sm">Gênero</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-4 bg-white/70 border-2 border-white focus:border-secondary rounded-xl shadow-sm outline-none transition-all font-medium">
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
            </select>
          </div>
          <div>
            <label className="block text-dark/70 font-bold mb-2 ml-1 text-sm">URL da Imagem</label>
            <input
              name="image"
              value={formData.image || ''}
              onChange={handleChange}
              className="w-full p-4 bg-white/70 border-2 border-white focus:border-secondary rounded-xl shadow-sm outline-none transition-all font-medium"
              placeholder="Opcional"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Link
            to="/"
            className="w-1/2 py-4 flex items-center justify-center bg-white border border-dark/10 text-dark font-bold text-lg rounded-xl shadow-sm hover:bg-dark hover:text-white transition-all">
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="w-1/2 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg rounded-xl shadow-lg shadow-secondary/30 cursor-pointer disabled:cursor-not-allowed ">
            {loading ? 'Processando...' : 'Salvar Registro'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
