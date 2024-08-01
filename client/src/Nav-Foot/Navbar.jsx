import './Navbar.css';
import logo from '../Assets/logo.png';
import { useState, useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecoveryContext } from '../App';

function Navbar() {
    const { show,setShow } = useContext(RecoveryContext);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    // const navigate=useNavigate();
    const LoggedUser = localStorage.getItem("LoggedUser")
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
    const handleLogout = () => {
        // Remove the user's token from local storage
        localStorage.removeItem("LoggedUser");
        setShow(false);
        window.location.href = '/Home';
    };

    return (
        <div className="frame">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
            <div className="nav-parent">
                <img className="company-logo" onClick={() => window.location.href = '/Home'} src={logo} alt="" />
                <p className='company-name'>VisionaryArt Technologies Pvt Ltd</p>
                <div className="nav-child">
                    {show?(<Link to="/Dashboard" className='nav-link'><i class="fa-solid fa-table-columns"></i>Dashboard</Link>):null}
                    <Link to="/Home" className="nav-link"><i className="fa-solid fa-circle-info"></i>Who we are</Link>
                    <Link to='/Shopping' className="nav-link"><i className="fa-solid fa-store"></i>Product</Link>
                    <Link to="/Contact" className="nav-link"><i className="fa-solid fa-users"></i>ContactUs</Link>
                    <div className="get-in">
                        {LoggedUser === null ? <Link to='/Login' className='nav-link'><i class="fa-solid fa-right-to-bracket"></i>SignIn</Link> :
                            <>
                                <p className="userlogo" style={{ backgroundColor: 'blue', color: 'white', paddingRight: "3px", paddingLeft: "3px", fontSize: "20px", fontFamily: 'Times New Roman' }}>Hello, {LoggedUser.split("@").reverse().pop()}</p>
                                <Link to="/Home" className='nav-logout' onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>SignOut</Link>
                            </>
                        }
                    </div>
                    {show?(<Link to='/Cart' className="nav-link"><i className="fa-solid fa-cart-shopping"></i>Cart</Link>):null}
                </div>
                <button className="nav-toggle-button" onClick={toggleDropdown}><i className="fa-solid fa-bars"></i></button>
                <div className={`nav-dropdown ${dropdownVisible ? 'show' : ''}`}>
                    <div className="nav-link">
                        {LoggedUser === null ? <Link to='/Login' className='nav-sign'><i className="fa-solid fa-right-to-bracket"></i>SignIn</Link> :
                            <>
                                <p className="userlogo" style={{ backgroundColor: 'blue', color: 'white', paddingRight: "3px", paddingLeft: "3px", fontSize: "20px", fontFamily: 'Times New Roman' }}>Hello, {LoggedUser.split("@").reverse().pop()}</p>
                                <Link to="/Home" className='nav-link' onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>SignOut</Link>
                            </>
                        }
                    </div>
                    <Link to="/Home" className="nav-link"><i className="fa-solid fa-circle-info"></i>Who we are</Link>
                    <Link to="/Shopping" className="nav-link"><i className="fa-solid fa-store"></i>Product</Link>
                    <Link to="/Contact" className="nav-link"><i className="fa-solid fa-users"></i>ContactUs</Link>
                    <Link to='/Cart' className="nav-link"><i className="fa-solid fa-cart-shopping"></i>Cart</Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
