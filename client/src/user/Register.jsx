import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { RecoveryContext } from "../App";
import "./Style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Register() {
  const [name, setName] = useState("");
  const { email, setEmail } = useContext(RecoveryContext);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();
  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:3001/vat"
      : `${window.location.protocol}//visionaryarttech.com/vat`;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submit = async (e) => {
  e.preventDefault();

  if (!name) {
    window.alert("Name is required.");
    return;
  }

  if (!email) {
    window.alert("Email is required.");
    return;
  }

  if (!password) {
    window.alert("Password is required.");
    return;
  }

  if (!confirmpassword) {
    window.alert("Confirm Password is required.");
    return;
  }

  if (password !== confirmpassword) {
    window.alert("Passwords do not match.");
    return;
  }

  try {
    const response = await axios.post(`${baseURL}/signup`, {
      name,
      email,
      password,
      confirmpassword,
    });

    if (response.status === 201) {
      setIsPopupVisible(true); // Show the success popup
    }
  } catch (err) {
    if (err.response && err.response.status === 409) {
      window.alert("Email already exists. Please use a different email.");
    } else {
      window.alert("Registration failed. Please try again.");
    }
  }
};


  const closePopup = () => {
    setIsPopupVisible(false); // Close the popup
    navigate('/login'); // Navigate to login page
  };

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
        <div className="signup-right"></div>
        <Link to="/Home" className="signup-home-link">
          Home
          <FaArrowRight />
        </Link>
      </div>

      {/* Popup Modal */}
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h2>Success</h2>
            <p>Your account has been created successfully!</p>
            <button className="popup-close-btn" onClick={closePopup}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
