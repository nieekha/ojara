import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80"
            alt=""
          />
        </div>
        <div className="contact-hero__overlay" />
        <div className="contact-hero__content container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            We'd love to hear from you
          </motion.p>
        </div>
      </div>

      <section className="contact-section section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-subtitle">Contact Information</span>
              <h2 className="section-title">Let's Talk</h2>
              <p className="contact-info__description">
                Have a question, feedback, or want to collaborate? Reach out and
                we'll get back to you as soon as possible.
              </p>

              <div className="contact-info__items">
                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong>Visit Us</strong>
                    <p>Kathmandu, Nepal</p>
                  </div>
                </div>
                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    <Phone size={20} />
                  </div>
                  <div>
                    <strong>Call Us</strong>
                    <p>+977 98XXXXXXXX</p>
                  </div>
                </div>
                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    <Mail size={20} />
                  </div>
                  <div>
                    <strong>Email Us</strong>
                    <p>info@ojaracollection.com</p>
                  </div>
                </div>
                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    <Clock size={20} />
                  </div>
                  <div>
                    <strong>Working Hours</strong>
                    <p>Sun - Fri: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="contact-form-wrapper"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success__icon">✓</div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="contact-form__field">
                      <label>Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Your email"
                        required
                      />
                    </div>
                  </div>
                  <div className="contact-form__field">
                    <label>Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div className="contact-form__field">
                    <label>Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us more..."
                      rows={5}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
