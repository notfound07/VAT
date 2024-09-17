import './Navbar.css';
import logo from '../Assets/logo.png';
import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { RecoveryContext } from '../App';
import { jwtDecode } from 'jwt-decode';

function Navbar() {
    const { show, setShow } = useContext(RecoveryContext);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [userDropdownVisible, setUserDropdownVisible] = useState(false);
    const dropdownRef = useRef(null); 
    const userDropdownRef = useRef(null);
    const LoggedUser = localStorage.getItem("LoggedUser");
    const userNameInitial = LoggedUser ? LoggedUser.charAt(0).toUpperCase() : '';

    const location = useLocation(); // Get the current location

    const toggleDropdown = (event) => {
        event.stopPropagation(); // Prevent click from bubbling to the document
        setDropdownVisible(prevState => !prevState); // Toggle dropdown visibility
    };

    const handleDropdownLinkClick = () => {
        setDropdownVisible(false);
    };

    const toggleUserDropdown = () => {
        setUserDropdownVisible(prevState => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close dropdown if clicked outside of the dropdown or button
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setUserDropdownVisible(false);
            }
        };

        // Changed 'mousedown' to 'click' for proper dropdown behavior
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

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

    const handleLogout = () => {
        localStorage.removeItem("LoggedUser");
        localStorage.removeItem('authToken');
        setShow(false);
        window.location.href = '/';
    };

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            const decodedToken = jwtDecode(authToken);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp > currentTime) {
                const timeLeft = (decodedToken.exp * 1000) - Date.now();
                setTimeout(handleLogout, timeLeft);
            } else {
                handleLogout();
            }
        }
    }, []);

    // Function to check if a route is active
    const isActiveLink = (path) => location.pathname === path ? 'active' : '';

    return (
        <div className="frame">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
            <div className="nav-parent">
                <div className='nav-space'>
                    <img className="company-logo" onClick={() => window.location.href = '/'} src={logo} alt="Company Logo" />
                    <p className='company-name'>VisionaryArt Technologies Pvt Ltd</p>
                </div>
                <div className="nav-child">
                    {show ? <Link to="/Dashboard" className={`nav-link ${isActiveLink("/Dashboard")}`}><i className="fa-solid fa-table-columns"></i>Dashboard</Link> : null}
                    <Link to="/" className={`nav-link ${isActiveLink("/")}`}><i className="fa-solid fa-circle-info"></i>Who we are</Link>
                    <Link to="/Shopping" className={`nav-link ${isActiveLink("/Shopping")}`}><i className="fa-solid fa-store"></i>Product</Link>
                    <Link to="/Design" className={`nav-link ${isActiveLink("/Design")}`}><i className="fa-solid fa-pencil"></i>Design</Link>
                    <Link to="/Contact" className={`nav-link ${isActiveLink("/Contact")}`}><i className="fa-solid fa-users"></i>ContactUs</Link>
                    <div className="get-in">
                        {LoggedUser === null ?
                            <Link to='/Login' className={`nav-link ${isActiveLink("/Login")}`}><i className="fa-solid fa-right-to-bracket"></i>SignIn</Link> :
                            <div className="user-dropdown" ref={userDropdownRef}>
                                <div className="user-icon" onClick={toggleUserDropdown}>{userNameInitial}</div>
                                <div className={`user-dropdown-menu ${userDropdownVisible ? 'show' : ''}`}>
                                    <p className="userlogo" style={{ backgroundColor: 'blue', color: 'white', paddingRight: "3px", paddingLeft: "3px", fontSize: "20px", fontFamily: 'Times New Roman' }}>Hello, {LoggedUser.split("@").reverse().pop()}</p>
                                    <Link to="/" className='nav-link-drop' onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>SignOut</Link>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <button className="nav-toggle-button" onClick={toggleDropdown}><i className="fa-solid fa-bars"></i></button>
                <div ref={dropdownRef} className={`nav-dropdown ${dropdownVisible ? 'show' : ''}`}>
                    {LoggedUser === null ? <Link to='/Login' className='nav-link' onClick={handleDropdownLinkClick}><i className="fa-solid fa-right-to-bracket"></i>SignIn</Link> :
                        <div className="user-dropdown">
                            <p className="userlogo" style={{ backgroundColor: 'blue', color: 'white', paddingRight: "3px", paddingLeft: "3px", fontSize: "20px", fontFamily: 'Times New Roman' }}>Hello, {LoggedUser.split("@").reverse().pop()}</p>
                            <Link to="/" className='nav-link-li' onClick={() => { handleLogout(); handleDropdownLinkClick(); }}>
                                <li><i className="fa-solid fa-right-from-bracket"></i>SignOut</li>
                            </Link>
                        </div>
                    }
                    {show ? <Link to="/Dashboard" className={`nav-link ${isActiveLink("/Dashboard")}`} onClick={handleDropdownLinkClick}><i className="fa-solid fa-table-columns"></i>Dashboard</Link> : null}
                    <Link to="/" className={`nav-link ${isActiveLink("/")}`} onClick={handleDropdownLinkClick}><i className="fa-solid fa-circle-info"></i>Who we are</Link>
                    <Link to="/Shopping" className={`nav-link ${isActiveLink("/Shopping")}`} onClick={handleDropdownLinkClick}><i className="fa-solid fa-store"></i>Product</Link>
                    <Link to="/Design" className={`nav-link ${isActiveLink("/Design")}`} onClick={handleDropdownLinkClick}><i className="fa-solid fa-pencil"></i>Design</Link>
                    <Link to="/Contact" className={`nav-link ${isActiveLink("/Contact")}`} onClick={handleDropdownLinkClick}><i className="fa-solid fa-users"></i>ContactUs</Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
