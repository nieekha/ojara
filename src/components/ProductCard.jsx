import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Check } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { id, name, price, originalPrice, images, colors, sizes, badge } = product;
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = sizes.includes('M') ? 'M' : sizes[0];
    const defaultColor = colors[0];
    addToCart(product, defaultSize, defaultColor, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="product-card__image-wrapper">
        <img
          src={images[0]}
          alt={name}
          className="product-card__image product-card__image--primary"
          loading="lazy"
        />
        {images[1] && (
          <img
            src={images[1]}
            alt={name}
            className="product-card__image product-card__image--secondary"
            loading="lazy"
          />
        )}
        {badge && <span className="product-card__badge">{badge}</span>}
        <div className="product-card__overlay">
          <button type="button" className="product-card__quick-add" onClick={handleQuickAdd}>
            {added ? <Check size={16} /> : <ShoppingBag size={16} />}
            {added ? 'Added' : 'Quick Add'}
          </button>
        </div>
      </Link>
      <div className="product-card__info">
        <Link to={`/product/${id}`} className="product-card__name">{name}</Link>
        <div className="product-card__price-row">
          <span className="product-card__price">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="product-card__original-price">{formatPrice(originalPrice)}</span>
          )}
          {originalPrice && (
            <span className="product-card__discount">
              {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
        <div className="product-card__colors">
          {colors.map((color) => (
            <span key={color} className="product-card__color-name">{color}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
