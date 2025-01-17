import './Style.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import React, { useState, useContext, useEffect } from 'react';
import { RecoveryContext } from '../App';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

function Login() {
  const { email, setEmail, setShow } = useContext(RecoveryContext);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:3001/vat"
      : `${window.location.protocol}//visionaryarttech.com/vat`;

  const togglePasswordVisibility = async () => {
    setShowPassword(!showPassword);
  }

  const submit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!email) {
      window.alert("Email is required.");
      return;
    }
    if (!password) {
      window.alert("Password is required.");
      return;
    }

    try {
      const response = await axios.get(`${baseURL}/login`, {
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
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      window.alert('Login failed! Please check your email and password.');
    }
  }

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration
    });
  }, []);

  return (
    <div className="parent-container">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
      <div className="container">
        <div className="left" data-aos="fade-right">
        </div>
        <div className="right" data-aos="fade-left">
          <h2>Login</h2>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
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
            <Link to="/" className="login-home-link"><FaArrowLeft />Home</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
