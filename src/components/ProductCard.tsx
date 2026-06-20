import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onClick: () => void;
}

const categoryTranslations: Record<string, string> = {
  electronics: 'Electrónica',
  jewelery: 'Joyería',
  "men's clothing": 'Ropa de Hombre',
  "women's clothing": 'Ropa de Mujer',
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onClick,
}) => {
  const { title, price, category, image, rating } = product;
  const translatedCategory = categoryTranslations[category.toLowerCase()] || category;

  return (
    <article className="product-card" onClick={onClick}>
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" loading="lazy" />
      </div>

      <div className="product-category-tag">{translatedCategory}</div>
      <h3 className="product-title" title={title}>{title}</h3>

      <div className="product-rating">
        <Star size={16} className="star-icon" />
        <span className="rating-text">{rating?.rate.toFixed(1) || '0.0'}</span>
        <span className="rating-count">({rating?.count || 0})</span>
      </div>

      <div className="product-footer">
        <span className="product-price">${price.toFixed(2)}</span>
        <button
          className="add-cart-btn"
          onClick={(e) => onAddToCart(product, e)}
          aria-label={`Agregar ${title} al carrito`}
        >
          <ShoppingCart size={16} />
          <span>Agregar</span>
        </button>
      </div>
    </article>
  );
};
