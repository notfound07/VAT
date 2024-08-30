import './Style.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import React, { useState, useContext } from 'react';
import { RecoveryContext } from '../App';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const { email, setEmail, setShow } = useContext(RecoveryContext);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const apiUrl = process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:3001'; 

  const togglePasswordVisibility = async () => {
    setShowPassword(!showPassword);
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${apiUrl}/vat/login`, {
        params: {
          email,
          password
        }
      });
      if (response.status === 200) {
        const token = response.data.token;
        const role = response.data.role;
        if (role === "admin") {
          setShow(true);
        }
        localStorage.setItem("LoggedUser", email);
        localStorage.setItem('authToken', token)
        navigate('/Home');
      }
    } catch (err) {
      console.log(err);
      window.alert('Login failed! Please check your email and password.');
    }
  }


  return (
    <div className="parent-container">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
      <div className="container">
        <div className="left">
        </div>
        <div className="right">
          <h2>Login</h2>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
            <button className="log-res" onClick={submit}>Signin <i className="fa-solid fa-right-long"></i></button>
            <div className="links">
              <a href="/Register">New user?</a>
              <a href="/EmailInput">Forget Password?</a>
            </div>
          </form>
          <Link to="/Home" className="login-home-link"><FaArrowLeft />Home</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
