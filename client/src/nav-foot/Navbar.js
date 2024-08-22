import React from "react";
import './Navbar.css';
import { NavLink, Link, } from "react-router-dom";
function Navbar() {
    const UserEmail = localStorage.getItem(1);
    const handleLogout = () => {
        // Remove the user's token from local storage
        localStorage.clear();
        // Redirect the user to the Home page
        window.location.href = '/Home';
    };
    return (
        <nav className="Navbar-items">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <h1 className="navbar-logo">ReserveIt</h1>
            <ul className="nav-menu">
                <NavLink to="/Home" className="log"><i class="fa-solid fa-house"></i>Home</NavLink>
                <NavLink to="/Booking" className="log"><i class="fa-solid fa-utensils"></i>Booking</NavLink>
                <NavLink to="/Menu" className="log"><i class="fa-solid fa-bars"></i>Menu</NavLink>
                <NavLink to="/Contact" className="log"><i class="fa-solid fa-users"></i>Contact Us</NavLink>
                {/* <form>
                    <div class="search-box">
                        <button class="btn-search"><i class="fa-solid fa-magnifying-glass"></i></button>
                        <input type="text" class="input-search" placeholder="Type to Search..."></input>
                    </div>
                </form> */}
                <div className="get-in">
                    {UserEmail === null ? <Link to='/Login' className='log'><i class="fa-solid fa-user"></i>Log In</Link> :
                        <>
                            <p className="userlogo" style={{ backgroundColor: 'blue', borderRadius: '60%', color: 'white', paddingRight: "5px", paddingLeft: "5px", fontSize: "20px", fontFamily: 'Times New Roman' }}>{UserEmail.toUpperCase().charAt()}</p>
                            <Link to="/Home" className='log' onClick={handleLogout}>Log out</Link>
                        </>
                    }
                </div>
            </ul>
        </nav>
    );
}
export default Navbar;
