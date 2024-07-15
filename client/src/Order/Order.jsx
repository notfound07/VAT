import './Order.css';
import logo from '../Assets/logo.png';
import React from 'react';
import Footer from '../Nav-Foot/Footer';

function Order() {
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
                        <h1>Delivery address</h1>
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
                </div> 
            </div>
            <Footer />
        </div>
    );
}

export default Order;
