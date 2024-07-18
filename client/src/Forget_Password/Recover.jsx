import './Forget.css';
import React from 'react';
import logo from '../Assets/logo.png'; // Import the image

function Recover() {
  return (
    <div className="forget-container">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
      <div className="fr-container">
        <div className="middel">
          <img className="forget-company-logo" src={logo} alt="" />
          <h2>Recover Account</h2>
          <div className="recover-form-group">
            <label htmlFor="password">New Password</label>
            <input type="password" id="password" name="password" />
            <label htmlFor="retypepassword">Retype Password</label>
            <input type="retypepassword" id="retypepassword" name="retypepassword" />
            <label htmlFor="otp">Enter OTP</label>
            <input type="otp" id="otp" name="otp" />
            <button className="rec-btn" type="submit">Submit <i class="fa-solid fa-right-long"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recover;
