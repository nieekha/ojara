import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ArrowRight, Check } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="footer__newsletter">
        <div className="container">
          <div className="footer__newsletter-inner">
            <div className="footer__newsletter-text">
              <h3>Join the Ojara Family</h3>
              <p>Subscribe for exclusive drops, early access, and 10% off your first order.</p>
            </div>
            {subscribed ? (
              <div className="footer__newsletter-success" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2d8a4e', fontWeight: 600 }}>
                <Check size={18} />
                <span>Thank you for subscribing! Use code OJARA10 at checkout.</span>
              </div>
            ) : (
              <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <button type="submit" className="btn btn-accent">
                  Subscribe <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <div className="footer__logo">
                <img src="/ojara-logo.png" alt="OJARA — Every piece selected to reflect you" className="footer__logo-img" />
              </div>
              <p className="footer__description">
                Every piece selected to reflect you. Redefining everyday style with curated monochrome &amp; modern streetwear essentials.
              </p>
              <div className="footer__social">
                <a href="#" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="mailto:info@ojaracollection.com" aria-label="Email"><Mail size={20} /></a>
              </div>
            </div>

            <div className="footer__links">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/shop">Shop All</Link></li>
                <li><Link to="/shop/t-shirts">T-Shirts</Link></li>
                <li><Link to="/shop/hoodies">Hoodies</Link></li>
                <li><Link to="/shop/pants">Pants</Link></li>
                <li><Link to="/shop/jackets">Jackets</Link></li>
              </ul>
            </div>

            <div className="footer__links">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><a href="#">Size Guide</a></li>
                <li><a href="#">Shipping & Returns</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>

            <div className="footer__contact">
              <h4>Get In Touch</h4>
              <div className="footer__contact-item">
                <MapPin size={16} />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="footer__contact-item">
                <Phone size={16} />
                <span>+977 98XXXXXXXX</span>
              </div>
              <div className="footer__contact-item">
                <Mail size={16} />
                <span>info@ojaracollection.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; {new Date().getFullYear()} Ojara Collection. All rights reserved.</p>
          <div className="footer__payment">
            <span>eSewa</span>
            <span>Khalti</span>
            <span>Bank Transfer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
