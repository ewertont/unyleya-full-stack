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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="details-container" style={{ margin: '50px auto', maxWidth: '400px', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#65524d', marginBottom: '25px', fontSize: '28px' }}>
        {isLogin ? 'Login' : 'Cadastro'}
      </h2>
      
      {error && (
        <div style={{ backgroundColor: '#ffcad4', color: '#65524d', padding: '12px', borderRadius: '6px', marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#817e9f' }}>Usuário</label>
          <input 
            type="text" 
            placeholder="Digite seu usuário..." 
            className="filter-input"
            style={{ marginBottom: '0', width: '100%', padding: '12px', borderRadius: '6px' }}
            value={username}
            onChange={e => setUsername(e.target.value)}
            required 
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#817e9f' }}>Senha</label>
          <input 
            type="password" 
            placeholder="Digite sua senha..." 
            className="filter-input"
            style={{ marginBottom: '0', width: '100%', padding: '12px', borderRadius: '6px' }}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required 
          />
        </div>
        
        <button type="submit" className="btn" disabled={loading} style={{ width: '100%', padding: '12px', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}>
          {loading ? 'Aguarde...' : (isLogin ? 'Entrar na Conta' : 'Criar Conta')}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '25px' }}>
        <p style={{ color: '#817e9f', marginBottom: '10px', fontSize: '14px' }}>
          {isLogin ? 'Ainda não tem uma conta?' : 'Já possui uma conta?'}
        </p>
        <button 
          className="btn" 
          style={{ width: '100%', backgroundColor: 'transparent', border: '2px solid #817e9f', color: '#817e9f', padding: '10px', fontWeight: 'bold' }}
          onClick={() => { setIsLogin(!isLogin); setError(''); }}
        >
          {isLogin ? 'Cadastre-se agora' : 'Faça Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
