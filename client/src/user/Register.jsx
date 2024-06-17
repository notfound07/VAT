import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './Style.css';

function Register() {
  return (
    <div class="parent-signup-container">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
      <div className="signup-container">
        <div className="signup-left">
          <h2>Sign Up</h2>
          <div className="signup-form-group">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" name="fullName" />
          </div>
          <div className="signup-form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="signup-form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="signup-form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" />
          </div>
          <button className='log-res' type="submit">Sign Up <i class="fa-solid fa-right-long"></i></button>
          <div className="signup-links">
            <a href="/Login">Already have an account?</a>
          </div>
        </div>
        <div className="signup-right">
          <div>Image or color</div>
        </div>
        <Link to="/Home" className="signup-home-link">Home<FaArrowRight /></Link>
      </div>
    </div>
  );
}

export default Register;