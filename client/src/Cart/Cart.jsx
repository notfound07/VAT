import React, { useContext} from 'react';
import { CartContext } from '../Resources/CartContext';
import Navbar from '../Nav-Foot/Navbar';
import axios from 'axios';
import Footer from '../Nav-Foot/Footer';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const validCartItems = cart.filter(item => item && item.image && item.title);
  const bookings = JSON.parse(localStorage.getItem('cart'));

  const orderSelected = async (e) => {
    e.preventDefault();
    console.log(bookings);
    try {
      const response = await axios.post('http://localhost:3001/vat/booking',{
        items:bookings}
      );
      console.log(response.data);
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <hr />
      </div>
      <form onSubmit={orderSelected}>
      <div className="cart-page">
        {validCartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul className="cart-list">
            {validCartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt="Art" className="cart-img" />
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
                <button className="cart-btn" type='submit'>Place Order</button>

      </div>
      </form>
      <Footer />
    </div>
  );
};

export default Cart;
