import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, X, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import './Cart.css';

export default function Cart() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Kathmandu',
    paymentMethod: 'esewa',
  });

  const discount = promoApplied ? Math.round(cartTotal * 0.1) : 0;
  const discountedSubtotal = cartTotal - discount;
  const shippingFee = discountedSubtotal >= 3000 ? 0 : 200;
  const finalTotal = discountedSubtotal + shippingFee;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'OJARA10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoApplied(false);
      setPromoError('Invalid code. Try OJARA10 for 10% off.');
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-page__title">Shopping Cart</h1>

        {orderPlaced ? (
          <div className="cart-page__empty">
            <CheckCircle size={64} strokeWidth={1.5} color="#2d8a4e" />
            <h2>Order Confirmed!</h2>
            <p>
              Thank you, {checkoutForm.fullName || 'valued customer'}. Your Ojara Collection order is being prepared for delivery to {checkoutForm.city}.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Continue Shopping <ArrowRight size={16} />
            </Link>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="cart-page__empty">
            <ShoppingBag size={64} strokeWidth={1} />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/shop" className="btn btn-primary">
              Continue Shopping <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="cart-page__grid">
            <div className="cart-page__items">
              <div className="cart-page__header-row">
                <span>Product</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="cart-page__item">
                  <div className="cart-page__item-info">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.color} / {item.size}</p>
                      <span className="cart-page__item-price">{formatPrice(item.price)}</span>
                    </div>
                  </div>
                  <div className="cart-page__item-quantity">
                    <div className="cart-page__quantity-control">
                      <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      className="cart-page__remove"
                      onClick={() => removeFromCart(item.id, item.size, item.color)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="cart-page__item-total">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-page__summary">
              <h3>Order Summary</h3>
              <form className="cart-page__promo" onSubmit={handleApplyPromo}>
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo code (e.g. OJARA10)"
                />
                <button type="submit" className="btn btn-secondary">Apply</button>
              </form>
              {promoError && <p className="cart-page__promo-error">{promoError}</p>}
              {promoApplied && <p className="cart-page__promo-success">OJARA10 applied (10% off)!</p>}

              <div className="cart-page__summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              {promoApplied && (
                <div className="cart-page__summary-row cart-page__summary-discount">
                  <span>Discount (10%)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="cart-page__summary-row">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}</span>
              </div>
              <div className="cart-page__summary-row cart-page__summary-total">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
              {discountedSubtotal < 3000 && (
                <p className="cart-page__free-shipping-msg">
                  Add {formatPrice(3000 - discountedSubtotal)} more for free shipping!
                </p>
              )}
              <button
                className="btn btn-primary cart-page__checkout-btn"
                onClick={() => setIsCheckoutOpen(true)}
              >
                Proceed to Checkout
              </button>
              <Link to="/shop" className="cart-page__continue">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && !orderPlaced && (
        <div className="checkout-modal-backdrop" onClick={() => setIsCheckoutOpen(false)}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="checkout-modal__header">
              <h3>Checkout — {formatPrice(finalTotal)}</h3>
              <button onClick={() => setIsCheckoutOpen(false)} aria-label="Close checkout">
                <X size={20} />
              </button>
            </div>
            <form className="checkout-modal__form" onSubmit={handlePlaceOrder}>
              <div className="checkout-modal__field">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  value={checkoutForm.fullName}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, fullName: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="checkout-modal__field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  required
                  value={checkoutForm.phone}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                  placeholder="+977 98XXXXXXXX"
                />
              </div>
              <div className="checkout-modal__field">
                <label>Delivery Address</label>
                <input
                  type="text"
                  required
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                  placeholder="Street, Ward, Area"
                />
              </div>
              <div className="checkout-modal__field">
                <label>City</label>
                <input
                  type="text"
                  required
                  value={checkoutForm.city}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                />
              </div>
              <div className="checkout-modal__field">
                <label>Payment Method</label>
                <select
                  value={checkoutForm.paymentMethod}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, paymentMethod: e.target.value })}
                >
                  <option value="esewa">eSewa</option>
                  <option value="khalti">Khalti</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="cod">Cash on Delivery</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary checkout-modal__submit">
                Place Order ({formatPrice(finalTotal)})
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
