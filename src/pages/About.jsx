import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
            alt=""
          />
        </div>
        <div className="about-hero__overlay" />
        <div className="about-hero__content container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Redefining fashion, one piece at a time
          </motion.p>
        </div>
      </div>

      {/* Story Section */}
      <section className="about-story section">
        <div className="container">
          <div className="about-story__grid">
            <motion.div
              className="about-story__text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-subtitle">Who We Are</span>
              <h2 className="section-title">Born from Passion,<br />Built for You</h2>
              <p>
                Ojara Collection was founded with a simple mission — to make premium streetwear
                accessible to everyone. What started as a small passion project in Kathmandu has
                grown into a movement that celebrates self-expression through fashion.
              </p>
              <p>
                Every piece in our collection is carefully designed and crafted with attention to
                detail, using premium fabrics that feel as good as they look. We believe that
                clothing should empower you, not just cover you.
              </p>
              <p>
                From our oversized tees to our heavyweight hoodies, every item tells a story of
                quality craftsmanship and thoughtful design.
              </p>
            </motion.div>
            <motion.div
              className="about-story__image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                alt="Ojara Collection workspace"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-subtitle">What We Stand For</span>
            <h2 className="section-title">Our Values</h2>
          </div>
          <div className="about-values__grid">
            {[
              {
                title: 'Quality First',
                description: 'We source the finest fabrics and materials. Every stitch is a promise of durability and comfort.',
                icon: '✦',
              },
              {
                title: 'Sustainable Fashion',
                description: "We're committed to reducing waste and using eco-friendly packaging whenever possible.",
                icon: '♻',
              },
              {
                title: 'Community Driven',
                description: "We're more than a brand — we're a community. Your feedback shapes our collections.",
                icon: '♡',
              },
              {
                title: 'Inclusive Design',
                description: 'Fashion for everyone. Our extended size range ensures everyone finds their perfect fit.',
                icon: '◎',
              },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                className="about-values__card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <span className="about-values__icon">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta__bg">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80"
            alt=""
          />
        </div>
        <div className="about-cta__overlay" />
        <div className="about-cta__content container">
          <h2>Ready to Redefine Your Style?</h2>
          <p>Explore our latest collection and find pieces that speak to you.</p>
          <Link to="/shop" className="btn btn-white">Shop Now</Link>
        </div>
      </section>
    </div>
  );
}
