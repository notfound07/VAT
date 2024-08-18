import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { RecoveryContext } from '../App';
import './Forget.css';
import logo from '../Assets/logo.png'; // Import the image
import axios from 'axios';

const EmailInput = () => {
  const { email, setEmail, setOTP } = useContext(RecoveryContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to manage loading

  function navigateToOtp() {
    try {
      if (email) {
        setLoading(true); // Start loading
        const OTP = Math.floor(Math.random() * 9000 + 1000);
        console.log('Generated OTP:', OTP);
        setOTP(OTP);
        axios.post("http://localhost:3001/send_recovery_email", {
          OTP,
          recipient_email: email,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(() => {
            setLoading(false); // Stop loading after success
            navigate('/Forget');
          })
          .catch((error) => {
            setLoading(false); // Stop loading after error
            console.error('Error during OTP request:', error);
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
      setLoading(false); // Stop loading after error
      alert('An unexpected error occurred. Please try again.');
    }
  }

  return (
    <div className="forget-container">
      <div className="fr-container">
        <div className="middel">
          <img className="forget-company-logo-two" src={logo} alt="" />
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                onChange={(e) => setEmail(e.target.value)} 
                disabled={loading} // Disable input while loading
              />
            </div>
            <br></br>
            <a href='#' className="verify_button" onClick={navigateToOtp} disabled={loading}>
              {loading ? 'Sending OTP...' : 'Recover'} {/* Show loading text */}
            </a>
          </form>
        </div>
        <Link to="/Home" className="rec-home-link"><FaArrowLeft />Home</Link>
      </div>
    </div>
  );
}

export default EmailInput;
