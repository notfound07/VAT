import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './Style.css';

function Register() {
  return (
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
      <button type="submit">Sign Up</button>
      <div className="signup-links">
        <a href="/Login">Already have an account?</a>
      </div>
    </div>
    <div className="signup-right">
      <div>Image or color</div>
    </div>
    <Link to="/" className="signup-home-link">
      Home<FaArrowRight />
    </Link>
  </div>
  );
}

export default Register;