import './Forget.css';
import React, { useContext, useState } from 'react';
import { RecoveryContext } from "../App";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../Assets/logo.png'; // Import the image

function Forget() {
  const { email, otp } = useContext(RecoveryContext);
  const [timerCount, setTimer] = React.useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const apiUrl = process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:3001'; 

  function resendOTP() {
    if (disable) return;
    axios
      .post(`${apiUrl}/send_recovery_email`, {
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
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

  const handleChange = (e, index) => {
    const value = e.target.value;
    const newOTP = [...OTPinput];

    // If the key pressed is Backspace and the input is empty, move focus to the previous field
    if (e.nativeEvent.inputType === "deleteContentBackward" && !value && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }

    if (value.length <= 1) {
      newOTP[index] = value;
      setOTPinput(newOTP);

      // Automatically move to the next input if the value is entered and it is not the last field
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); // each count lasts for a second
    // cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="forget-container">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
      <div className="fr-container">
        <div className="middel">
          <img className="forget-company-logo" src={logo} alt="" />
          <h2>Recover Pin</h2>
          <p className="otp-p">We have sent a code to your email {email}</p>
          <div className="Otp-box">
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
            <a href='/#'
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
