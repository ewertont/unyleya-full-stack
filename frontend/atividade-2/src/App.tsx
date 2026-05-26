import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import About from './pages/About';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h2>Atividade 2</h2>
          <nav className="header-nav">
            <Link to="/">Início</Link>
            <Link to="/about">Sobre</Link>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/person/:seed/:id" element={<Details />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2026 Projeto Unyleya.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
