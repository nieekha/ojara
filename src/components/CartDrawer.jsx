import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();

  return (
    <>
      <div className={`cart-drawer-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-drawer__header">
          <h3>
            <ShoppingBag size={20} />
            Your Cart
          </h3>
          <button onClick={onClose} aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-drawer__empty">
            <ShoppingBag size={48} strokeWidth={1} />
            <p>Your cart is empty</p>
            <Link to="/shop" className="btn btn-primary" onClick={onClose}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-drawer__items">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item__image" />
                  <div className="cart-item__details">
                    <h4>{item.name}</h4>
                    <p className="cart-item__meta">{item.color} / {item.size}</p>
                    <p className="cart-item__price">{formatPrice(item.price)}</p>
                    <div className="cart-item__quantity">
                      <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button className="cart-item__remove" onClick={() => removeFromCart(item.id, item.size, item.color)}>
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__total">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <p className="cart-drawer__shipping">Shipping calculated at checkout</p>
              <Link to="/cart" className="btn btn-primary cart-drawer__checkout" onClick={onClose}>
                View Cart & Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
