import React, { useState, useContext, useEffect } from 'react'; // Added useEffect
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { RecoveryContext } from '../App';
import './Forget.css';
import logo from '../Assets/logo.png'; // Import the image
import axios from 'axios';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const EmailInput = () => {
  const { email, setEmail, setOTP } = useContext(RecoveryContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to manage loading
  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:3001/vat"
      : `${window.location.protocol}//visionaryarttech.com/vat`;

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
    });
  }, []);

  function navigateToOtp() {
    try {
      if (email) {
        setLoading(true); // Start loading
        const OTP = Math.floor(Math.random() * 9000 + 1000);
        setOTP(OTP);
        axios.post(`${baseURL}/send_recovery_email`, {
          recipient_email: email,
          OTP,
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
    <div className="forget-container" data-aos="fade-up"> {/* Add AOS animation */}
      <div className="fr-container" data-aos="zoom-in"> {/* Animation for the container */}
        <Link to="/" className="rec-home-link" data-aos="fade-left"><FaArrowLeft />Home</Link> {/* Animation for the link */}
        <div className="middel" data-aos="fade-in"> {/* Animation for the middle section */}
          <img className="forget-company-logo-two" src={logo} alt="Logo" data-aos="fade-down" /> {/* Animation for the logo */}
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
            <br />
            <Link className="verify_button" onClick={navigateToOtp} disabled={loading}>
              {loading ? 'Sending OTP...' : 'Recover'} {/* Show loading text */}
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmailInput;
