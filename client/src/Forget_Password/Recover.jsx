import './Forget.css';
import React, { useState, useContext } from 'react';
import logo from '../Assets/logo.png'; // Import the image
import { RecoveryContext } from "../App";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Recover() {
  const { email } = useContext(RecoveryContext);
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://visionaryarttech.com/vat/reset",
        {
          email,
          password,
          confirmpassword,
        }
      );
      if (response.status === 200) {
        console.log("Reset successful");
        navigate('/Login');
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Backend returned error response:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
      }
    }
  };


  return (
    <div className="forget-container">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
      <div className="fr-container">
        <div className="middel">
          <img className="forget-company-logo" src={logo} alt="Company Logo" />
          <h2>Recover Password</h2>
          <div className="recover-form-group">
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
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                  />
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
