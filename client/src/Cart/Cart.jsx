import React, { useContext } from 'react';
import { CartContext } from '../Resources/CartContext';
import Navbar from '../Nav-Foot/Navbar';
// import axios from 'axios';
import Footer from '../Nav-Foot/Footer';
import './Cart.css';
import { Buffer } from 'buffer';


const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const validCartItems = cart.filter(item => item && item.image && item.title);
  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <hr />
      </div>
      <form>
        <div className="cart-page">
          {validCartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul className="cart-list">
              {validCartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <div className="cart-item-image">
                    <img src={`data:${item.image.contentType};base64,${Buffer.from(item.image.data.data).toString('base64')}`}
                      alt={item.title} className="cart-img" />
                  </div>
                  <div className="cart-item-details">
                    <h2 className="cart-item-title">{item.title}</h2>
                  </div>
                  <div className="cart-item-actions">
                    <button type="button" className="cart-btn" onClick={() => removeFromCart(index)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Cart;
