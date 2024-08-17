import './Style.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import React, { useState, useContext } from 'react';
import { RecoveryContext } from '../App';
import axios from 'axios';

function Login() {
  const { email, setEmail, setShow,setOTP } = useContext(RecoveryContext);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (email === "visionaryart.tech24@gmail.com" && password === "Visionary.24") {
      localStorage.setItem("LoggedUser", email);
      navigate('/Shopping');
      setShow(true);
    } else {
      try {
        const response = await axios.get("http://localhost:3001/vat/login", {
          params: {
            email,
            password
          }
        });
        if (response.status === 200) {
          localStorage.setItem("LoggedUser", email);
          navigate('/Home');
          window.alert('Login successful!');
        }
      } catch (err) {
        console.log(err);
        window.alert('Login failed! Please check your email and password.');
      }
    }
  }
  function navigateToOtp() {
    try {
      if (email) {
        const OTP = Math.floor(Math.random() * 9000 + 1000);
        console.log(OTP);
        setOTP(OTP);
        axios.post("http://localhost:3001/send_recovery_email", {
          OTP,
          recipient_email: email,
        })
        .then(() => navigate('/Forget'))
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {
            alert('An unexpected error occurred while sending the OTP. Please try again.');
          }
        });
      } else {
        alert("Please enter your email");
      }
    } catch (error) {
      alert('An unexpected error occurred. Please try again.');
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
              <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="log-res" onClick={submit}>Signin <i className="fa-solid fa-right-long"></i></button>
            <div className="links">
              <a href="/Register">New user?</a>
              <a href="#" onClick={navigateToOtp}>Forget Password?</a>
              </div>
          </form>
          <Link to="/Home" className="login-home-link"><FaArrowLeft />Home</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
