import './App.css';
import ProductList from './components/ProductList.tsx';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Lojas Unyleya (React)</h1>
      </header>
      <main className="app-main">
        <ProductList />
      </main>
      <footer className="app-footer">
        <p>&copy; 2026 Lojas Unyleya. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
