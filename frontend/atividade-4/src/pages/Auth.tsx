import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Auth: React.FC = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(username, password);
      } else {
        await register(username, password);
      }
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Ocorreu um erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 backdrop-blur-xl bg-white/60 p-10 rounded-[2rem] shadow-2xl border border-white/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-dark mb-2">{isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}</h2>
        <p className="text-dark/60 text-sm font-medium">{isLogin ? 'Acesse o sistema para gerenciar pessoas' : 'Cadastre-se para começar a usar o sistema'}</p>
      </div>

      {error && <div className="bg-red-100/80 backdrop-blur-sm text-red-600 p-4 rounded-xl mb-6 text-center font-bold border border-red-200">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-dark/70 font-bold mb-2 ml-1 text-sm">Usuário</label>
          <input
            type="text"
            placeholder="Digite seu usuário..."
            className="w-full p-4 bg-white/70 border-2 border-white focus:border-secondary rounded-xl shadow-sm outline-none transition-all placeholder:text-dark/30 font-medium"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-dark/70 font-bold mb-2 ml-1 text-sm">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha..."
            className="w-full p-4 bg-white/70 border-2 border-white focus:border-secondary rounded-xl shadow-sm outline-none transition-all placeholder:text-dark/30 font-medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 mt-4 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg rounded-xl shadow-lg shadow-secondary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 cursor-pointer ">
          {loading ? 'Processando...' : isLogin ? 'Entrar na Conta' : 'Criar Conta'}
        </button>
      </form>

      <div className="text-center mt-8 pt-6 border-t border-dark/5">
        <p className="text-dark/50 mb-4 text-sm font-medium">{isLogin ? 'Ainda não tem uma conta?' : 'Já possui uma conta?'}</p>
        <button
          className="w-full py-3 bg-white border-2 border-primary/20 text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors cursor-pointer "
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
          }}>
          {isLogin ? 'Cadastre-se agora' : 'Faça Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
