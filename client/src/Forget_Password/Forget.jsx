import React, { useContext, useState, useEffect } from 'react';
import { RecoveryContext } from "../App";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import logo from '../Assets/logo.png';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles
import './Forget.css';

function Forget() {
  const { email, otp } = useContext(RecoveryContext);
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:3001/vat"
      : `${window.location.protocol}//visionaryarttech.com/vat`;

  // Route protection
  useEffect(() => {
    if (!email) {
      navigate('/'); // Redirect if email is not present
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

  function resendOTP() {
    if (disable) return;
    axios
      .post(`${baseURL}/send_recovery_email`, {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has successfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verifyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      navigate('/Recover');
    } else {
      alert("The code you have entered is not correct, try again or re-send the link.");
    }
  }

  const handleChange = (e, index) => {
    const value = e.target.value;
    const newOTP = [...OTPinput];

    if (e.nativeEvent.inputType === "deleteContentBackward" && !value && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }

    if (value.length <= 1) {
      newOTP[index] = value;
      setOTPinput(newOTP);

      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        return lastTimerCount <= 0 ? lastTimerCount : lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="forget-container" data-aos="fade-up"> {/* Add AOS animation */}
      <div className="fr-container" data-aos="zoom-in"> {/* Add AOS animation */}
        <Link to="/" className="rec-home-link" data-aos="fade-left"><FaArrowLeft />Home</Link> {/* Add AOS animation */}
        <div className="middel" data-aos="fade-in"> {/* Add AOS animation */}
          <img className="forget-company-logo" src={logo} alt="" data-aos="fade-down" /> {/* Add AOS animation */}
          <h2>Recover Pin</h2>
          <p className="otp-p">We have sent a code to your email {email}</p>
          <div className="Otp-box" data-aos="flip-up"> {/* Add AOS animation */}
            <div className="Otp-input">
              <input
                maxLength="1"
                type="text"
                id="otp-0"
                value={OTPinput[0]}
                onChange={(e) => handleChange(e, 0)}
              />
            </div>
            <div className="Otp-input">
              <input
                maxLength="1"
                type="text"
                id="otp-1"
                value={OTPinput[1]}
                onChange={(e) => handleChange(e, 1)}
              />
            </div>
            <div className="Otp-input">
              <input
                maxLength="1"
                type="text"
                id="otp-2"
                value={OTPinput[2]}
                onChange={(e) => handleChange(e, 2)}
              />
            </div>
            <div className="Otp-input">
              <input
                maxLength="1"
                type="text"
                id="otp-3"
                value={OTPinput[3]}
                onChange={(e) => handleChange(e, 3)}
              />
            </div>
          </div>
          <div>
            <button className="verify_button" onClick={() => verifyOTP()}>
              Verify Account
            </button>
          </div>
          <div>
            <p className="otp-p">Didn't receive code?</p>
            <a
              href="/#"
              className="resend"
              style={{
                color: disable ? "gray" : "blue",
                cursor: disable ? "none" : "pointer",
                textDecorationLine: disable ? "none" : "underline",
              }}
              onClick={() => resendOTP()}
            >
              {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forget;
