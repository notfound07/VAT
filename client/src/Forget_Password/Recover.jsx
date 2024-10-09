import React, { useState, useContext, useEffect } from 'react';
import logo from '../Assets/logo.png';
import { RecoveryContext } from "../App";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles
import './Forget.css';

function Recover() {
  const { email } = useContext(RecoveryContext);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:3001/vat"
      : `${window.location.protocol}//visionaryarttech.com/vat`;

  // Protect the route to ensure users have a valid email before accessing this page
  useEffect(() => {
    if (!email) {
      navigate('/'); // Redirect to home if email is missing
    }
  }, [email, navigate]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: 'ease-in-out', // Easing function
      once: true, // Whether the animation should happen only once
    });
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("Passwords do not match.");
      return;
    }
    
    try {
      const response = await axios.post(`${baseURL}/reset`, {
        email,
        password,
        confirmpassword,
      });
      
      if (response.status === 200) {
        console.log("Password reset successful");
        navigate('/Login');
      }
    } catch (error) {
      console.error("Error during password reset:", error.response || error.message);
      alert("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="forget-container" data-aos="fade-up"> {/* Add AOS animation */}
      <div className="fr-container" data-aos="zoom-in"> {/* Add AOS animation */}
        <Link to="/" className="rec-home-link" data-aos="fade-left"><FaArrowLeft />Home</Link> {/* Add AOS animation */}
        <div className="middel" data-aos="fade-in"> {/* Add AOS animation */}
          <img className="forget-company-logo" src={logo} alt="Company Logo" data-aos="fade-down" /> {/* Add AOS animation */}
          <h2>Recover Password</h2>
          <div className="recover-form-group" data-aos="fade-up"> {/* Add AOS animation */}
            <form>
              <input defaultValue={email} disabled />
              <label htmlFor="password">New Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              <label htmlFor="retypepassword">Retype Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="retypepassword"
                  name="retypepassword"
                  onChange={(e) => setConfirmpassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              <button className="rec-btn" onClick={submit}>
                Submit <i className="fa-solid fa-right-long"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recover;
