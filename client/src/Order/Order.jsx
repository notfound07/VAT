import './Order.css';
import logo from '../Assets/logo.png';
import React, { useState, useContext } from 'react';
import Footer from '../Nav-Foot/Footer';
import { RecoveryContext } from '../App';


function Order() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const { email, setEmail } = useContext(RecoveryContext);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [pin, setPin] = useState("");
    const LoggedUser = localStorage.getItem("LoggedUser")
    return (
        <div>
            <div className="payment-frame">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
                <div className="payment-nav" onClick={() => window.location.href = '/Home'}>
                    <img className="company-payment-logo" src={logo} alt="" />
                    <p className='payment-title'>CHECKOUT</p>
                </div>
            </div>
            <div className="payment-container">
                <div className='final-order'>
                    <div className="delivery-address">
                        <h1>Delivery address</h1>
                        <form>
                            <div className="name-enter-fields">
                                <div>
                                    <h4>Full Name</h4>
                                    <div className='name-enter'>
                                        <input className="dettails-enter" type="text" placeholder="First" onChange={(e) => setFirstName(e.target.value)} />
                                        <input className="dettails-enter" type="text" placeholder="Last" onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <h4>Email</h4>
                                    <input className="dettails-enter" type="email" name='email' defaultValue={LoggedUser} onChange={(e) => setEmail(e.target.value)} disabled />
                                </div>
                                <div>
                                    <h4>Mobile Number</h4>
                                    <input className="dettails-enter" type="tel" onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>
                                <div>
                                    <h4>Address</h4>
                                    <textarea className='address' onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div>
                                    <h4>PinCode</h4>
                                    <input className="dettails-enter" onChange={(e) => setPin(e.target.value)} />
                                </div>
                                <button type="submit" className="save-button">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Order;
