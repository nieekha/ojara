import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import './Home.css';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80',
    title: 'Every Piece\nSelected To\nReflect You',
    subtitle: 'Ojara Collection • Winter 2026',
    cta: 'Shop Collection',
    link: '/shop',
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80',
    title: 'Monochrome\nEssentials',
    subtitle: 'Curated Streetwear',
    cta: 'Explore Drop',
    link: '/shop/hoodies',
  },
  {
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80',
    title: 'Crafted For\nPresence',
    subtitle: 'Limited Edition Pieces',
    cta: 'Discover Now',
    link: '/shop/jackets',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const bestSellers = products.filter((p) => p.badge === 'Best Seller' || p.badge === 'Trending');
  const newArrivals = products.filter((p) => p.badge === 'New');
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="home">
      {/* Hero Slideshow */}
      <section className="hero">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero__slide ${index === currentSlide ? 'hero__slide--active' : ''}`}
          >
            <img src={slide.image} alt="" className="hero__bg" />
            <div className="hero__overlay" />
            <div className="hero__content container">
              <motion.span
                className="hero__subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={index === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {slide.subtitle}
              </motion.span>
              <motion.h1
                className="hero__title"
                initial={{ opacity: 0, y: 30 }}
                animate={index === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.35, duration: 0.6 }}
              >
                {slide.title}
              </motion.h1>
              <motion.div
                className="hero__actions"
                initial={{ opacity: 0, y: 20 }}
                animate={index === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.55, duration: 0.6 }}
              >
                <Link to={slide.link} className="btn btn-white">
                  {slide.cta} <ArrowRight size={16} />
                </Link>
                <Link to="/about" className="btn btn-outline-white">
                  Our Story
                </Link>
              </motion.div>
            </div>
          </div>
        ))}

        <div className="hero__controls container">
          <div className="hero__dots">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                className={`hero__dot ${i === currentSlide ? 'hero__dot--active' : ''}`}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <div className="hero__arrows">
            <span className="hero__counter">
              0{currentSlide + 1} / 0{heroSlides.length}
            </span>
            <button onClick={prevSlide} aria-label="Previous slide">
              <ArrowLeft size={18} />
            </button>
            <button onClick={nextSlide} aria-label="Next slide">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Editorial Marquee */}
      <div className="marquee">
        <div className="marquee__track">
          {[1, 2, 3, 4].map((n) => (
            <span key={n} className="marquee__item">
              OJARA COLLECTION &nbsp;•&nbsp; EVERY PIECE SELECTED TO REFLECT YOU &nbsp;•&nbsp; FREE SHIPPING ABOVE RS. 3,000 &nbsp;•&nbsp; USE CODE OJARA10 &nbsp;•&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Features Bar */}
      <section className="features-bar">
        <div className="container">
          <div className="features-bar__grid">
            <div className="features-bar__item">
              <Truck size={22} />
              <div>
                <strong>Free Shipping</strong>
                <span>On orders above Rs. 3,000</span>
              </div>
            </div>
            <div className="features-bar__item">
              <Shield size={22} />
              <div>
                <strong>Secure Checkout</strong>
                <span>eSewa, Khalti &amp; COD</span>
              </div>
            </div>
            <div className="features-bar__item">
              <RefreshCw size={22} />
              <div>
                <strong>Easy Returns</strong>
                <span>7-day hassle-free exchange</span>
              </div>
            </div>
            <div className="features-bar__item">
              <Star size={22} />
              <div>
                <strong>Curated Quality</strong>
                <span>Heavyweight &amp; tailored cuts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header section-header--split">
            <div>
              <span className="section-subtitle">Browse</span>
              <h2 className="section-title">Shop by Category</h2>
            </div>
            <Link to="/shop" className="section-link">
              View All Categories <ArrowRight size={16} />
            </Link>
          </div>
          <div className="categories-grid">
            {categories.map((cat, index) => {
              const count = products.filter((p) => p.category === cat.id).length;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                >
                  <Link to={`/shop/${cat.id}`} className="category-card">
                    <div className="category-card__image-wrapper">
                      <img src={cat.image} alt={cat.name} className="category-card__image" />
                      <div className="category-card__overlay" />
                    </div>
                    <div className="category-card__content">
                      <span className="category-card__count">{count} Pieces</span>
                      <h3>{cat.name}</h3>
                      <span className="category-card__link">
                        Explore <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="section best-sellers-section">
          <div className="container">
            <div className="section-header section-header--split">
              <div>
                <span className="section-subtitle">Most Wanted</span>
                <h2 className="section-title">Best Sellers &amp; Trending</h2>
              </div>
              <Link to="/shop" className="section-link">
                Shop All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="products-grid products-grid--3">
              {bestSellers.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Editorial Lookbook Split */}
      <section className="editorial-split">
        <div className="container">
          <div className="editorial-split__grid">
            <motion.div
              className="editorial-split__media"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80"
                alt="Ojara Collection Monochrome Edit"
              />
            </motion.div>
            <motion.div
              className="editorial-split__content"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="editorial-split__eyebrow">The Monochrome Edit</span>
              <h2>Designed for Quiet Confidence</h2>
              <p>
                Every piece in Ojara Collection is selected to reflect you — pairing architectural silhouettes with heavyweight organic cotton and brushed fleece built to last beyond seasons.
              </p>
              <div className="editorial-split__stats">
                <div>
                  <strong>400 GSM</strong>
                  <span>Heavyweight Fleece</span>
                </div>
                <div>
                  <strong>100%</strong>
                  <span>Combed Cotton</span>
                </div>
                <div>
                  <strong>XS–XXL</strong>
                  <span>Inclusive Sizing</span>
                </div>
              </div>
              <Link to="/shop" className="btn btn-white">
                Explore the Edit <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header section-header--split">
            <div>
              <span className="section-subtitle">Our Collection</span>
              <h2 className="section-title">Featured Pieces</h2>
            </div>
            <Link to="/shop" className="section-link">
              View Full Catalog <ArrowRight size={16} />
            </Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/shop" className="btn btn-secondary">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="promo-banner__bg">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
            alt=""
          />
        </div>
        <div className="promo-banner__overlay" />
        <div className="promo-banner__content container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="promo-banner__tag">Seasonal Offer</span>
            <h2>Up to 30% Off<br />Winter Essentials</h2>
            <p>Elevate your rotation with our signature outerwear, hoodies, and tailored cargos.</p>
            <Link to="/shop" className="btn btn-white">
              Shop the Sale <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header section-header--split">
              <div>
                <span className="section-subtitle">Just Dropped</span>
                <h2 className="section-title">New Arrivals</h2>
              </div>
              <Link to="/shop" className="section-link">
                Shop New In <ArrowRight size={16} />
              </Link>
            </div>
            <div className="products-grid products-grid--3">
              {newArrivals.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Instagram / Social Proof */}
      <section className="section social-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-subtitle">@ojaracollection</span>
            <h2 className="section-title">Styled by You</h2>
          </div>
          <div className="instagram-grid">
            {[
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
              'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80',
              'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80',
              'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=400&q=80',
              'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
              'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80',
            ].map((src, i) => (
              <a href="#" key={i} className="instagram-card">
                <img src={src} alt={`Ojara lookbook ${i + 1}`} loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
