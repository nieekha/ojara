import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products, categories, formatPrice } from '../data/products';
import CartDrawer from './CartDrawer';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { cartCount, isCartOpen, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsCategoriesOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchOpen]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const isHome = location.pathname === '/';
  const headerClass = `header ${isScrolled ? 'header--scrolled' : ''} ${isHome && !isScrolled ? 'header--transparent' : ''}`;

  const mobileLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop All' },
    ...categories.map((c) => ({ to: `/shop/${c.id}`, label: c.name })),
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <div className="announcement-bar">
        Free Shipping on Orders Above Rs. 3,000 • Use Code: OJARA10 for 10% Off
      </div>
      <header className={headerClass}>
        <div className="header__inner container">
          <div className="header__left">
            <button
              className="header__menu-btn mobile-only"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            <nav className="header__nav desktop-only">
              <Link
                to="/"
                className={`header__nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
              <div
                className="header__dropdown"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <Link
                  to="/shop"
                  className={`header__nav-link header__nav-link--dropdown ${location.pathname.startsWith('/shop') ? 'active' : ''}`}
                >
                  Shop By Categories <ChevronDown size={14} />
                </Link>
                <div className={`header__dropdown-menu ${isCategoriesOpen ? 'open' : ''}`}>
                  <Link to="/shop" className="header__dropdown-item">
                    All Products
                  </Link>
                  {categories.map((cat) => (
                    <Link key={cat.id} to={`/shop/${cat.id}`} className="header__dropdown-item">
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                to="/shop/t-shirts"
                className={`header__nav-link ${location.pathname === '/shop/t-shirts' ? 'active' : ''}`}
              >
                T-Shirts
              </Link>
              <Link
                to="/shop/hoodies"
                className={`header__nav-link ${location.pathname === '/shop/hoodies' ? 'active' : ''}`}
              >
                Hoodies
              </Link>
            </nav>
          </div>

          <Link to="/" className="header__logo" aria-label="Ojara Collection Home">
            <img src="/ojara-logo.png" alt="OJARA — Every piece selected to reflect you" className="header__logo-img" />
          </Link>

          <div className="header__right">
            <nav className="header__nav desktop-only">
              <Link
                to="/about"
                className={`header__nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className={`header__nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
              >
                Contact
              </Link>
            </nav>

            <div className="header__actions">
              <button
                className="header__action-btn"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link to="/cart" className="header__action-btn desktop-only" aria-label="Cart Page">
                <User size={20} />
              </Link>
              <button
                className="header__action-btn header__cart-btn"
                onClick={() => setIsCartOpen(true)}
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && <span className="header__cart-count">{cartCount}</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        <div className={`search-overlay ${isSearchOpen ? 'search-overlay--open' : ''}`}>
          <div className="container">
            <form className="search-overlay__inner" onSubmit={handleSearchSubmit}>
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products (e.g. hoodie, tee, cargo)..."
                className="search-overlay__input"
                onKeyDown={(e) => e.key === 'Escape' && setIsSearchOpen(false)}
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="search-overlay__close"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </form>

            {searchResults.length > 0 && (
              <div className="search-overlay__results">
                {searchResults.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="search-overlay__result"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <img src={item.images[0]} alt={item.name} />
                    <div>
                      <strong>{item.name}</strong>
                      <span>{formatPrice(item.price)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__backdrop" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="mobile-menu__drawer">
          <div className="mobile-menu__header">
            <span className="mobile-menu__title">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <nav className="mobile-menu__nav">
            {mobileLinks.map((link) => (
              <Link key={link.to} to={link.to} className="mobile-menu__link">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mobile-menu__footer">
            <p>Follow us on social media</p>
            <div className="mobile-menu__social">
              <a href="#" aria-label="Instagram">Instagram</a>
              <a href="#" aria-label="Facebook">Facebook</a>
              <a href="#" aria-label="TikTok">TikTok</a>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
