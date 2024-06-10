import './Style.css';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import React from 'react';

function Login() {
  return (
    <div className="container">
    <div className="left">
      <div>Image or color</div>
    </div>
    <Link to="/" className="login-home-link">
    <FaArrowLeft />
      Home
    </Link>
    <div className="right">
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <button type="submit">Signin</button>
      <div className="links">
        <a href="/Register">New user?</a>
        <a href="#">Forget Password?</a>
      </div>
    </div>
  </div>
  );
}

export default Login;
