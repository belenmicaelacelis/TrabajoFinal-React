import React, { useEffect } from 'react';
import { X, Star, ShoppingCart } from 'lucide-react';
import type { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const categoryTranslations: Record<string, string> = {
  electronics: 'Electrónica',
  jewelery: 'Joyería',
  "men's clothing": 'Ropa de Hombre',
  "women's clothing": 'Ropa de Mujer',
};

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  // Handle escape key to close
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [product, onClose]);

  if (!product) return null;

  const { title, price, description, category, image, rating } = product;
  const translatedCategory = categoryTranslations[category.toLowerCase()] || category;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} aria-modal="true" role="dialog">
      <div className="modal-box">
        <button
          className="icon-btn modal-close-btn"
          onClick={onClose}
          aria-label="Cerrar detalles de producto"
        >
          <X size={20} />
        </button>

        <div className="modal-content-grid">
          <div className="modal-image-panel">
            <img src={image} alt={title} />
          </div>

          <div className="modal-info-panel">
            <span className="product-category-tag" style={{ marginBottom: '16px' }}>
              {translatedCategory}
            </span>
            <h2 className="modal-title">{title}</h2>

            <div className="product-rating" style={{ marginBottom: '20px' }}>
              <Star size={18} className="star-icon" />
              <span className="rating-text" style={{ fontSize: '1rem' }}>
                {rating?.rate.toFixed(1) || '0.0'}
              </span>
              <span className="rating-count" style={{ fontSize: '0.9rem' }}>
                ({rating?.count || 0} reviews)
              </span>
            </div>

            <p className="modal-description">{description}</p>

            <div className="modal-rating-price">
              <div>
                <div className="modal-price-label">Precio</div>
                <div className="modal-price">${price.toFixed(2)}</div>
              </div>

              <div className="modal-actions">
                <button
                  className="add-cart-btn modal-add-btn"
                  onClick={() => onAddToCart(product)}
                >
                  <ShoppingCart size={18} />
                  <span>Agregar al carrito</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
