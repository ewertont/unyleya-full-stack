import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <header className="header">
      <h2>Atividade 3</h2>
      <nav className="header-nav" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {user ? (
          <>
            <span style={{ color: '#d7f171' }}>Olá, {user.username}</span>
            <Link to="/">Início</Link>
            <Link to="/about">Sobre</Link>
            <button 
              onClick={handleLogout} 
              style={{ background: 'none', border: 'none', color: '#ffcad4', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
            >
              Sair
            </button>
          </>
        ) : (
          <Link to="/auth">Entrar</Link>
        )}
      </nav>
    </header>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/person/:seed/:id" element={<PrivateRoute><Details /></PrivateRoute>} />
              <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <footer className="footer">
            <p>&copy; 2026 Projeto Unyleya.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
