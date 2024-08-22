import React from 'react'
import { useContext, useState } from "react";
import { RecoveryContext } from "../App";
import './otp-reset.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecoveryEmailApi from '../apis/RecoveryEmailApi';
const OTPinput = () => {
  const { email, otp } = useContext(RecoveryContext);
  const [timerCount, setTimer] = React.useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  function resendOTP() {
    if (disable) return;
    RecoveryEmailApi
      .post("/", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has successfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      navigate('/Reset');
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div>
      <div className="otp-overlay" >
        <div className='otp-main-box '>
          <p className='email-v'>Email Verification</p>
          <p className='otp-p'>
            We have sent a code to your email {email}
          </p>
          <div className='Otp-box'>
            <div className="Otp-input">
              <input
                maxLength="1"
                type="text"
                name=""
                id=""
                onChange={(e) =>
                  setOTPinput([
                    e.target.value,
                    OTPinput[1],
                    OTPinput[2],
                    OTPinput[3],
                  ])
                }
              ></input>
            </div>
            <div className="Otp-input">
              <input
                maxLength="1"
                type="text"
                name=""
                id=""
                onChange={(e) =>
                  setOTPinput([
                    OTPinput[0],
                    e.target.value,
                    OTPinput[2],
                    OTPinput[3],
                  ])
                }
              ></input>
            </div>
            <div className="Otp-input">
              <input
                maxLength="1"
                type="text"
                name=""
                id=""
                onChange={(e) =>
                  setOTPinput([
                    OTPinput[0],
                    OTPinput[1],
                    e.target.value,
                    OTPinput[3],
                  ])
                }
              ></input>
            </div>
            <div className="Otp-input">
              <input
                maxLength="1"
                type="text"
                name=""
                id=""
                onChange={(e) =>
                  setOTPinput([
                    OTPinput[0],
                    OTPinput[1],
                    OTPinput[2],
                    e.target.value,
                  ])
                }
              ></input>
            </div>
          </div>
          <div>
            <button className="verify_button" onClick={() => verfiyOTP()}>Verify Account</button>
          </div>
          <div>
            <p className='otp-p'>Didn't receive code?</p>{" "}
            <a className='resend'
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
      </div >
    </div>
  )
}

export default OTPinput