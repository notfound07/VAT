import './Payment.css';
import logo from '../Assets/logo.png';
import React, { useState } from 'react';
import Footer from '../Nav-Foot/Footer';

function Payment() {
    // const [upiId, setUpiId] = useState('');
    // const [cardDetails, setCardDetails] = useState({
    //     fullName: '',
    //     cardNumber: '',
    //     expiryDate: '',
    //     cvv: ''
    // });

    // const handleUpiChange = (e) => setUpiId(e.target.value);
    // const handleCardChange = (e) => setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });

    // const items=5;
    // const total=500;
    // const delivery=1;
    // const order_total=total+delivery;

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
                    {/* <br/>
                    <h2>Payment method</h2>
                    <div className="payment-method">
                        <div >
                            <div className='other-upis'>
                            <input type="checkbox" id="upi" />
                            <label htmlFor="upi">Other UPI Apps</label>
                            </div>
                            <div className='verify-upi'>
                                <label>Please enter your UPI ID</label>
                                <input className='user-upi' type="text" value={upiId} onChange={handleUpiChange} />
                                <button className="verify-button">Verify</button>
                            </div>
                            <p style={{marginBottom:10}}>The UPI ID is in the format of name/phone number@bankname</p>
                            <div>
                            <div className='other-upis'>
                            <input type="checkbox" id="upi" />
                            <label htmlFor="upi">Cash on Delivery/Pay on Delivery Cash, UPI and Cards accepted.</label>
                            </div>
                            </div>
                        </div>
                        <div >
                            <form>
                                <div className='verify-upi'>
                                <input type='checkbox' className='dnc'></input>
                                <label>Debit And Credit Card</label>
                                </div>
                            <div className="payment-method-field">
                                <div>
                                <label>Full Name</label>
                                <input type="text" name="fullName" value={cardDetails.fullName} onChange={handleCardChange} />
                            </div>
                            <div>
                                <label>Card Number</label>
                                <input type="text" name="cardNumber" value={cardDetails.cardNumber} onChange={handleCardChange} />
                            </div>
                            <div className="expiry-cvv">
                                    <label>Expiry Date</label>
                                    <input type="text" name="expiryDate" value={cardDetails.expiryDate} onChange={handleCardChange} />
                                    <label>CVV</label>
                                    <input type="text" name="cvv" value={cardDetails.cvv} onChange={handleCardChange} />
                            </div>
                            <button className="verify-button">Verify</button>
                            </div>
                            </form>
                        </div>
                    </div>
                    <br/>
                    <h2>Item and Delivery</h2>
                    <div className="final-order">
                    <label>Items:</label>
                        <input disabled='disabled'value={items}/>
                        <label>Total:</label>
                        <input  disabled='disabled' value={total}/>
                        <label>Delivery Charges:</label>
                        <input disabled='disabled' value={delivery}/>
                        <hr/>
                        <label style={{fontSize:25}}>Order Total:</label>
                        <input disabled='disabled' style={{fontSize:25,fontWeight:'bold'}} value={order_total}/>
                        <button className="order-button">Order now</button>
                    </div>
                </div>
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <hr/>
                    <div className='order-fields'>
                        <label>Items:</label>
                        <input disabled='disabled'value={items}/>
                        <label>Total:</label>
                        <input  disabled='disabled' value={total}/>
                        <label>Delivery Charges:</label>
                        <input disabled='disabled' value={delivery}/>
                        <hr/>
                        <label style={{fontSize:25}}>Order Total:</label>
                        <input disabled='disabled' style={{fontSize:25,fontWeight:'bold'}} value={order_total}/>
                    </div>*/}
                </div> 
            </div>
            <Footer />
        </div>
    );
}

export default Payment;
