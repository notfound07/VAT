import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RecoveryContext } from "../App";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import "./Style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Register() {
  const [name, setName] = useState("");
  const { email, setEmail } = useContext(RecoveryContext);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmpassword) {
      window.alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmpassword) {
      window.alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/vat/signup", {
        name,
        email,
        password,
        confirmpassword,
      });

      if (response.status === 201) {
        window.alert("Registration successful! Please log in.");
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
      window.alert("Registration failed. Please try again.");
    }
  }

  return (
    <div className="parent-signup-container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      ></link>
      <div className="signup-container">
        <div className="signup-left">
          <h2>Sign Up</h2>
          <form>
            <div className="signup-form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signup-form-group">
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
      <div className="signup-form-group">
        <label htmlFor="confirmpassword">Confirm Password</label>
        <div className="password-wrapper">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmpassword"
            name="confirmpassword"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="button" onClick={toggleConfirmPasswordVisibility} className="password-toggle">
            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
          </button>
        </div>
      </div>
            <button className="log-res" onClick={submit}>
              Sign Up <i className="fa-solid fa-right-long"></i>
            </button>
            <div className="signup-links">
              <a href="/Login">Already have an account?</a>
            </div>
          </form>
        </div>
        <div className="signup-right">
          <div>Image or color</div>
        </div>
        <Link to="/Home" className="signup-home-link">
          Home
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default Register;
