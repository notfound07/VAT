import React, { useContext } from 'react';
import { CartContext } from '../Resources/CartContext';
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <hr />
      </div>
      <div className="cart-page">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt="Art" className="cart-img" />
                </div>
                <div className="cart-item-details">
                  <h2 className="cart-item-title">{item.title}</h2>
                </div>
                <div className="cart-item-actions">
                  <button className="cart-btn" onClick={() => removeFromCart(index)}>Remove</button>
                  <button className="cart-btn-buy">Proceed to Buy</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
