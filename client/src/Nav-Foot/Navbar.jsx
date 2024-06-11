import './Nav-Foot.css';
import logo from '../Assets/logo.png'; // Import the image
import { useState, useEffect } from 'react';

function Navbar() {
    
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    useEffect(() => {
        const handleResize = () => {
            // Hide dropdown when screen size increases beyond 799px
            if (window.innerWidth > 799) {
                setDropdownVisible(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="frame">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
            <div className="nav-parent">
                <img className="company-logo" src={logo} alt="" />
                <div className="nav-child">
                    <b className="nav-link"><i className="fa-solid fa-house"></i>Home</b>
                    <b className="nav-link"><i className="fa-solid fa-circle-info"></i>Who we are</b>
                    <b className="nav-link"><i className="fa-solid fa-store"></i>Product</b>
                    <b className="nav-link"><i className="fa-solid fa-users"></i>ContactUs</b>
                    <b className="nav-link"><i className="fa-solid fa-right-to-bracket"></i>SignIn</b>
                    <b className="nav-link"><i className="fa-solid fa-cart-shopping"></i>Cart</b>
                </div>
                <button className="nav-toggle-button" onClick={toggleDropdown}><i className="fa-solid fa-bars"></i></button>
                <div className={`nav-dropdown ${dropdownVisible ? 'show' : ''}`}>
                    <b className="nav-link"><i className="fa-solid fa-house"></i>Home</b>
                    <b className="nav-link"><i className="fa-solid fa-circle-info"></i>Who we are</b>
                    <b className="nav-link"><i className="fa-solid fa-store"></i>Product</b>
                    <b className="nav-link"><i className="fa-solid fa-users"></i>ContactUs</b>
                    <b className="nav-link"><i className="fa-solid fa-right-to-bracket"></i>SignIn</b>
                    <b className="nav-link"><i className="fa-solid fa-cart-shopping"></i>Cart</b>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
