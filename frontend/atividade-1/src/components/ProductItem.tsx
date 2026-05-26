import React from 'react';
import type { Product } from '../types';
import Card from './Card.tsx';
import './ProductItem.css';

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const handleBuy = () => {
    alert(`Você adicionou "${product.title}" ao carrinho!`);
  };

  return (
    <Card className="product-item">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">R$ {product.price.toFixed(2)}</p>
      <button className="buy-button" onClick={handleBuy}>Comprar</button>
    </Card>
  );
};

export default ProductItem;
