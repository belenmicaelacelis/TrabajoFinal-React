import React, { useEffect } from 'react';
import { X, ShoppingCart, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, qty: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
}

const SHIPPING_THRESHOLD = 150;
const SHIPPING_COST = 9.99;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  // Listen for escape key and lock background scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    alert('¡Compra simulada con éxito! Gracias por elegir nuestra tienda.');
    onClearCart();
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className="drawer-overlay" onClick={handleOverlayClick} aria-hidden="true" />
      <div className="drawer-panel" role="dialog" aria-modal="true" aria-label="Carrito de compras">
        <div className="drawer-header">
          <h2 className="drawer-title">
            <ShoppingCart size={22} className="drawer-title-icon" />
            <span>Mi Carrito</span>
          </h2>
          <button
            className="drawer-close"
            onClick={onClose}
            aria-label="Cerrar carrito de compras"
          >
            <X size={20} />
          </button>
        </div>

        <div className="drawer-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <ShoppingBag size={48} className="cart-empty-icon" />
              <p>Tu carrito está vacío</p>
              <p style={{ fontSize: '0.85rem' }}>¡Agrega algunos productos increíbles para empezar!</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <div className="cart-item-category">{item.category}</div>
                  <div className="cart-item-meta">
                    <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Disminuir cantidad de ${item.title}`}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="quantity-val">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Aumentar cantidad de ${item.title}`}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      className="cart-item-remove"
                      onClick={() => onRemoveItem(item.id)}
                      aria-label={`Eliminar ${item.title} del carrito`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="price-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Envío</span>
              <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
            </div>
            {shipping > 0 && (
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', marginBottom: '12px', textAlign: 'right' }}>
                ¡Agrega ${(SHIPPING_THRESHOLD - subtotal).toFixed(2)} más para obtener envío gratis!
              </div>
            )}
            <div className="price-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              <span>Iniciar Compra</span>
            </button>
            <button className="clear-cart-btn" onClick={onClearCart}>
              Vaciar Carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
};
