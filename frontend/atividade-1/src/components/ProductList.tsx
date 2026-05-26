import React, { useEffect, useState } from 'react';
import type { Product } from '../types';
import ProductItem from './ProductItem.tsx';
import './ProductList.css';

const API_URL = 'https://fakestoreapi.com/products';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Falha ao buscar produtos');
        }
        const data: Product[] = await response.json();
        setProducts(data.slice(0, 10));
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erro desconhecido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="loading-message">Carregando produtos...</p>;
  }

  if (error) {
    return <p className="error-message">Erro ao carregar os produtos: {error}</p>;
  }

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Nossos Produtos</h2>
      <div className="product-list-grid">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
