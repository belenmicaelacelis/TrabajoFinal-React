import React from 'react';
import { ShoppingCart, Sun, Moon, Search, Store } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  cartCount: number;
  onCartOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  darkMode,
  onToggleDarkMode,
  cartCount,
  onCartOpen,
}) => {
  return (
    <header className="main-header">
      <a href="/" className="brand" onClick={(e) => { e.preventDefault(); onSearchChange(''); }}>
        <div className="brand-logo">
          <Store size={22} />
        </div>
        <span className="brand-name">FakeStore</span>
      </a>

      <div className="header-actions">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Buscar productos"
          />
        </div>

        <button
          className="icon-btn"
          onClick={onToggleDarkMode}
          title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          aria-label={darkMode ? 'Modo claro' : 'Modo oscuro'}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          className="icon-btn"
          onClick={onCartOpen}
          title="Ver carrito de compras"
          aria-label="Abrir carrito"
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
};
