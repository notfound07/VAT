import './Payment.css';
import logo from '../Assets/logo.png';
import React, { useState } from 'react';
import Footer from '../Nav-Foot/Footer';

function Payment() {
    const [upiId, setUpiId] = useState('');
    const [cardDetails, setCardDetails] = useState({
        fullName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handleUpiChange = (e) => setUpiId(e.target.value);
    const handleCardChange = (e) => setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });

    return (
        <div>
            <div className="payment-frame">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
                <div className="payment-nav">
                    <img className="company-payment-logo" src={logo} alt="" />
                    <p className='payment-title'>CHECKOUT</p>
                </div>
            </div>
            <div className="payment-container">
                <div className='final-order'>
                    <div className="delivery-address">
                        <h2>Delivery address</h2>
                        <form>
                            <div className="name-fields">
                                <div>
                                    <label>Full Name</label>
                                    <input type="text" placeholder="First" />
                                </div>
                                <div>
                                    <label>&nbsp;</label>
                                    <input type="text" placeholder="Last" />
                                </div>
                            </div>
                            <div>
                                <label>Mobile Number</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>Address</label>
                                <textarea />
                            </div>
                            <div>
                                <label>PinCode</label>
                                <input type="text" />
                            </div>
                            <button type="submit" className="save-button">Save</button>
                        </form>
                    </div>
                    <div className="payment-method">
                        <h2>Payment method</h2>
                        <div>
                            <input type="checkbox" id="upi" />
                            <label htmlFor="upi">Other UPI Apps</label>
                            <div>
                                <label>Please enter your UPI ID</label>
                                <input type="text" value={upiId} onChange={handleUpiChange} />
                                <button className="verify-button">Verify</button>
                            </div>
                            <p>The UPI ID is in the format of name/phone number@bankname</p>
                            <p>Cash on Delivery/Pay on Delivery Cash, UPI and Cards accepted.</p>
                        </div>

                        <div>
                            <input type="checkbox" id="card" />
                            <label htmlFor="card">Debit and Credit Card</label>
                            <div>
                                <label>Full Name</label>
                                <input type="text" name="fullName" value={cardDetails.fullName} onChange={handleCardChange} />
                            </div>
                            <div>
                                <label>Card Number</label>
                                <input type="text" name="cardNumber" value={cardDetails.cardNumber} onChange={handleCardChange} />
                            </div>
                            <div className="expiry-cvv">
                                <div>
                                    <label>Expiry Date</label>
                                    <input type="text" name="expiryDate" value={cardDetails.expiryDate} onChange={handleCardChange} />
                                </div>
                                <div>
                                    <label>CVV</label>
                                    <input type="text" name="cvv" value={cardDetails.cvv} onChange={handleCardChange} />
                                </div>
                            </div>
                            <button className="verify-button">Verify</button>
                        </div>
                    </div>

                    <div className="final-order">
                        <h2>Item and Delivery</h2>
                        <p>Order Summary</p>
                        <p>Items: ₹500</p>
                        <p>Delivery: ₹1</p>
                        <h3>Order Total: ₹501</h3>
                        <button className="order-button">Order now</button>
                    </div>
                </div>
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <p>Items: ₹500</p>
                    <p>Delivery: ₹1</p>
                    <hr />
                    <h3>Order Total: ₹501</h3>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Payment;
