import './Navbar.css';
import logo from '../Assets/logo.png';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    useEffect(() => {
        const handleResize = () => {
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
                <p className='company-name'>VisualArtTechnologies</p>
                <div className="nav-child">
                    <Link to="/Home" className="nav-link"><i className="fa-solid fa-circle-info"></i>Who we are</Link>
                    <Link to='/Shopping' className="nav-link"><i className="fa-solid fa-store"></i>Product</Link>
                    <Link to="/Contact" className="nav-link"><i className="fa-solid fa-users"></i>ContactUs</Link>
                    <Link to="/Login" className="nav-link"><i className="fa-solid fa-right-to-bracket"></i>SignIn</Link>
                    <Link to='/Cart' className="nav-link"><i className="fa-solid fa-cart-shopping"></i>Cart</Link>
                </div>
                <button className="nav-toggle-button" onClick={toggleDropdown}><i className="fa-solid fa-bars"></i></button>
                <div className={`nav-dropdown ${dropdownVisible ? 'show' : ''}`}>
                    <Link to="/Home" className="nav-link"><i className="fa-solid fa-circle-info"></i>Who we are</Link>
                    <Link to="/Shopping"className="nav-link"><i className="fa-solid fa-store"></i>Product</Link>
                    <Link className="nav-link"><i className="fa-solid fa-users"></i>ContactUs</Link>
                    <Link to="/Login" className="nav-link"><i className="fa-solid fa-right-to-bracket"></i>SignIn</Link>
                    <Link className="nav-link"><i className="fa-solid fa-cart-shopping"></i>Cart</Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
