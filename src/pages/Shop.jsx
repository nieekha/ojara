import { useState, useMemo } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, LayoutList, ChevronDown, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import './Shop.css';

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-2500', label: 'Under Rs. 2,500', min: 0, max: 2499 },
  { id: '2500-4500', label: 'Rs. 2,500 – Rs. 4,500', min: 2500, max: 4500 },
  { id: 'above-4500', label: 'Above Rs. 4,500', min: 4501, max: Infinity },
];

export default function Shop() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('q') || '';

  const [sortBy, setSortBy] = useState('featured');
  const [gridView, setGridView] = useState('grid');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [onlyOnSale, setOnlyOnSale] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const allSizes = useMemo(() => {
    const set = new Set();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, []);

  const allColors = useMemo(() => {
    const set = new Set();
    products.forEach((p) => p.colors.forEach((c) => set.add(c)));
    return Array.from(set).sort();
  }, []);

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setPriceRange('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setOnlyOnSale(false);
    setSelectedBadge('');
    if (category) navigate('/shop');
  };

  const activeFilterCount =
    (priceRange !== 'all' ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (onlyOnSale ? 1 : 0) +
    (selectedBadge ? 1 : 0);

  const filteredProducts = useMemo(() => {
    let filtered = category
      ? products.filter((p) => p.category === category)
      : [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    const range = PRICE_RANGES.find((r) => r.id === priceRange);
    if (range && range.id !== 'all') {
      filtered = filtered.filter((p) => p.price >= range.min && p.price <= range.max);
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) => p.colors.some((c) => selectedColors.includes(c)));
    }

    if (onlyOnSale) {
      filtered = filtered.filter((p) => Boolean(p.originalPrice));
    }

    if (selectedBadge) {
      filtered = filtered.filter((p) => p.badge === selectedBadge);
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [category, sortBy, searchQuery, priceRange, selectedSizes, selectedColors, onlyOnSale, selectedBadge]);

  const currentCategory = categories.find((c) => c.id === category);

  const filterSidebarContent = (
    <div className="shop-filters__inner">
      <div className="shop-filters__header">
        <h3>Filters</h3>
        {activeFilterCount > 0 && (
          <button type="button" className="shop-filters__clear" onClick={clearAllFilters}>
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="filter-group">
        <h4 className="filter-group__title">Category</h4>
        <ul className="filter-group__list">
          <li>
            <Link to="/shop" className={`filter-link ${!category ? 'active' : ''}`}>
              <span>All Products</span>
              <span className="filter-link__count">{products.length}</span>
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                to={`/shop/${cat.id}`}
                className={`filter-link ${category === cat.id ? 'active' : ''}`}
              >
                <span>{cat.name}</span>
                <span className="filter-link__count">
                  {products.filter((p) => p.category === cat.id).length}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Filter */}
      <div className="filter-group">
        <h4 className="filter-group__title">Price Range</h4>
        <div className="filter-group__radios">
          {PRICE_RANGES.map((range) => (
            <label key={range.id} className="filter-radio">
              <input
                type="radio"
                name="priceRange"
                checked={priceRange === range.id}
                onChange={() => setPriceRange(range.id)}
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="filter-group">
        <h4 className="filter-group__title">Size</h4>
        <div className="filter-chips">
          {allSizes.map((size) => (
            <button
              key={size}
              type="button"
              className={`filter-chip ${selectedSizes.includes(size) ? 'active' : ''}`}
              onClick={() => toggleSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="filter-group">
        <h4 className="filter-group__title">Color</h4>
        <div className="filter-chips">
          {allColors.map((color) => (
            <button
              key={color}
              type="button"
              className={`filter-chip ${selectedColors.includes(color) ? 'active' : ''}`}
              onClick={() => toggleColor(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Collection / Availability */}
      <div className="filter-group">
        <h4 className="filter-group__title">Highlights</h4>
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={onlyOnSale}
            onChange={(e) => setOnlyOnSale(e.target.checked)}
          />
          <span>On Sale</span>
        </label>
        <div className="filter-chips" style={{ marginTop: '0.75rem' }}>
          {['Best Seller', 'New', 'Trending'].map((badge) => (
            <button
              key={badge}
              type="button"
              className={`filter-chip ${selectedBadge === badge ? 'active' : ''}`}
              onClick={() => setSelectedBadge(selectedBadge === badge ? '' : badge)}
            >
              {badge}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="shop-page">
      {/* Page Header */}
      <div className="shop-header">
        <div className="shop-header__bg">
          <img
            src={currentCategory?.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80'}
            alt=""
          />
        </div>
        <div className="shop-header__overlay" />
        <div className="shop-header__content container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>{searchQuery ? `Search: "${searchQuery}"` : currentCategory?.name || 'All Products'}</span>
          </nav>
          <h1>{searchQuery ? `Results for "${searchQuery}"` : currentCategory?.name || 'All Products'}</h1>
          <p>{filteredProducts.length} products</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="shop-tabs">
        <div className="container">
          <div className="shop-tabs__list">
            <Link to="/shop" className={`shop-tabs__tab ${!category ? 'active' : ''}`}>
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop/${cat.id}`}
                className={`shop-tabs__tab ${category === cat.id ? 'active' : ''}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="shop-toolbar">
        <div className="container shop-toolbar__inner">
          <div className="shop-toolbar__left">
            <button
              type="button"
              className="shop-toolbar__filter-btn"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal size={16} />
              <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
            </button>
            <span className="shop-toolbar__count">{filteredProducts.length} Results</span>
          </div>
          <div className="shop-toolbar__right">
            <div className="shop-toolbar__sort">
              <label>Sort by:</label>
              <div className="shop-toolbar__select-wrapper">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>
                <ChevronDown size={14} />
              </div>
            </div>
            <div className="shop-toolbar__views">
              <button
                className={gridView === 'grid' ? 'active' : ''}
                onClick={() => setGridView('grid')}
                aria-label="Grid view"
              >
                <Grid3X3 size={18} />
              </button>
              <button
                className={gridView === 'list' ? 'active' : ''}
                onClick={() => setGridView('list')}
                aria-label="List view"
              >
                <LayoutList size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Left Sidebar Filters */}
      <section className="shop-products">
        <div className="container">
          <div className="shop-layout">
            <aside className="shop-sidebar">
              {filterSidebarContent}
            </aside>

            <div className="shop-main">
              {activeFilterCount > 0 && (
                <div className="active-filters">
                  {priceRange !== 'all' && (
                    <button type="button" className="active-filter-tag" onClick={() => setPriceRange('all')}>
                      {PRICE_RANGES.find((r) => r.id === priceRange)?.label} <X size={12} />
                    </button>
                  )}
                  {selectedSizes.map((s) => (
                    <button key={s} type="button" className="active-filter-tag" onClick={() => toggleSize(s)}>
                      Size: {s} <X size={12} />
                    </button>
                  ))}
                  {selectedColors.map((c) => (
                    <button key={c} type="button" className="active-filter-tag" onClick={() => toggleColor(c)}>
                      {c} <X size={12} />
                    </button>
                  ))}
                  {onlyOnSale && (
                    <button type="button" className="active-filter-tag" onClick={() => setOnlyOnSale(false)}>
                      On Sale <X size={12} />
                    </button>
                  )}
                  {selectedBadge && (
                    <button type="button" className="active-filter-tag" onClick={() => setSelectedBadge('')}>
                      {selectedBadge} <X size={12} />
                    </button>
                  )}
                </div>
              )}

              <div className={`products-grid shop-products-grid ${gridView === 'list' ? 'products-grid--list' : ''}`}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="shop-empty">
                  <p>No products match your selected filters.</p>
                  <button type="button" className="btn btn-primary" onClick={clearAllFilters}>
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="mobile-filters-backdrop" onClick={() => setMobileFiltersOpen(false)}>
          <div className="mobile-filters-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-filters-drawer__top">
              <span>Filter Products</span>
              <button type="button" onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                <X size={22} />
              </button>
            </div>
            {filterSidebarContent}
            <div className="mobile-filters-drawer__footer">
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => setMobileFiltersOpen(false)}
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
