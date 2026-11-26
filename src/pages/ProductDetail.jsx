import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Heart, Share2, Truck, Shield, RefreshCw, ChevronDown } from 'lucide-react';
import { products, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState('description');

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h2>Product not found</h2>
          <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize, selectedColor || product.colors[0], quantity);
  };

  return (
    <div className="product-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <Link to={`/shop/${product.category}`}>{product.category}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail">
          {/* Images */}
          <div className="product-detail__gallery">
            <div className="product-detail__thumbnails">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`product-detail__thumb ${i === selectedImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} />
                </button>
              ))}
            </div>
            <motion.div
              className="product-detail__main-image"
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img src={product.images[selectedImage]} alt={product.name} />
              {product.badge && <span className="product-detail__badge">{product.badge}</span>}
            </motion.div>
          </div>

          {/* Info */}
          <div className="product-detail__info">
            {product.badge && (
              <span className="product-detail__tag">{product.badge}</span>
            )}
            <h1 className="product-detail__name">{product.name}</h1>

            <div className="product-detail__price-row">
              <span className="product-detail__price">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="product-detail__original-price">{formatPrice(product.originalPrice)}</span>
                  <span className="product-detail__discount">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Colors */}
            <div className="product-detail__option">
              <label>Color: <strong>{selectedColor || product.colors[0]}</strong></label>
              <div className="product-detail__colors">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`product-detail__color-btn ${(selectedColor || product.colors[0]) === color ? 'active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="product-detail__option">
              <label>Size: <strong>{selectedSize || 'Select a size'}</strong></label>
              <div className="product-detail__sizes">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`product-detail__size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="product-detail__actions">
              <div className="product-detail__quantity">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  <Minus size={16} />
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>
                  <Plus size={16} />
                </button>
              </div>
              <button className="btn btn-primary product-detail__add-btn" onClick={handleAddToCart}>
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button className="product-detail__wishlist" aria-label="Add to wishlist">
                <Heart size={20} />
              </button>
            </div>

            {/* Features */}
            <div className="product-detail__features">
              <div className="product-detail__feature">
                <Truck size={18} />
                <span>Free shipping on orders above Rs. 3,000</span>
              </div>
              <div className="product-detail__feature">
                <RefreshCw size={18} />
                <span>7-day easy returns & exchange</span>
              </div>
              <div className="product-detail__feature">
                <Shield size={18} />
                <span>100% authentic & premium quality</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="product-detail__accordions">
              <div className={`accordion ${activeAccordion === 'description' ? 'open' : ''}`}>
                <button
                  className="accordion__header"
                  onClick={() => setActiveAccordion(activeAccordion === 'description' ? '' : 'description')}
                >
                  <span>Description</span>
                  <ChevronDown size={18} />
                </button>
                <div className="accordion__content">
                  <p>{product.description}</p>
                </div>
              </div>
              <div className={`accordion ${activeAccordion === 'shipping' ? 'open' : ''}`}>
                <button
                  className="accordion__header"
                  onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? '' : 'shipping')}
                >
                  <span>Shipping & Returns</span>
                  <ChevronDown size={18} />
                </button>
                <div className="accordion__content">
                  <p>Free shipping across Nepal for orders above Rs. 3,000. Standard delivery takes 3-5 business days. Easy returns within 7 days of delivery.</p>
                </div>
              </div>
            </div>

            <button className="product-detail__share">
              <Share2 size={16} />
              Share this product
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products section">
            <h2 className="section-title">You May Also Like</h2>
            <div className="products-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
