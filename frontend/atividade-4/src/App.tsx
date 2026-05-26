import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth';
import PersonForm from './pages/PersonForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PersonsProvider } from './contexts/PersonsContext';
import PrivateRoute from './components/PrivateRoute';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-sm px-8 py-4 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-black">Atividade 4 - Gerenciamento de Pessoas</h2>
      </div>
      <nav className="flex items-center gap-8">
        {user ? (
          <>
            <span className="text-dark/70 font-medium text-sm hidden md:block">
              Bem-vindo, <strong className="text-primary">{user.username}</strong>
            </span>
            <Link to="/" className="font-semibold text-dark hover:text-secondary transition-colors relative group">
              Início
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="font-semibold text-dark hover:text-secondary transition-colors relative group">
              Sobre
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full font-bold text-sm bg-dark/5 text-dark hover:bg-dark hover:text-white transition-all duration-300 cursor-pointer">
              Sair
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="px-6 py-2 rounded-full font-bold text-sm bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-secondary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            Acessar Conta
          </Link>
        )}
      </nav>
    </header>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PersonsProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full max-w-6xl mx-auto p-6 md:p-10 animate-fade-in">
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/person/new"
                  element={
                    <PrivateRoute>
                      <PersonForm />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/person/edit/:id"
                  element={
                    <PrivateRoute>
                      <PersonForm />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/person/details/:id"
                  element={
                    <PrivateRoute>
                      <Details />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <PrivateRoute>
                      <About />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <footer className="mt-auto backdrop-blur-md bg-white/40 border-t border-white/50 text-center p-6 text-dark/60 font-medium text-sm">
              <p>&copy; 2026 Projeto Unyleya</p>
            </footer>
          </div>
        </Router>
      </PersonsProvider>
    </AuthProvider>
  );
};

export default App;
