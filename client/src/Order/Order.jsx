import './Order.css';
import logo from '../Assets/logo.png';
import React,{ useState, useContext }from 'react';
import Footer from '../Nav-Foot/Footer';
import { RecoveryContext } from '../App';


function Order() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const { email, setEmail } = useContext(RecoveryContext);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [pin, setPin] = useState("");
    const LoggedUser=localStorage.getItem("LoggedUser")
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
                                    <input type="text" placeholder="First" onChange={(e) => setFirstName(e.target.value)}/>
                                </div>
                                <div>
                                    <label>&nbsp;</label>
                                    <input type="text" placeholder="Last" onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>
                            <label>Email</label>
                            <input type="email" name='email' defaultValue={LoggedUser} onChange={(e) => setEmail(e.target.value)} disabled />
                            <div>
                                <label>Mobile Number</label>
                                <input type="number" onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            <div>
                                <label>Address</label>
                                <textarea onChange={(e) => setAddress(e.target.value)}/>
                            </div>
                            <div>
                                <label>PinCode</label>
                                <input type="number" onChange={(e) => setPin(e.target.value)}/>
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
