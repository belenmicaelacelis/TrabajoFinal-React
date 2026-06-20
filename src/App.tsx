import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { CategoryChips } from './components/CategoryChips';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SkeletonCard } from './components/SkeletonCard';
import { Pagination } from './components/Pagination';
import type { Product, CartItem } from './types';
import { AlertCircle } from 'lucide-react';
import './App.css'; // Keeps any base overrides safe

const ITEMS_PER_PAGE = 8;
const CART_STORAGE_KEY = 'fakestore_cart_state';
const DARK_MODE_KEY = 'fakestore_darkmode_state';

export default function App() {
  // Theme State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(DARK_MODE_KEY);
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // API Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Shopping Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Active Detail Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sync Dark Mode class to root element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(DARK_MODE_KEY, String(darkMode));
  }, [darkMode]);

  // Sync Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Fetch initial data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('https://fakestoreapi.com/products'),
        fetch('https://fakestoreapi.com/products/categories')
      ]);

      if (!productsRes.ok || !categoriesRes.ok) {
        throw new Error('Error al conectar con la API de Fake Store.');
      }

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado al cargar los datos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  // Filter products by category and search term
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  // Total pages calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Paginated slice
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Total items in cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Cart Handlers
  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Stop opening the modal

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="app-container">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        cartCount={cartCount}
        onCartOpen={() => setIsCartOpen(true)}
      />

      <CategoryChips
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="products-section">
        {error ? (
          <div className="error-container">
            <AlertCircle size={40} className="error-title" style={{ margin: '0 auto 12px auto' }} />
            <h2 className="error-title">No se pudieron cargar los datos</h2>
            <p className="error-msg">{error}</p>
            <button className="retry-btn" onClick={fetchData}>
              Reintentar
            </button>
          </div>
        ) : (
          <>
            <div className="products-header-info">
              <h2 className="products-count">
                {searchTerm || selectedCategory !== 'all' ? (
                  <>
                    Resultados de búsqueda: <span>{filteredProducts.length}</span>
                  </>
                ) : (
                  <>
                    Nuestros Productos: <span>{products.length}</span>
                  </>
                )}
              </h2>
            </div>

            <div className="products-grid">
              {loading ? (
                // Render 8 skeleton cards while fetching
                Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
              ) : filteredProducts.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '64px 0', color: 'var(--text-muted)' }}>
                  <h3>No se encontraron productos coincidentes.</h3>
                  <p style={{ marginTop: '8px' }}>Prueba buscando otro término o seleccionando otra categoría.</p>
                </div>
              ) : (
                paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onClick={() => handleSelectProduct(product)}
                  />
                ))
              )}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product) => {
          handleAddToCart(product);
          setSelectedProduct(null); // Close modal on add to cart for better experience
          setIsCartOpen(true); // Open cart to show the result
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
