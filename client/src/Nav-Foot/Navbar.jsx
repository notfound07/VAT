import './Navbar.css';
import logo from '../Assets/logo.png';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecoveryContext } from '../App';
import { jwtDecode } from 'jwt-decode'
function Navbar() {
    const { show,setShow} = useContext(RecoveryContext);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [userDropdownVisible, setUserDropdownVisible] = useState(false);
    const LoggedUser = localStorage.getItem("LoggedUser");
    const userNameInitial = LoggedUser ? LoggedUser.charAt(0).toUpperCase() : '';

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const toggleUserDropdown = () => {
        setUserDropdownVisible(!userDropdownVisible);
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

    const handleLogout = () => {
        localStorage.removeItem("LoggedUser");
        localStorage.removeItem('authToken');
        setShow(false);
        window.location.href = '/Home';
    };
    useEffect(() => {
        // Check if the user is already logged in by checking for the auth token
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
          const decodedToken = jwtDecode(authToken);
          const currentTime = Date.now() / 1000; // Current time in seconds
    
          if (decodedToken.exp > currentTime) {
            const timeLeft = (decodedToken.exp * 1000) - Date.now(); // Time left until token expires
            setTimeout(handleLogout, timeLeft); // Set a timeout to log out the user when the token expires
          } else {
            handleLogout(); // If the token has expired, log out the user immediately
          }
        }
      }, []);

    return (
        <div className="frame">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
            <div className="nav-parent">
                <div className='nav-space'>
                    <img className="company-logo" onClick={() => window.location.href = '/Home'} src={logo} alt="" />
                    <p className='company-name'>VisionaryArt Technologies Pvt Ltd</p>
                </div>
                <div className="nav-child">
                    {show ? <Link to="/Dashboard" className='nav-link'><i className="fa-solid fa-table-columns"></i>Dashboard</Link> : null}
                    <Link to="/Home" className="nav-link"><i className="fa-solid fa-circle-info"></i>Who we are</Link>
                    <Link to='/Shopping' className="nav-link"><i className="fa-solid fa-store"></i>Product</Link>
                    <Link to="/Design" className='nav-link'><i class="fa-solid fa-pencil"></i>Design</Link>
                    <Link to="/Contact" className="nav-link"><i className="fa-solid fa-users"></i>ContactUs</Link>
                    <div className="get-in">
                        {LoggedUser === null ?
                            <Link to='/Login' className='nav-link'><i className="fa-solid fa-right-to-bracket"></i>SignIn</Link> :
                            <div className="user-dropdown">
                                <div className="user-icon" onClick={toggleUserDropdown}>{userNameInitial}</div>
                                <div className={`user-dropdown-menu ${userDropdownVisible ? 'show' : ''}`}>
                                    <p className="userlogo" style={{ backgroundColor: 'blue', color: 'white', paddingRight: "3px", paddingLeft: "3px", fontSize: "20px", fontFamily: 'Times New Roman' }}>Hello, {LoggedUser.split("@").reverse().pop()}</p>
                                    <Link to="/Home" className='nav-link-drop' onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>SignOut</Link>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <button className="nav-toggle-button" onClick={toggleDropdown}><i className="fa-solid fa-bars"></i></button>
                <div className={`nav-dropdown ${dropdownVisible ? 'show' : ''}`}>
                    <div className="nav-link">
                        {LoggedUser === null ? <Link to='/Login' className='nav-sign'><i className="fa-solid fa-right-to-bracket"></i>SignIn</Link> :
                            <div className="user-dropdown">
                                <p className="userlogo" style={{ backgroundColor: 'blue', color: 'white', paddingRight: "3px", paddingLeft: "3px", fontSize: "20px", fontFamily: 'Times New Roman' }}>Hello, {LoggedUser.split("@").reverse().pop()}</p>
                                <Link to="/Home" className='nav-link' onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>SignOut</Link>
                            </div>
                        }
                    </div>
                    {show ? <Link to="/Dashboard" className='nav-link'><i className="fa-solid fa-table-columns"></i>Dashboard</Link> : null}
                    <Link to="/Home" className="nav-link"><i className="fa-solid fa-circle-info"></i>Who we are</Link>
                    <Link to="/Shopping" className="nav-link"><i className="fa-solid fa-store"></i>Product</Link>
                    <Link to="/Design" className='nav-link'><i class="fa-solid fa-pencil"></i>Design</Link>
                    <Link to="/Contact" className="nav-link"><i className="fa-solid fa-users"></i>ContactUs</Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
